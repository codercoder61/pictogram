import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './Home';
import Sign from './Sign';
import Forgot from './Forgot';
import Verify from './VerifyEmail';
import Header from './Header';
import Code from './Code';
import Admin from './Admin';
import NewPass from './NewPass';
import Profile from './Profile';
import Blocked from './Blocked';

function App() {
  sessionStorage.setItem('flag', 0);

  return (
    <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/blocked" element={<Blocked />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/signup" element={<Sign />} />
          <Route path="/forgot" element={<Forgot />} />
          <Route path="/feed" element={<Header />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/code" element={<Code />} />
          <Route path="/newpass" element={<NewPass />} />
        </Routes>
    </Router>
  );
}

export default App;
