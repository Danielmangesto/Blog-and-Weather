import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import CommentForm from './CommentForm';
import axios from 'axios';

const BlogCard = (props) => {
  const { id, title, content, image_path, published } = props;
  const [comments, setComments] = useState([]);

  const fetchComments = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:5000/getallcomments/${id}`, {
        withCredentials: true,
      });
      setComments(response.data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const handleCommentSubmit = (commentData) => {
  };

  return (
    <Card sx={{ maxWidth: 600, marginBottom: '20px' }}>
      <CardMedia component="img" height="250" image={image_path} />
      <CardContent>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {content}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
        <Button size="small" color="primary">
          Like
        </Button>
      </CardActions>
      <CardContent>
        <Typography variant="h6">Comments</Typography>
        {comments.length === 0 ? (
          <Typography>No comments yet.</Typography>
        ) : (
          <ul>
            {comments.map((comment) => (
              <li key={comment.id}>{comment.comment}</li>
            ))}
          </ul>
        )}
        <CommentForm postId={id} onSubmit={handleCommentSubmit} />
      </CardContent>
    </Card>
  );
};

export default BlogCard;
