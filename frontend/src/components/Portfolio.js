import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Portfolio = () => {
  const [portfolio, setPortfolio] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8080/api/stocks')
      .then(response => {
        setPortfolio(response.data.splice(1)); //splice(1) to remove the empty object from the response
      })
      .catch(error => {
        console.error('There was an error fetching the portfolio!', error);
        setError('There was an error fetching the portfolio');
      });
  }, []);

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <div className="text-xl font-semibold mb-4">My Portfolio</div>
      {error && <div className="text-red-500">{error}</div>}
      <div className="space-y-4">
        {portfolio.map(stock => (
          <div key={stock.id} className="flex justify-between items-center p-4 bg-gray-100 rounded shadow-sm">
            <div>
              <div className="text-lg font-semibold">
                <Link to={`/stock/${stock.id}`}>{stock.name} ({stock.symbol})</Link>
              </div>
            </div>
            <div className="text-xl font-bold text-green-500">${stock.price.toFixed(2)}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Portfolio;



