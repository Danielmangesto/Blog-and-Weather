import React from 'react';
import TextField from "@mui/material/TextField";
import {Button, Container, createTheme, ThemeProvider} from "@mui/material";
import Box from "@mui/material/Box";

function SendIcon() {
    return null;
}
const theme = createTheme();

function NewPost() {
    return (
        <ThemeProvider theme={theme}>
            <Container component="newPost" maxWidth="xs">
        <div>
            <div style={{display: "flex", flexDirection: "column", gap: "1rem"}}>
                <TextField
                    size="small"
                    id="outlined-multiline-flexible"
                    label="Caption"
                    maxRows={4}
                />
                <TextField
                    variant='standard'
                    size="medium"
                    multiline={true}
                    id="outlined-textarea"
                    label="text"
                    placeholder="He110 W041d"
                    rows={4}
                    maxRows={4}
                />
            </div>
            <Box textAlign='center'>
            <Button size='small' variant="contained" endIcon={<SendIcon />} style={{ marginTop: "1rem" }}>
                Send
            </Button>
            </Box>
        </div>
            </Container>
        </ThemeProvider>
    );
}

export default NewPost;
