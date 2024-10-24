import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Grid, Typography, Rating, Button, TextField, Card, CardMedia, IconButton } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import { Snackbar, Alert } from '@mui/material';

// Static reviews for now
const reviews = [
  { serviceId: 1, username: "Alice", rating: 5, comment: "Great work!" },
  { serviceId: 2, username: "Bob", rating: 4, comment: "Good design." },
];

// Styled components for the arrow buttons
const ArrowButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  zIndex: 1,
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[2],
  '&:hover': {
    backgroundColor: theme.palette.grey[200],
  },
}));

const ServiceLandingPage = () => {
  const { id } = useParams(); // Get the service ID from the URL
  const [service, setService] = useState(null);
  const [serviceReviews, setServiceReviews] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  //input from buyer to place order
  const [price, setPrice] = useState('');
  const [requirements, setRequirements] = useState('');
  const [location, setLocation] = useState('');
  const [errors, setErrors] = useState({
    price: false,
    description: false,
    location: false
  });

  // Fetch the service details based on the service ID
  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/fyp/getService/${id}`); // Adjust the API endpoint
        setService(response.data);
      } catch (error) {
        console.error('Error fetching service:', error);
      }
    };

    fetchService();

    // Fetch static reviews based on the service ID (for now)
    const fetchedReviews = reviews.filter((r) => r.serviceId === parseInt(id));
    setServiceReviews(fetchedReviews);
  }, [id]);

  if (!service) return <Typography>Loading service...</Typography>;

  // Handle right arrow click (next image)
  const handleNextImage = () => {
    if (currentImageIndex < service.images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  // Handle left arrow click (previous image)
  const handlePreviousImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  const handleplacedOrder = () => {
    let hasErrors = false;
    let newErrors = { price: false, requirements: false, location: false };

    // Check for empty fields
    if (!price) {
      newErrors.price = true;
      hasErrors = true;
    }
    if (!requirements) {
      newErrors.requirements = true;
      hasErrors = true;
    }
    if (!location) {
      newErrors.location = true;
      hasErrors = true;
    }

    setErrors(newErrors);

    if (hasErrors) {
      return; // Don't submit if there are validation errors
    }

    // Construct the form data
    const formdata = {
      price,
      requirements,
      location
    };

    // Make API call
    axios.post(`http://localhost:5000/fyp/orderPlaced/${id}`, formdata, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((response) => {
        setPrice('');
        setRequirements('');
        setLocation('');
        // Show success Snackbar
        setOpenSnackbar(true);
      })
      .catch((error) => {
        console.error('Error placing order:', error);
      });
  };

  return (
    <Grid container spacing={2}>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: '100%' }}>
          Order placed successfully!
        </Alert>
      </Snackbar>
      {/* 80% - Service Details */}
      <Grid item xs={12} md={8}>
        <Box sx={{ p: 3 }}>
          <Typography variant="h4">{service.title}</Typography>
          <Typography variant="subtitle1" sx={{ mt: 1 }}>Seller: {service.seller.username}</Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
            <Typography>Orders {service.orders}</Typography>
            <Rating value={service.rating} readOnly />
          </Box>

          {/* Media Section with Arrows */}
          <Box sx={{ position: 'relative', mt: 3, height: 300, overflow: 'hidden', border: '1px solid #ccc' }}>
            <ArrowButton
              onClick={handlePreviousImage}
              sx={{ left: 0 }}
              disabled={currentImageIndex === 0}
            >
              <ArrowBackIosIcon />
            </ArrowButton>

            <CardMedia
              component="img"
              src={service.images[currentImageIndex]}
              sx={{ height: '100%', width: '100%', objectFit: 'contain' }}
            />

            <ArrowButton
              onClick={handleNextImage}
              sx={{ right: 0 }}
              disabled={currentImageIndex === service.images.length - 1}
            >
              <ArrowForwardIosIcon />
            </ArrowButton>
          </Box>

          {/* Image Indicator Dots */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            {service.images.map((_, index) => (
              <Box
                key={index}
                sx={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  backgroundColor: index === currentImageIndex ? 'primary.main' : 'grey.400',
                  mx: 0.5,
                }}
              />
            ))}
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
            <Typography>Location: {service.location}</Typography>
            <Typography>Price: PKR {service.price}</Typography>
          </Box>
          <Typography variant="body1" sx={{ mt: 3 }}>{service.description}</Typography>

          {/* <TextField label="Your Requirements" value={description} onChange={(e) => setDescription(e.target.value)} fullWidth multiline rows={4} sx={{ mt: 3 }} />
          <TextField label="Your Location" value={location} onChange={(e) => setLocation(e.target.value)} fullWidth sx={{ mt: 3 }} />
          <TextField label="Enter Your Price" value={price} onChange={(e) => setPrice(e.target.value)} type="number" fullWidth sx={{ mt: 3 }} />
          <Button variant="contained" sx={{ mt: 3 }} onClick={handleplacedOrder}>Place Order</Button> */}
          <Box>
            <TextField
              label="Your Requirements"
              value={requirements}
              onChange={(e) => setRequirements(e.target.value)}
              fullWidth
              multiline
              rows={4}
              sx={{ mt: 3 }}
              error={errors.requirements}
              helperText={errors.requirements && "This field is required"}
            />
            <TextField
              label="Your Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              fullWidth
              sx={{ mt: 3 }}
              error={errors.location}
              helperText={errors.location && "This field is required"}
            />
            <TextField
              label="Enter Your Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              type="number"
              fullWidth
              sx={{ mt: 3 }}
              error={errors.price}
              helperText={errors.price && "This field is required"}
            />
            <Button variant="contained" sx={{ mt: 3 }} onClick={handleplacedOrder}>Place Order</Button>
          </Box>
        </Box>
      </Grid>

      {/* 20% - Service Reviews */}
      <Grid item xs={12} md={4}>
        <Box sx={{ p: 3 }}>
          <Typography variant="h6">Reviews</Typography>
          {reviews.map((review, index) => (
            <Card key={index} sx={{ p: 2, mt: 2 }}>
              <Typography>{review.comment}</Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                <Typography>{review.username}</Typography>
                <Rating value={review.rating} readOnly />
              </Box>
            </Card>
          ))}
        </Box>
      </Grid>
    </Grid>
  );
};

export default ServiceLandingPage;
