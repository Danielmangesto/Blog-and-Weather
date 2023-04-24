import React from 'react';
import './App.css';
function App() {
  return (
      <>
        <header>
          <h1>This is my blog</h1>
        </header>
        <nav>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">About me</a></li>
            <li><a href="#">Contact me</a></li>
          </ul>
        </nav>
        <div className="container">
          <div className="post">
            <h2>Blog post #1</h2>
            <p>My first blog post is all about my blog post and how to write a new post in my blog, you can find it <a href="#">here</a>.</p>
            <br />
            <br />
            <p>Published 1 day ago by Daniel</p>
          </div>
          <div className="post">
            <h2>Blog post #2</h2>
            <p>My second blog post is about my experiences with blogging and why I started my own blog, you can find it <a href="#">here</a>.</p>
            <br />
            <br />
            <p>Published 2 days ago by Daniel</p>
          </div>
          <div className="post">
            <h2>Blog post #3</h2>
            <p>My third blog post is a tutorial on how to create a simple blog using HTML and CSS, you can find it <a href="#">here</a>.</p>
            <br />
            <br />
            <p>Published 3 days ago by Daniel</p>
          </div>
        </div>
      </>
  );
}

export default App;
