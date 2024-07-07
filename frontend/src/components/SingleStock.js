import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const SingleStock = () => {
  const { id } = useParams();
  const [stockData, setStockData] = useState(null);
  const [error, setError] = useState(null);

  console.log(id);

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/stocks/${id}`);
        setStockData(response.data);
      } catch (error) {
        console.error('There was an error fetching the stock data!', error);
        setError('There was an error fetching the stock data');
      }
    };
    fetchStockData();
  }, [id]);

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <div className="text-xl font-semibold mb-4">Stock Details</div>
      {error && <div className="text-red-500">{error}</div>}
      {stockData ? (
        <div className="space-y-4">
          <div className="p-4 bg-gray-100 rounded shadow-sm">
            <div className="text-lg font-semibold">{stockData.name} ({stockData.symbol})</div>
            <div className="mt-2">
              <p><strong>Symbol:</strong> ${stockData.symbol}</p>
              <p><strong>Price:</strong> ${stockData.price.toFixed(2)}</p>
            </div>
          </div>
        </div>
      ) : (
        <div>Loading stock data...</div>
      )}
    </div>
  );
};

export default SingleStock;
