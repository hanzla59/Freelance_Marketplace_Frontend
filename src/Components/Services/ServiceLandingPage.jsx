import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Grid,
  Typography,
  Rating,
  Button,
  TextField,
  Card,
  CardMedia,
  IconButton,
  Avatar,
  Snackbar,
  Alert, Dialog, DialogActions, DialogContent, DialogTitle,
} from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import SellerProfileDialog from '../Tasks/SellerProfileDialog';
const BASE_URL = import.meta.env.VITE_BASE_URL;
import { useNavigate } from 'react-router-dom';

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
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [serviceReviews, setServiceReviews] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showingImages, setShowingImages] = useState(true);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [openMessageDialog, setOpenMessageDialog] = useState(false);
  const [message, setMessage] = useState('');
  const [currentBid, setCurrentBid] = useState(null);
  const [roomId, setRoomId] = useState(null); // To store the room ID

  const [profileDialogOpen, setProfileDialogOpen] = useState(false);
  const navigate = useNavigate();

  // Input from buyer to place order
  const [price, setPrice] = useState('');
  const [requirements, setRequirements] = useState('');
  const [location, setLocation] = useState('');
  const [errors, setErrors] = useState({
    price: false,
    requirements: false,
    location: false
  });

  const handleMessageClick = async (service) => {
    // setCurrentBid(bid);
    const senderId = localStorage.getItem('userId');
    const receiverId = service.seller._id;

    // Check if a room already exists or create one
    try {
      const response = await axios.post(`${BASE_URL}/fyp/rooms`, {
        user1: senderId,
        user2: receiverId,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      setRoomId(response.data.roomId);
      setOpenMessageDialog(true);
    } catch (error) {
      setErrorMessage('Failed to create or join room');
    }
  };

  const handleSendMessage = async () => {
    if (!message.trim()) {
      setErrorMessage('Message cannot be empty');
      return;
    }

    try {
      const senderId = localStorage.getItem('userId');
      // const receiverId = currentBid?.seller?._id;
      const receiverId = service.seller._id;

      const response = await axios.post(`${BASE_URL}/fyp/sendMessage`, {
        roomId, // Send the room ID with the message
        senderId,
        receiverId,
        message,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      setSuccessMessage('Message sent successfully');
      setOpenMessageDialog(false);
      setMessage('');
    } catch (error) {
      setErrorMessage('Failed to send message');
    }
  };

  // Fetch the service details and reviews based on the service ID
  useEffect(() => {
    const fetchService = async () => {
      try {
        const serviceResponse = await axios.get(`${BASE_URL}/fyp/getService/${id}`);
        setService(serviceResponse.data);
      } catch (error) {
        console.error('Error fetching service:', error);
      }
    };

    const fetchReviews = async () => {
      try {
        const reviewsResponse = await axios.get(`${BASE_URL}/fyp/getReviewsOnOrder/${id}`);
        setServiceReviews(reviewsResponse.data.reviews);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchService();
    fetchReviews();
  }, [id]);


  if (!service) return <Typography>Loading service...</Typography>;

  // Handle right arrow click (next image or video)
  const handleNextMedia = () => {
    if (showingImages) {
      if (currentImageIndex < service.images.length - 1) {
        setCurrentImageIndex(currentImageIndex + 1);
      } else {
        setShowingImages(false);
      }
    }
  };

  // Handle left arrow click (previous image)
  const handlePreviousMedia = () => {
    if (showingImages && currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  const handlePlaceOrder = () => {
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

    if (hasErrors) return; // Don't submit if there are validation errors

    const auth = localStorage.getItem('auth') === 'true';
    const role = localStorage.getItem('role');
    const userId = localStorage.getItem('userId');

    if (!auth) {
      setSnackbarMessage('Please login as a Buyer.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      return;
    } else if (userId === service.seller._id) {
      setSnackbarMessage('you can not place an order on your own service.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      return;
    }

    // Construct the form data
    const formdata = {
      price,
      requirements,
      location
    };

    // Make API call
    axios.post(`${BASE_URL}/fyp/orderPlaced/${id}`, formdata, {
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
        setSnackbarMessage('Order placed successfully!');
        setSnackbarSeverity('success');
        setOpenSnackbar(true);
        setTimeout(() => navigate('/services'), 1000);
      })
      .catch((error) => {
        // Show error Snackbar
        setSnackbarMessage(error.response.data.message);
        if(error.response.data.cnicStatus){
          setTimeout(() => navigate('/verify-account'), 2000);
        }
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
      });
  };

  const handleProfileDialogOpen = () => {
    setProfileDialogOpen(true);
  };

  const handleProfileDialogClose = () => {
    setProfileDialogOpen(false);
  };

  return (
    <Grid container spacing={2}>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>

      {/* 80% - Service Details */}
      <Grid item xs={12} md={8}>
        <Box sx={{ p: 3 }}>
          <Typography variant="h4">{service.title}</Typography>
          <div style={{display:'flex'}}>
          <Avatar
            src={''}
            sx={{ width: 25, height: 25, mt:"10.5px", cursor:'pointer', backgroundColor:'green' }}
            onClick={handleProfileDialogOpen}
          />
          <Typography variant="subtitle1" sx={{ mt: 1, ml:1, fontSize:'18px', color: 'green', cursor: 'pointer' }} onClick={handleProfileDialogOpen}>{service.seller.username}</Typography>
          </div>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
            <Typography>Orders {service.orders}</Typography>
            <Rating value={service.rating} readOnly />
          </Box>

          {/* Media Section with Arrows */}
          <Box sx={{ position: 'relative', mt: 3, height: 300, overflow: 'hidden', border: '1px solid #ccc' }}>
            <ArrowButton
              onClick={handlePreviousMedia}
              sx={{ left: 0 }}
              disabled={showingImages && currentImageIndex === 0}
            >
              <ArrowBackIosIcon />
            </ArrowButton>

            {showingImages ? (
              <CardMedia
                component="img"
                src={service.images[currentImageIndex]}
                sx={{ height: '100%', width: '100%', objectFit: 'contain' }}
              />
            ) : (
              <CardMedia
                component="video"
                src={service.video}
                controls
                sx={{ height: '100%', width: '100%', objectFit: 'contain' }}
              />
            )}

            <ArrowButton
              onClick={handleNextMedia}
              sx={{ right: 0 }}
              disabled={showingImages && currentImageIndex === service.images.length - 1 && !service.video}
            >
              <ArrowForwardIosIcon />
            </ArrowButton>
          </Box>

          {/* Image Indicator Dots */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            {showingImages
              ? service.images.map((_, index) => (
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
              ))
              : (
                <Box sx={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  backgroundColor: 'primary.main',
                  mx: 0.5,
                }} />
              )}
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
            <Typography>Location: {service.location}</Typography>
            <Typography>Price: PKR {service.price}</Typography>
          </Box>
          <Typography variant="body1" sx={{ mt: 3 }}>{service.description}</Typography>

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
              label="Your Offered Price"
              value={price}
              type="number"
              onChange={(e) => setPrice(e.target.value)}
              fullWidth
              sx={{ mt: 3 }}
              error={errors.price}
              helperText={errors.price && "This field is required"}
            />
            <Button variant="contained" sx={{ mt: 3, backgroundColor: 'green' }} onClick={handlePlaceOrder}>
              Place Order
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleMessageClick(service)}
              style={{ marginTop: '22px', marginLeft: '10px', backgroundColor: 'black' }}
            >
              Message
            </Button>
          </Box>
        </Box>
      </Grid>

      {/* 20% - Reviews Section */}
      <Grid item xs={12} md={4}>
        <Box sx={{ p: 3 }}>
          <Typography variant="h6">Reviews</Typography>
          {serviceReviews.length === 0 ? (
            <Typography>No reviews yet.</Typography>
          ) : (
            serviceReviews.map((review, index) => (
              <Card key={index} sx={{ p: 2, mt: 2, border: '1px solid green' }}>
                <Typography>Review: {review.review}</Typography> {/* Changed from `review.comment` */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                  <Typography>Buyer: {review.buyer.username}</Typography> {/* Changed from `review.username` */}
                  <Rating value={review.rating} readOnly />
                </Box>
              </Card>
            ))
          )}
        </Box>
      </Grid>
      {/* Message Dialog */}
      <Dialog open={openMessageDialog} onClose={() => setOpenMessageDialog(false)}>
        <DialogTitle>Send Message</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="message"
            label="Message"
            type="text"
            fullWidth
            variant="outlined"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            multiline
            rows={4}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenMessageDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSendMessage} color="primary">
            Send
          </Button>
        </DialogActions>
      </Dialog>
      {/* Snackbar for success message */}
      <Snackbar open={!!successMessage} autoHideDuration={6000} onClose={() => setSuccessMessage('')}>
        <Alert onClose={() => setSuccessMessage('')} severity="success" sx={{ width: '100%' }}>
          {successMessage}
        </Alert>
      </Snackbar>

      {/* Snackbar for error message */}
      <Snackbar open={!!errorMessage} autoHideDuration={6000} onClose={() => setErrorMessage('')}>
        <Alert onClose={() => setErrorMessage('')} severity="error" sx={{ width: '100%' }}>
          {errorMessage}
        </Alert>
      </Snackbar>
      <SellerProfileDialog
        open={profileDialogOpen}
        onClose={handleProfileDialogClose}
        username={service.seller.username}
      />


    </Grid>
  );
};

export default ServiceLandingPage;










