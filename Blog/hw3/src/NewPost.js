import React, { useState } from 'react';

function NewPost() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(`Title: ${title}\nContent: ${content}`);
    };

    return (
        <div className="container">
            <h2>New Post</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title:</label>
                    <input type="text" id="title" value={title} onChange={(event) => setTitle(event.target.value)} />
                </div>
                <div>
                    <label htmlFor="content">Content:</label>
                    <textarea id="content" value={content} onChange={(event) => setContent(event.target.value)}></textarea>
                </div>
                <button type="submit">Publish</button>
            </form>
        </div>
    );
}

export default NewPost;
