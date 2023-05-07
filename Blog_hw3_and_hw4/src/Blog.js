import React from 'react';
import {useNavigate} from "react-router-dom";


const posts = [
    { id: 1, title: 'Blog post #1', content: 'My first blog post is all about my blog post and how to write a new post in my blog, you can find it here.' },
    { id: 2, title: 'Blog post #2', content: 'My second blog post is about my experiences with blogging and why I started my own blog, you can find it here.' },
    { id: 3, title: 'Blog post #3', content: 'My third blog post is a tutorial on how to create a simple blog using HTML and CSS, you can find it here.' },
];

function Blog() {
    const navigate = useNavigate();
    return (
        <div className="container">
            <div className="posts">
                {posts.map((post) => (
                    <div className="post" key={post.id}>
                        <h2><a href="" onClick={()=> navigate(`Posts/${post.id}`)}>{post.title}</a></h2>
                        <p>{post.content}</p>
                        <br />
                        <br />
                        <p>Published 1 day ago by Daniel</p>
                    </div>
                ))}
            </div>
            <div className="sidebar">
                <div className="latest">
                    <h3>Latest</h3>
                    <ul>
                        {posts.map((post) => (
                            <li key={post.id}>
                                <a href="" onClick={()=> navigate(`Posts/${post.id}`)}>{post.title}</a>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="popular">
                    <h3>Popular</h3>
                    <ul>
                        {posts.map((post) => (
                            <li key={post.id}>
                                <a href="" onClick={()=> navigate(`Posts/${post.id}`)}>{post.title}</a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Blog;
