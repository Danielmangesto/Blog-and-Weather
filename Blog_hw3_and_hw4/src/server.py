import uuid
import bcrypt
import requests
from flask import Flask, request, jsonify, abort, make_response
from flask_cors import CORS
from settings import dbpwd, imgbb_api_key
import mysql.connector as mysql
import json

from werkzeug.utils import secure_filename
import os

app = Flask(__name__)
CORS(app, supports_credentials=True, origins=["http://localhost:3000", "http://127.0.0.1:5000"],
     expose_headers='Set-Cookie')

UPLOAD_FOLDER = "C:\\Users\\User\\PycharmProjects\\databaseweather\\dataweather\\images"
ALLOWED_EXTENSIONS = {'jpg', 'jpeg', 'png', 'gif'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def find_country_name(code):
    with open('countries_codes.js', 'r') as file:
        contents = file.read()
        start_index = contents.find('[')
        end_index = contents.find(']') + 1
        json_data = contents[start_index:end_index]
        countries = json.loads(json_data)

        for country in countries:
            if country['code'] == code:
                return country['name']

        return None


@app.route('/GetUserProfile', methods=['GET'])
def get_user_profile():
    session_id = request.cookies.get('session_id')

    db = mysql.connect(
        host="localhost",
        user="root",
        passwd=dbpwd,
        database="app",
    )
    cursor = db.cursor()

    query = "SELECT u.username, u.role, u.country_code FROM users u INNER JOIN session s ON u.id = s.id WHERE s.session_id = %s"
    values = (session_id,)
    cursor.execute(query, values)
    user_profile = cursor.fetchone()
    cursor.close()
    db.close()

    if user_profile:
        profile_data = {
            'username': user_profile[0],
            'role': user_profile[1],
            'country': user_profile[2]
        }
        return jsonify(profile_data), 200
    else:
        abort(401, 'User profile not found.')


@app.route('/SignUp', methods=['POST'])
def SignUp():
    data = request.get_json()
    username = data['username']
    country_code = data['country_code']
    password = data['password']

    db = mysql.connect(
        host="localhost",
        user="root",
        passwd=dbpwd,
        database="app",
    )
    cursor = db.cursor()

    query = "SELECT code FROM country WHERE code = %s"
    values = (country_code,)
    cursor.execute(query, values)
    country_exists = cursor.fetchone()

    if not country_exists:
        query = "INSERT INTO country (code, name) VALUES (%s, %s)"
        values = (country_code, find_country_name(country_code))
        cursor.execute(query, values)

    query = "SELECT id FROM users WHERE username = %s"
    values = (username,)
    cursor.execute(query, values)
    record = cursor.fetchone()
    if record:
        abort(400, 'User already exists.')

    # Insert new user
    query = "INSERT INTO users (username, role, country_code, created_at, password) VALUES (%s, %s, %s, NOW(), %s)"
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    values = (username, 'user', country_code, hashed_password.decode('utf-8'))
    cursor.execute(query, values)
    user_id = cursor.lastrowid
    session_id = str(uuid.uuid4())

    query = "INSERT INTO session (id, session_id) VALUES (%s, %s)"
    values = (user_id, session_id)
    cursor.execute(query, values)
    db.commit()
    cursor.close()
    db.close()

    return jsonify({'message': 'User registered successfully.'})


@app.route('/Login', methods=['POST'])
def login():
    data = request.get_json()
    db = mysql.connect(
        host="localhost",
        user="root",
        passwd=dbpwd,
        database="app",
    )
    query = "SELECT id, username, password FROM users WHERE username = %s"
    values = (data['user'],)
    cursor = db.cursor()
    cursor.execute(query, values)
    record = cursor.fetchone()
    cursor.close()

    if not record:
        abort(401)

    user_id = record[0]
    hashed_password = record[2].encode('utf-8')

    if not bcrypt.checkpw(data['pass'].encode('utf-8'), hashed_password):
        abort(401)

    query = "SELECT session_id FROM session WHERE id = %s"
    values = (user_id,)
    cursor = db.cursor()
    cursor.execute(query, values)
    session_id = cursor.fetchone()
    cursor.close()

    flag = 0
    if session_id[0] == '':
        flag = 1
        query = "UPDATE session SET session_id = %s WHERE id = %s"
        session_id = str(uuid.uuid4())
        values = (session_id,user_id)
        cursor = db.cursor()
        cursor.execute(query, values)
        db.commit()
        cursor.close()

    if not session_id:
        flag = 1
        query = "INSERT INTO session (id, session_id) VALUES (%s, %s)"
        session_id = str(uuid.uuid4())
        values = (record[0], session_id)
        cursor = db.cursor()
        cursor.execute(query, values)
        db.commit()
        cursor.close()

    if flag == 0:
        session_id = session_id[0]

    resp = make_response(jsonify({'session_id': session_id}))
    resp.set_cookie(
        "session_id",
        value=session_id,
        path="/",
        domain='127.0.0.1',
        samesite='None',
        secure=True
    )
    return resp


@app.route('/Logout', methods=['POST'])
def logout():
    session_id = request.cookies.get('session_id')

    db = mysql.connect(
        host="localhost",
        user="root",
        passwd=dbpwd,
        database="app",
    )
    cursor = db.cursor()

    query = "UPDATE session SET session_id = '' WHERE session_id = %s"
    values = (session_id,)
    cursor.execute(query, values)
    db.commit()
    cursor.close()
    db.close()

    resp = make_response(jsonify({'message': 'Logout successful.'}))
    resp.delete_cookie("session_id",
                       domain='127.0.0.1',
                       samesite='None',
                       secure=True
                       )
    return resp


@app.route('/Posts/', methods=['GET', 'POST'])
def manage_posts():
    if request.method == 'GET':
        posts = get_all_posts()
        return posts
    else:
        return add_post()


def get_all_posts():
    db = mysql.connect(
        host="localhost",
        user="root",
        passwd=dbpwd,
        database="app",
    )
    query = "SELECT p.id, p.title, i.image, p.body, p.user_id, p.publish_at FROM posts p LEFT JOIN images i ON p.image_id = i.id"
    data = []
    cursor = db.cursor()
    cursor.execute(query)
    records = cursor.fetchall()
    cursor.close()
    header = ['id', 'title', 'image_path', 'body', 'user_id', 'publish_at']

    for r in records:
        record = list(r)
        record[5] = record[5].strftime('%Y-%m-%d %H:%M:%S')
        data.append(dict(zip(header, record)))

    return json.dumps(data, default=str)


@app.route('/Posts/<int:id>', methods=['GET'])
def get_post(id):
    db = mysql.connect(
        host="localhost",
        user="root",
        passwd=dbpwd,
        database="app",
    )
    query = "SELECT p.id, p.title, p.image_id, p.body, p.user_id, p.publish_at FROM posts p LEFT JOIN images i ON i.image = i.id WHERE p.id = %s"
    values = (id,)
    cursor = db.cursor()
    cursor.execute(query, values)
    record = cursor.fetchone()
    cursor.close()
    header = ['id', 'title', 'image_id', 'body', 'user_id', 'published']
    record = list(record)
    record[5] = record[5].strftime('%Y-%m-%d %H:%M:%S')
    return json.dumps(dict(zip(header, record)))


def add_post():
    db = mysql.connect(
        host="localhost",
        user="root",
        passwd=dbpwd,
        database="app",
    )
    title = request.form.get('title')
    body = request.form.get('body')
    image = request.files.get('image')

    if image and allowed_file(image.filename):
        filename = secure_filename(image.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        image.save(filepath)

        api_url = 'https://api.imgbb.com/1/upload'
        api_key = imgbb_api_key

        response = requests.post(api_url, params={'expiration': 600, 'key': api_key},
                                 files={'image': open(filepath, 'rb')})
        response_data = response.json()

        image_url = response_data['data']['url']

        insert_image_query = "INSERT INTO images (image) VALUES (%s)"
        insert_image_values = (image_url,)
        cursor = db.cursor()
        cursor.execute(insert_image_query, insert_image_values)
        image_id = cursor.lastrowid
        cursor.close()

        db.commit()

        insert_post_query = "INSERT INTO posts (title, body, image_id, publish_at) VALUES (%s, %s, %s, NOW())"
        insert_post_values = (title, body, image_id)
        cursor = db.cursor()
        cursor.execute(insert_post_query, insert_post_values)
        db.commit()
        new_post_id = cursor.lastrowid
        cursor.close()

        new_post = get_post(new_post_id)
        return jsonify(new_post)
    else:
        insert_post_query = "INSERT INTO posts (title, body, publish_at) VALUES (%s, %s, NOW())"
        insert_post_values = (title, body)
        cursor = db.cursor()
        cursor.execute(insert_post_query, insert_post_values)
        db.commit()
        new_post_id = cursor.lastrowid
        cursor.close()

        new_post = get_post(new_post_id)
        return jsonify(new_post)


if __name__ == "__main__":
    app.run()
