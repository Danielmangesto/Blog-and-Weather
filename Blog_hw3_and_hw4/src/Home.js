import React from 'react';
import Blog from "./Blog";
import {Stack, Card, Typography} from "@mui/material";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function Home() {
    return (
        <div className="container">
            <Stack>
                <div className="Head">
                    <Card variant="outlined">
                        <Typography variant="h2">
                            Welcome to my Blog!
                        </Typography>
                        <Typography variant="h6">
                            This is a simple blog built with React. Feel free to browse the latest posts and leave a
                            comment.
                        </Typography>
                    </Card>
                </div>
                <Blog/>
            </Stack>
        </div>
    );
}

export default Home;
