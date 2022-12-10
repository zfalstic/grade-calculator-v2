import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Layout from './components/Layout';
import NoMatch from './components/NoMatch';
import Home from './pages/Home';
import Average from './pages/Average';
import Final from './pages/Final';

import './App.css';

export default function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='average' element={<Average />} />
          <Route path='final' element={<Final />} />

          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </div>
  );
}

