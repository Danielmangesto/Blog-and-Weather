import React from 'react';
import {useParams} from "react-router-dom";

const posts = [
    { id: 1, title: 'Blog post #1', content: 'My first blog post is all about my blog post and how to write a new post in my blog, you can find it here.', published: '2023-04-27', author: 'Daniel' },
    { id: 2, title: 'Blog post #2', content: 'My second blog post is about my experiences with blogging and why I started my own blog, you can find it here.', published: '2023-04-28', author: 'Daniel' },
    { id: 3, title: 'Blog post #3', content: 'My third blog post is a tutorial on how to create a simple blog using HTML and CSS, you can find it here.', published: '2023-04-29', author: 'Daniel' },
];

function PostPage() {
    const { id } = useParams();
    let post = posts.find((post) => post.id === parseInt(id));
    if((id> posts.length)|| id === undefined){
        post = posts.find((post) => post.id === parseInt(1))
    }
    return (
        <div>
            <div className="posts">
                    <div className="post" key={post.id}>
                        <h2>Post number: {post.id}</h2>
                        <p><br></br> {post.content}</p>
                        <br />
                        <br />
                        <p>Published 1 day ago by Daniel</p>
                    </div>
            </div>
        </div>
    );
}

export default PostPage;
