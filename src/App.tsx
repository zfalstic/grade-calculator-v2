import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom'

import Welcome from './pages/Welcome'
import Average from './pages/Average'
import Final from './pages/Final'

import './App.css';

function App() {
  return (
    <>
      <Navigate to="/" />

      <Routes>
        <Route path='/' element={<Welcome />} />
        <Route path='/average' element={<Average />} />
        <Route path='/final' element={<Final />} />
      </Routes>
    </>
  );
}

export default App;
