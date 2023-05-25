import React, { useEffect, useState } from 'react';
import BlogCard from "./BlogCard";
import { Stack } from "@mui/material";
import axios from 'axios';

function Blog() {
  const [posts, setPosts] = useState([]);

  const getdata = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/Posts');
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  useEffect(() => {
    getdata();
  }, []);

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
      <PostList posts={posts} />
      {console.log(posts)}
    </Stack>
  );
}

export default Blog;
