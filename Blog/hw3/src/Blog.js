import React from 'react';

const posts = [
    { id: 1, title: 'Blog post #1', content: 'My first blog post is all about my blog post and how to write a new post in my blog, you can find it here.' },
    { id: 2, title: 'Blog post #2', content: 'My second blog post is about my experiences with blogging and why I started my own blog, you can find it here.' },
    { id: 3, title: 'Blog post #3', content: 'My third blog post is a tutorial on how to create a simple blog using HTML and CSS, you can find it here.' }
];

function Blog() {
    return (
        <>
            {posts.map(post => (
                <div className="post" key={post.id}>
                    <h2>{post.title}</h2>
                    <p>{post.content}</p>
                    <br />
                    <br />
                    <p>Published 1 day ago by Daniel</p>
                </div>
            ))}
        </>
    );
}

export default Blog;
