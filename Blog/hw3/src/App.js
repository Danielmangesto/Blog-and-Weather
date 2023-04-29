import React from 'react';
import './App.css';
import Blog from './Blog';


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
                <Blog />
            </div>
        </>
    );
}

export default App;
