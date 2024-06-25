import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Container, Typography, Paper
} from '@mui/material';

const Stock = () => {
  const { id } = useParams();
  const [stock, setStock] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/stocks/${id}`)
      .then(response => setStock(response.data))
      .catch(error => console.error('Error fetching stock:', error));
  }, [id]);

  if (!stock) return <Typography>Loading...</Typography>;

  return (
    <Container>
      <Typography variant="h4" style={{ marginTop: '20px' }}>
        Stock Details
      </Typography>
      <Paper elevation={3} style={{ marginTop: '20px', padding: '20px' }}>
        <Typography variant="h6">Symbol: {stock.symbol}</Typography>
        <Typography variant="h6">Name: {stock.name}</Typography>
        <Typography variant="h6">Price: ${stock.price.toFixed(2)}</Typography>
      </Paper>
    </Container>
  );
};

export default Stock;
