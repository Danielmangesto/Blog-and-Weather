import React from 'react';
import TextField from "@mui/material/TextField";
import {Button} from "@mui/material";

function SendIcon() {
    return null;
}

function NewPost() {
    return (
        <div>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <TextField
                    id="outlined-multiline-flexible"
                    label="Caption"
                    maxRows={4}
                />
                <TextField
                    id="outlined-textarea"
                    label="text"
                    placeholder="He110 W041d"
                    rows={4}
                />
            </div>
            <Button variant="contained" endIcon={<SendIcon />} style={{ marginTop: "1rem" }}>
                Send
            </Button>
        </div>
    );
}

export default NewPost;
