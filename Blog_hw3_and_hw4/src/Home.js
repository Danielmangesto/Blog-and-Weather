import React from 'react';
import Blog from "./Blog";

function Home() {
    return (

        <div className="container">
            <div className="Head">
             <p>
                 <h2>Welcome to my Blog!</h2>
                 This is a simple blog built with React. Feel free to browse the latest posts and leave a comment.
             </p>
            </div>
            <Blog />
        </div>
    );
}

export default Home;
