import React, { useEffect, useState } from 'react';
import BlogCard from './BlogCard';
import axios from 'axios';
import {Container, Grid} from "@mui/material";
import Box from "@mui/material/Box";

function Blog() {
  const [posts, setPosts] = useState([]);

const getData = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:5000/Posts/', {
      withCredentials: true,
    });
    setPosts(response.data);
  } catch (error) {
    console.error('Error fetching posts:', error);
  }
};

  useEffect(() => {
    getData();
  }, []);


  return (
    <Grid item xs={4} sx={{ m: 5 }} align = "center">
      {posts.map((post) => (
        <BlogCard xs={3} align="center"
          key={post.id}
          id={post.id}
          title={post.title}
          content={post.body}
          image_path={post.image_path}
          published={post.published_at}
        />
      ))}
    </Grid>
  );
}

export default Blog;
