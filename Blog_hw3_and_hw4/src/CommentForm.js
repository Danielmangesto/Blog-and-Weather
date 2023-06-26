import React, { useState } from 'react';
import { TextField, Button, Container } from '@mui/material';
import Box from "@mui/material/Box";
import axios from "axios";

const CommentForm = ({ postId, onSubmit }) => {
  const [commentData, setCommentData] = useState({
    post_id: postId,
    comment: '',
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:5000/AddNewComment', commentData, {
        withCredentials: true,
      });

      console.log('New comment added:', response.data);

      setCommentData((prevData) => ({
        ...prevData,
        comment: '',
      }));
    } catch (error) {
      console.error('Error adding new comment:', error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCommentData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <Box sx={{ m: 1 }}>
          <TextField
            label="Add a comment"
            variant="outlined"
            fullWidth={true}
            value={commentData.comment}
            size="medium"
            onChange={handleChange}
            name="comment"
          />
          <Button
            style={{ top: '2px', maxWidth: '100px', maxHeight: '35px' }}
            type="submit"
            variant="contained"
            color="primary"
          >
            Submit
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default CommentForm;
