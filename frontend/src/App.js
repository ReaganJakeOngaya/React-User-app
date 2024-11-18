
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Notes from './components/Notes';
import AccountRecovery from './components/AccountRecovery';
import Home from './components/Home';
import Dashboard from './components/Dashbord';

function App() {
  return (
    <div className="App">
      <Router>
       <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/register" element={<Register />} />
         <Route path="/login" element={<Login />} />
         <Route path="/notes" element={<Notes />} />
         <Route path='/dashboard' element={<Dashboard />} />
         <Route path="/recover-account" element={<AccountRecovery />} />
       </Routes>
     </Router>
    </div>
  );
}

export default App;

