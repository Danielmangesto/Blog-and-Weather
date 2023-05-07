import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import {Link} from "react-router-dom";

export default function ButtonAppBar() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <Button color="inherit" component={Link} to={'/'}>Home</Button>
                        <Button color="inherit" component={Link} to={'/AboutMe'}>About me</Button>
                        <Button color="inherit" component={Link} to={'/NewPost'}>New Post</Button>
                        <Button color="inherit" component={Link} to={'/Posts'}>Posts</Button>
                    </Typography>
                    <Button color="inherit" component={Link} to={'/Login'}>Login</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}