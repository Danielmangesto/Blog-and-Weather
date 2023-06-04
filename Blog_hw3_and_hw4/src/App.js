import React from 'react';
import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AboutMe from './AboutMe';
import NewPost from './NewPost';
import Login from './Login';
import Toolbar from './Toolbar';
import AccountPage from './AccountPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Toolbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/AboutMe" element={<AboutMe />} />
          <Route path="/NewPost" element={<NewPost />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Account" element={<AccountPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
