import React, { useEffect, useState } from 'react';
import BlogCard from "./BlogCard";
import { Stack } from "@mui/material";
import axios from 'axios';

function Blog() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/Posts');
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const PostList = ({ posts }) => {
    const list = posts.map((item) => (
      <BlogCard
        id={item.id}
        title={item.title}
        content={item.body}
        image={item.image_id}
        published={item.publish_at}
      />
    ));
    return <>{list}</>;
  };

  return (
    <Stack direction="row" spacing={1}>
      <PostList posts={posts} />
    </Stack>
  );
}

export default Blog;
