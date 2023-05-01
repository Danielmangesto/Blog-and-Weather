import React from 'react';
import './App.css';
import Blog from './Blog';
import PostPage from "./PostPage";
import Home from "./Home";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AboutMe from "./AboutMe";
import NewPost from "./NewPost";


function App() {
    return (
        <Router>
            <header>
                <h1>This is my blog</h1>
            </header>
            <nav>
                <ul>
                    <li><Link to="/Home">Home</Link></li>
                    <li><Link to="/AboutMe">About me</Link></li>
                    <li><Link to="/NewPost">New Post</Link></li>
                    <li><Link to="/Posts">Post Page</Link></li>
                </ul>
            </nav>
            <div className="container">
                <Routes>
                    <Route path='/Home' element={<Home />} />
                    <Route path='/AboutMe' element={<AboutMe/>} />
                    <Route path='/NewPost' element={<NewPost/>} />
                    <Route path='/Posts' element={<PostPage />} />
                </Routes>

            </div>
        </Router>
    );
}

export default App;
