import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/stocks')  // dont know what endpoint is yet
      .then(response => response.json())
      .then(data => setStocks(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Stock Dashboard</h1>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Symbol</th>
              <th>Name</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {stocks.map(stock => (
              <tr key={stock.id}>
                <td>{stock.id}</td>
                <td>{stock.symbol}</td>
                <td>{stock.name}</td>
                <td>${stock.price.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </header>
    </div>
  );
}

export default App;



