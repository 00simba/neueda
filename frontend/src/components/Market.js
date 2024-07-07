import React, { useEffect, useState } from 'react';
import axios from 'axios';

const symbolToName = {
  AAPL: 'Apple Inc.',
  MSFT: 'Microsoft Corporation',
  GOOGL: 'Alphabet Inc.',
  AMZN: 'Amazon.com Inc.',
  TSLA: 'Tesla Inc.',
  META: 'Meta Platforms Inc.',
  NVDA: 'NVIDIA Corporation',
  NFLX: 'Netflix Inc.',
  ADBE: 'Adobe Inc.',
  PYPL: 'PayPal Holdings Inc.'
};

const symbols = Object.keys(symbolToName);

const generateFakeStockData = (symbol) => {
  const name = symbolToName[symbol];
  const date = new Date().toLocaleDateString();
  const open = (Math.random() * 1000).toFixed(2);
  const high = (parseFloat(open) + Math.random() * 10).toFixed(2); //parseFloat converts string to float to ensure its a number
  const low = (parseFloat(open) - Math.random() * 10).toFixed(2); //random numbers
  const close = (Math.random() * (high - low) + parseFloat(low)).toFixed(2);
  const volume = Math.floor(Math.random() * 1000000);

  return {
    symbol,
    name,
    date,
    open,
    high,
    low,
    close,
    volume,
  };
};

const Market = () => {
  const [marketData, setMarketData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  useEffect(() => {
    const fetchMarketData = async () => {
      const data = symbols.map(generateFakeStockData);
      setMarketData(data);
    };

    fetchMarketData();
  }, []);

  const handleBuyStock = (symbol, name, price) => {
    const stockData = { symbol, name, price };
    axios.post('http://localhost:8080/api/stocks', stockData)
      .then(response => {
        console.log('Stock bought:', response.data);
        setModalMessage(`Successfully bought ${name} (${symbol}) at $${price}`);
        setShowModal(true);
      })
      .catch(error => {
        console.error('Error buying stock:', error);
      });
  };

  const closeModal = () => {
    setShowModal(false);
    setModalMessage('');
  };

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <div className="text-xl font-semibold mb-4">Market Overview</div>
      {marketData.length > 0 ? (
        <div className="space-y-4">
          {marketData.map(stock => (
            <div key={stock.symbol} className="p-4 bg-gray-100 rounded shadow-sm">
              <div className="text-lg font-semibold">{stock.name} ({stock.symbol})</div>
              <div className="text-sm text-gray-500">Date: {stock.date}</div>
              <div className="mt-2">
                <p><strong>Open:</strong> ${stock.open}</p>
                <p><strong>Close:</strong> ${stock.close}</p>
                <p><strong>High:</strong> ${stock.high}</p>
                <p><strong>Low:</strong> ${stock.low}</p>
                <p><strong>Volume:</strong> {stock.volume}</p>
              </div>
              <button 
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                onClick={() => handleBuyStock(stock.symbol, stock.name, stock.close)}
              >
                Buy
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div>Loading market data...</div>
      )}
      
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-md">
            <h2 className="text-lg font-semibold mb-4">Purchase Confirmation</h2>
            <p>{modalMessage}</p>
            <button 
              className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Market;
