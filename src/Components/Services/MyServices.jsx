import React, { useRef, useEffect, useState } from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Grid,
  Rating,
  Button,
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MyServiceCard = ({ service }) => {
  const navigate = useNavigate();
  const cardRef = useRef(null); // Create a reference for the card

  const handleClick = () => {
    console.log('Card reference:', cardRef.current); // Log or manipulate the card reference
    navigate(`/service/${service.id}`);
  };

  const handleDelete = () => {
    // console.log(`Deleting service with ID: ${service.id}`);
    //  Add your delete logic here
  };

  const handleUpdate = () => {
    // console.log(`Updating service with ID: ${service.id}`);
    // navigate(`/update-service/${service.id}`);
  };

  return (
    <Card
      ref={cardRef} // Attach the ref to the card
      onClick={handleClick}
      sx={{ width: '100%', maxWidth: 280, cursor: 'pointer', boxShadow: 3 }}
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
            <Typography variant="body2">${service.price}</Typography>
          </Grid>
        </Grid>
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          sx={{ mt: 1 }}
        >
          <Grid item>
            <Typography variant="body2">
              Orders ({service.totalOrders})
            </Typography>
          </Grid>
          <Grid item>
            <Rating
              value={service.rating}
              readOnly
              precision={0.5}
              size="small"
            />
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


 // The component you shared earlier


const MyServices = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    // Fetch the services for the logged-in user
    const fetchServices = async () => {
      try {
        const response = await axios.get('http://localhost:5000/fyp/getServiceByUser',{
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          }
        }); // Adjust the URL if needed
        setServices(response.data.services);
      } catch (error) {
        console.error('Error fetching user services:', error);
      }
    };

    fetchServices();
  }, []);

  return (
    <div>
      <Grid container spacing={2}>
        {services.length > 0 ? (
          services.map((service) => (
            <Grid item key={service._id} xs={12} sm={6} md={4}>
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
              />
            </Grid>
          ))
        ) : (
          <Typography variant="body1">You have no services listed yet.</Typography>
        )}
      </Grid>
    </div>
  );
};

export default MyServices;


