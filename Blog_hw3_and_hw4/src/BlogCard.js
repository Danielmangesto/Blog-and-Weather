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
  const { id, title: initialTitle, content: initialContent, image_path, published, onPostRemove } = props;
  const [comments, setComments] = useState([]);
  const [isPostRemoved, setIsPostRemoved] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedTitle, setEditedTitle] = useState(initialTitle);
  const [editedContent, setEditedContent] = useState(initialContent);

  const fetchPostData = async () => {
    try {
      const response = await axios.get(`/get_post/${id}`, {
        withCredentials: true,
      });
      const { title, body } = response.data;
      setEditedTitle(title);
      setEditedContent(body);
    } catch (error) {
      console.error('Error fetching post data:', error);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await axios.get(`/getallcomments/${id}`, {
        withCredentials: true,
      });
      setComments(response.data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  useEffect(() => {
    fetchPostData();
    fetchComments();
  }, []);

  const handleCommentSubmit = (commentData) => {
    // Add the commentData to the comments array
    setComments((prevComments) => [...prevComments, commentData]);
  };

  const handleCommentRemove = async (commentId, postId) => {
    try {
      await axios.post(`/removecomment/${postId}/${commentId}`, { commentId, postId }, {
        withCredentials: true,
      });
      setComments((prevComments) => prevComments.filter((comment) => comment.id !== commentId));
    } catch (error) {
      console.error('Error removing comment:', error);
    }
  };

  const handlePostRemove = async () => {
    try {
      await axios.post(`/remove_post/${id}`, { postId: id }, {
        withCredentials: true,
      });
      setIsPostRemoved(true);
    } catch (error) {
      console.error('Error removing post:', error);
    }
  };

  const handleEditSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(
        `/edit_post/${id}`,
        { title: editedTitle, content: editedContent },
        { withCredentials: true }
      );
      setIsEditMode(false);
      fetchComments();
    } catch (error) {
      console.error('Error editing post:', error);
    }
  };

  if (isPostRemoved) {
    return null;
  }

  return (
    <Card sx={{ maxWidth: 600, marginBottom: '20px' }}>
      <CardMedia component="img" height="250" image={image_path} />
      <CardContent>
        {isEditMode ? (
          <form onSubmit={handleEditSubmit}>
            <input type="text" value={editedTitle} onChange={(e) => setEditedTitle(e.target.value)} />
            <textarea value={editedContent} onChange={(e) => setEditedContent(e.target.value)}></textarea>
            <Button type="submit">Save</Button>
            <Button onClick={() => setIsEditMode(false)}>Cancel</Button>
          </form>
        ) : (
          <>
            <Typography variant="h5" component="div">
              {editedTitle}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {editedContent}
            </Typography>
          </>
        )}
      </CardContent>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
        {!isEditMode && (
          <>
            <Button size="small" color="primary" onClick={() => setIsEditMode(true)}>
              Edit post
            </Button>
            <Button size="small" color="primary" onClick={handlePostRemove}>
              Remove post
            </Button>
          </>
        )}
      </CardActions>
      <CardContent>
        <Typography variant="h6">Comments</Typography>
        {comments.length === 0 ? (
          <Typography>No comments yet.</Typography>
        ) : (
          <ul>
            {comments.map((comment) => (
              <li key={comment.id}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Button
                    size="small"
                    color="secondary"
                    onClick={() => handleCommentRemove(comment.id, id)}
                    style={{ marginRight: '10px' }}
                  >
                    Remove
                  </Button>
                  <span>{comment.comment}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
        <CommentForm postId={id} onSubmit={handleCommentSubmit} />
      </CardContent>
    </Card>
  );
};

export default BlogCard;
