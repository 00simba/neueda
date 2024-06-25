import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Stocks from './components/Stocks';
import Stock from './components/Stock';
import { CssBaseline } from '@mui/material';

function App() {
  return (
    <Router>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<Stocks />} />
        <Route path="/stocks/:id" element={<Stock />} />
      </Routes>
    </Router>
  );
}

export default App;

