import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import About from './About';
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';
import PublicBio from './PublicBio';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/u/:username" element={<PublicBio />} />
      </Routes>
    </Router>
  );
}

export default App;