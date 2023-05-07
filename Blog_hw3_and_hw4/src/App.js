import React from 'react';
import './App.css';
import PostPage from "./PostPage";
import Home from "./Home";
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import AboutMe from "./AboutMe";
import NewPost from "./NewPost";
import Login from "./Login"
import Toolbar from "./Toolbar";

function App() {
    return (
        <Router>
            <meta name="viewport" content="initial-scale=1, width=device-width" />
            <Toolbar/>
            <div className="container">
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/AboutMe' element={<AboutMe/>} />
                    <Route path='/NewPost' element={<NewPost/>} />
                    <Route path='/Posts' element={<PostPage/>} />
                    <Route path='/Posts/:id' element={<PostPage />} />
                    <Route path='/Login' element={<Login />} />
                </Routes>
            </div>
        </Router>

    );
}

export default App;
