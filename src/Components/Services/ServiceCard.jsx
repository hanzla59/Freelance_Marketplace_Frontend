import React from 'react';
import { Card, CardMedia, CardContent, Typography, Grid, Rating } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ServiceCard = ({ service }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/service/${service.id}`);
  };

  return (
    <Card 
      onClick={handleClick} 
      sx={{ 
        width: '100%', 
        maxWidth: 270, 
        cursor: 'pointer', 
        boxShadow: 3, 
        height: 320, // Fixed height for the card 
      }}
    >
      <CardMedia
        component="img"
        image={service.image}
        alt={service.title}
        sx={{ height: 200, objectFit: 'cover' }} // Image height fixed
      />
      <CardContent sx={{ height: 160 }}>
        <Typography 
          variant="h6" 
          sx={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            maxWidth: '100%',
          }}
        >
          {service.title.length > 60 ? service.title.substring(0, 60) + '...' : service.title}
        </Typography>
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
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
