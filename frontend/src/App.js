import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [stocks, setStocks] = useState([]);

  const [data, setData] = useState({
    symbol: "",
    name: "",
    price: 0
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setData({
      ...data,
      [e.target.name]: value
    });
  };

  useEffect(() => {
    fetch('http://localhost:8080/api/stocks')  // dont know what endpoint is yet
      .then(response => response.json())
      .then(data => setStocks(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  function postStock(){

    axios.post('http://localhost:8080/api/stocks', data).then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

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
        <br/>

        <form onSubmit={postStock}>
          <label>Symbol</label><br/>
          <input type="text" name="symbol" value={data.symbol} onChange={handleChange}></input><br/>
          <label>Name</label><br/>
          <input type="text" name="name" value={data.name} onChange={handleChange}></input><br/>
          <label>Price</label><br/>
          <input type="text" name="price" value={data.price} onChange={handleChange}></input><br/>
         <button type="submit">Add Stock</button>
         </form>
        <br/>
        
      </header>
    </div>
  );
}

export default App;



