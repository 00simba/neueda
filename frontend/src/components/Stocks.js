import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Typography, Container, AppBar, Toolbar, Button, TextField, Dialog, DialogActions,
  DialogContent, DialogContentText, DialogTitle
} from '@mui/material';
import { Link } from 'react-router-dom';

const StockTable = () => {
  const [stocks, setStocks] = useState([]);
  const [balance, setBalance] = useState(1000);
  const [portfolio, setPortfolio] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedStock, setSelectedStock] = useState(null);
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:8080/api/stocks')  // Adjust this URL based on your actual API endpoint
      .then(response => setStocks(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleBuySell = (stock, type) => {
    setSelectedStock(stock);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setQuantity(0);
    setSelectedStock(null);
  };

  const handleTransaction = (type) => {
    if (selectedStock && quantity > 0) {
      const totalCost = selectedStock.price * quantity;
      if (type === 'buy' && totalCost <= balance) {
        setBalance(balance - totalCost);
        const existingStock = portfolio.find(item => item.id === selectedStock.id);
        if (existingStock) {
          existingStock.quantity += quantity;
        } else {
          setPortfolio([...portfolio, { ...selectedStock, quantity }]);
        }
        handleClose();
      } else if (type === 'sell') {
        const existingStock = portfolio.find(item => item.id === selectedStock.id);
        if (existingStock && existingStock.quantity >= quantity) {
          setBalance(balance + totalCost);
          if (existingStock.quantity === quantity) {
            setPortfolio(portfolio.filter(item => item.id !== selectedStock.id));
          } else {
            existingStock.quantity -= quantity;
          }
          handleClose();
        }
      }
    }
  };

  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            Stock Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Typography variant="h5" style={{ marginTop: '20px' }}>
        Balance: ${balance.toFixed(2)}
      </Typography>
      <Paper elevation={3} style={{ marginTop: '20px' }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Symbol</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {stocks.map((stock) => (
                <TableRow key={stock.id}>
                  <TableCell>{stock.id}</TableCell>
                  <TableCell>
                    <Link to={`/stocks/${stock.id}`}>{stock.symbol}</Link>
                  </TableCell>
                  <TableCell>{stock.name}</TableCell>
                  <TableCell>${stock.price.toFixed(2)}</TableCell>
                  <TableCell>
                    <Button variant="contained" color="primary" onClick={() => handleBuySell(stock, 'buy')}>
                      Buy
                    </Button>
                    <Button variant="contained" color="secondary" onClick={() => handleBuySell(stock, 'sell')} style={{ marginLeft: '10px' }}>
                      Sell
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <Typography variant="h5" style={{ marginTop: '20px' }}>
        Portfolio
      </Typography>
      <Paper elevation={3} style={{ marginTop: '20px' }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Symbol</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Quantity</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {portfolio.map((stock) => (
                <TableRow key={stock.id}>
                  <TableCell>{stock.id}</TableCell>
                  <TableCell>{stock.symbol}</TableCell>
                  <TableCell>{stock.name}</TableCell>
                  <TableCell>${stock.price.toFixed(2)}</TableCell>
                  <TableCell>{stock.quantity}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Transaction</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {selectedStock ? `Enter quantity to ${selectedStock.symbol}:` : ''}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Quantity"
            type="number"
            fullWidth
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleTransaction('buy')} color="primary">
            Buy
          </Button>
          <Button onClick={() => handleTransaction('sell')} color="secondary">
            Sell
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default StockTable;
