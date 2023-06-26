import React, {useState, useRef} from 'react';
import TextField from "@mui/material/TextField";
import {Button, Container, createTheme, ThemeProvider} from "@mui/material";
import Box from "@mui/material/Box";
import axios from 'axios';

const theme = createTheme();

function NewPost() {
    const [postData, setPostData] = useState({
        title: '',
        body: '',
        published_at: '',
        image: null
    });

    const fileInputRef = useRef(null);

    const handleInputChange = (e) => {
        if (e.target.name === 'image') {
            const selectedImage = e.target.files[0];
            setPostData(prevData => ({
                ...prevData,
                image: selectedImage || null
            }));
        } else {
            setPostData(prevData => ({
                ...prevData,
                [e.target.name]: e.target.value
            }));
        }
    };

    const handleImageUpload = () => {
        fileInputRef.current.click();
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!postData.title) {
            alert('Title is required');
            return;
        }

        const formData = new FormData();
        formData.append('title', postData.title);
        formData.append('body', postData.body);
        formData.append('published_at', postData.published_at);

        if (postData.image !== null) {
            formData.append('image', postData.image);
        }


        axios.post('http://127.0.0.1:5000/Posts', formData, {
          withCredentials: true,
        })
            .then(response => {
                console.log('New post added:', response.data);
                setPostData({
                    title: '',
                    body: '',
                    published_at: '',
                    image: null
                });
            })
            .catch(error => {
                console.error('Error adding new post:', error);
            });
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="NewPost" maxWidth="xl" fixed={true}
                       sx={{p: 15, m: 1, display: 'flex', justifyContent: 'center'}}>
                <form onSubmit={handleSubmit}>
                    <div>
                        <div style={{display: "flex", flexDirection: "column", gap: "1rem"}}>
                            <TextField
                                id="outlined-multiline-flexible"
                                label="Caption"
                                maxRows={4}
                                name="title"
                                value={postData.title}
                                onChange={handleInputChange}
                            />
                            <TextField
                                variant='standard'
                                size="large"
                                multiline={true}
                                id="outlined-textarea"
                                label="Text"
                                placeholder="Enter your text"
                                rows={4}
                                maxRows={4}
                                name="body"
                                value={postData.body}
                                onChange={handleInputChange}
                            />
                            <Button onClick={handleImageUpload} variant="contained">
                                Upload Image
                            </Button>
                            <input
                                ref={fileInputRef}
                                type="file"
                                name="image"
                                accept="image/*"
                                onChange={handleInputChange}
                                style={{display: 'none'}}
                            />
                        </div>
                        <Box textAlign='center'>
                            <Button
                                type="submit"
                                size='large'
                                variant="contained"
                                style={{marginTop: "1rem"}}>
                                Submit
                            </Button>
                        </Box>
                    </div>
                </form>
            </Container>
        </ThemeProvider>
    );
}

export default NewPost;
