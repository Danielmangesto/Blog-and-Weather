import React from 'react';
import Blog from "./Blog";
import {Card, Typography} from "@mui/material";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function Home() {
    return (
        <div className="container">
            <div className="Head" >
                <Card variant="outlined" raised={true}>
                 <Typography variant="h2">
                     Welcome to my Blog!
                     <Typography variant="h6">
                         This is a simple blog built with React. Feel free to browse the latest posts and leave a comment.
                     </Typography>
                 </Typography>
                </Card>
            </div>
            <Blog />
        </div>
    );
}

export default Home;
