import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Home from './components/Home';
import Market from './components/Market';
import Portfolio from './components/Portfolio';
import SingleStock from './components/SingleStock';
import './index.css';


const App = () => {
  return (
    <Router>
      <div>
        <div className="bg-blue-900 text-white p-4 flex justify-between items-center">
          <div className="text-2xl font-bold">VASP</div>
          <div className="space-x-4">
            <Link to="/" className="hover:text-green-400">Home</Link>
            <Link to="/portfolio" className="hover:text-green-400">Portfolio</Link>
            <Link to="/market" className="hover:text-green-400">Market</Link>
          </div>
        </div>

        <div className="container mx-auto p-4">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/market" element={<Market />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/stock/:id" element={<SingleStock />} />
          </Routes>
        </div>

        <div className="bg-blue-900 text-white text-center p-4 mt-4">
          <p>&copy; 2024 VASP. All rights reserved.</p>
        </div>
      </div>
    </Router>
  );
};

export default App;





