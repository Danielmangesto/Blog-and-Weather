from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
from settings import dbpwd
import mysql.connector as mysql
import json
from datetime import datetime

from werkzeug.utils import secure_filename
import os

db = mysql.connect(
    host="localhost",
    user="root",
    passwd=dbpwd,
    database="app"
)

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = "C:\\Users\\User\\PycharmProjects\\databaseweather\\dataweather\\images"
ALLOWED_EXTENSIONS = {'jpg', 'jpeg', 'png', 'gif'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route('/Posts', methods=['GET', 'POST'])
def manage_posts():
    if request.method == 'GET':
        return get_all_posts()
    else:
        return add_post()


def get_all_posts():
    query = "SELECT p.id, p.title, i.image_id, p.body, p.user_id, p.publish_at FROM posts p LEFT JOIN images i ON p.image_id = i.id"
    records = None
    with db.cursor() as cursor:
        cursor.execute(query)
        records = cursor.fetchall()
    header = ['id', 'title', 'image_id', 'body', 'user_id', 'publish_at']
    data = []
    for r in records:
        record = list(r)
        record[5] = record[5].strftime('%Y-%m-%d %H:%M:%S')
        data.append(dict(zip(header, record)))
    return json.dumps(data)


def get_post(id):
    query = "SELECT p.id, p.title, p.image_id, p.body, p.user_id, p.publish_at FROM posts p LEFT JOIN images i ON p.image_id = i.id WHERE p.id = %s"
    values = (id,)
    cursor = db.cursor()
    cursor.execute(query, values)
    record = cursor.fetchone()
    cursor.close()
    header = ['id', 'title', 'image_id', 'body', 'user_id', 'publish_at']
    record = list(record)
    record[5] = record[5].strftime('%Y-%m-%d %H:%M:%S')
    return json.dumps(dict(zip(header, record)))


def add_post():
    title = request.form.get('title')
    body = request.form.get('body')
    image = request.files.get('image')

    if image and allowed_file(image.filename):
        filename = secure_filename(image.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        image.save(filepath)

        insert_image_query = "INSERT INTO images (image) VALUES (%s)"
        insert_image_values = (filepath,)
        cursor = db.cursor()
        cursor.execute(insert_image_query, insert_image_values)
        image_id = cursor.lastrowid
        cursor.close()

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
