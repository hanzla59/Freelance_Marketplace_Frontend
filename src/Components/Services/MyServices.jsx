
import React, { useEffect, useState } from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Grid,
  Rating,
  Button,
  Snackbar,
  Alert,
  Box
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MyServiceCard = ({ service, onServiceDelete }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/service/${service.id}`);
  };

  const handleDelete = (event) => {
    event.stopPropagation();
    axios
      .delete(`http://localhost:5000/fyp/deleteService/${service.id}`, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then(() => {
        onServiceDelete();
      })
      .catch((error) => {
        console.error('Error deleting service:', error);
      });
  };

  const handleUpdate = () => {
    // Implement update functionality if needed
  };

  return (
    <Card
      onClick={handleClick}
      sx={{
        width: '100%',
        maxWidth: 280,
        minWidth: 250,
        cursor: 'pointer',
        boxShadow: 3,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <CardMedia
        component="img"
        image={service.image}
        alt={service.title}
        sx={{ height: 220, objectFit: 'cover' }}
      />
      <CardContent>
        <Typography variant="h6">{service.title}</Typography>
        <Grid container justifyContent="space-between">
          <Grid item>
            <Typography variant="body2">{service.location}</Typography>
          </Grid>
          <Grid item>
            <Typography variant="body2">PKR {service.price}</Typography>
          </Grid>
        </Grid>
        <Grid container justifyContent="space-between" alignItems="center" sx={{ mt: 1 }}>
          <Grid item>
            <Typography variant="body2">Orders ({service.totalOrders})</Typography>
          </Grid>
          <Grid item>
            <Rating value={service.rating} readOnly precision={0.5} size="small" />
          </Grid>
        </Grid>
        <Grid container justifyContent="space-between" sx={{ mt: 2 }}>
          <Grid item>
            <Button variant="outlined" color="error" onClick={handleDelete}>
              Delete
            </Button>
          </Grid>
          <Grid item>
            <Button variant="outlined" color="primary" onClick={handleUpdate}>
              Update
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

const MyServices = () => {
  const [services, setServices] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const fetchServices = async () => {
    try {
      const response = await axios.get('http://localhost:5000/fyp/getServiceByUser', {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setServices(response.data.services);
    } catch (error) {
      console.error('Error fetching user services:', error);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleServiceDelete = () => {
    fetchServices();
    setSnackbarMessage('Service deleted successfully!');
    setSnackbarSeverity('success');
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Grid container spacing={1}>
        {services.length > 0 ? (
          services.map((service) => (
            <Grid item key={service._id} xs={12} sm={6} md={4} lg={3} >
              <MyServiceCard
                service={{
                  id: service._id,
                  image: service.images[0] || 'https://via.placeholder.com/240x300',
                  title: service.title,
                  location: service.location,
                  price: service.price,
                  totalOrders: service.orders,
                  rating: service.rating,
                }}
                onServiceDelete={handleServiceDelete}
              />
            </Grid>
          ))
        ) : (
          <Typography variant="body1" sx={{ mt: 2, ml: 2 }}>
            You have no services listed yet.
          </Typography>
        )}
      </Grid>

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default MyServices;
