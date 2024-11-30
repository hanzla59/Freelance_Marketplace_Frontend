import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, CircularProgress } from '@mui/material';
import OrderCard from './OrderCard'; 
const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function ServiceOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/fyp/getOrders`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setOrders(response.data.orders);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError('Failed to fetch orders.');
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <Box>
      <div style={{ fontSize: '18px', marginTop: '20px', marginBottom: '10px', backgroundColor: 'green', padding: '10px', fontFamily: 'sans-serif', color: 'white', maxWidth: '100%', borderRadius: '5px', textAlign: 'center', boxShadow: '1px 1px 5px gray' }}>
        Orders Recived on the Services Which You Have Provided
      </div>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : orders.length > 0 ? (
        orders.map((order) => <OrderCard key={order._id} order={order} />)
      ) : (
        <Typography variant="h6">No orders found.</Typography>
      )}
    </Box>
  );
}
