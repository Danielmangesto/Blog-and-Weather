import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import BlogCard from "./BlogCard";
import {Stack} from "@mui/material";


function PostPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    let Postid = id;
    if (!Postid){
      Postid = 1;
    }
    axios.get(`/Posts/${Postid}`)
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

    const PostList = ({ posts }) => {
    if (!posts || posts.length === 0) {
      return <p>No posts available.</p>;
    }

    const list = posts.map((item) => (
      <BlogCard
        id={item.id}
        title={item.title}
        content={item.body}
        image_path={item.image_path}
        published={item.published_at}
      />
    ));
    return <>{list}</>;
  };

  return (
    <Stack direction="row" spacing={1}>
      <PostList posts={[post]} />
    </Stack>
  );
}

export default PostPage;
