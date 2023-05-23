import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';


function PostPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    // Fetch the post data from the server
    axios.get(`http://127.0.0.1:5000/Posts/${id}`)
      .then(response => {
        setPost(response.data);
      })
      .catch(error => {
        console.error('Error fetching post:', error);
      });
  }, [id]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="posts">
        <div className="post" key={post.id}>
          <h2>Post number: {post.id}</h2>
          <p><br></br>{post.body}</p>
          <br/>
          <br/>
          <p>Published {post.publish_at} by {post.user_id}</p>
        </div>
      </div>
    </div>
  );
}

export default PostPage;
