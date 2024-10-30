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
  Snackbar,
  Alert
} from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import axios from 'axios';
import { styled } from '@mui/material/styles';

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
  const [showingImages, setShowingImages] = useState(true);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  // Input from buyer to place order
  const [price, setPrice] = useState('');
  const [requirements, setRequirements] = useState('');
  const [location, setLocation] = useState('');
  const [errors, setErrors] = useState({
    price: false,
    requirements: false,
    location: false
  });

  // Fetch the service details and reviews based on the service ID
  useEffect(() => {
    const fetchService = async () => {
      try {
        const serviceResponse = await axios.get(`http://localhost:5000/fyp/getService/${id}`);
        setService(serviceResponse.data);
      } catch (error) {
        console.error('Error fetching service:', error);
      }
    };

    const fetchReviews = async () => {
      try {
        const reviewsResponse = await axios.get(`http://localhost:5000/fyp/getReviewsOnOrder/${id}`);
        setServiceReviews(reviewsResponse.data.reviews);
        console.log(reviewsResponse.data.reviews); // Assuming your API responds with { reviews: [...] }
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

    if (!auth) {
      setSnackbarMessage('Please login as a Buyer.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      return;
    } else if (role !== 'buyer') {
      setSnackbarMessage('Only buyers can place orders.');
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
        setSnackbarMessage('Order placed successfully!');
        setSnackbarSeverity('success');
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
          <Typography variant="subtitle1" sx={{ mt: 1 }}>Seller: {service.seller.username}</Typography>
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
              onChange={(e) => setPrice(e.target.value)}
              fullWidth
              sx={{ mt: 3 }}
              error={errors.price}
              helperText={errors.price && "This field is required"}
            />
            <Button variant="contained" sx={{ mt: 3 }} onClick={handlePlaceOrder}>
              Place Order
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
              <Card key={index} sx={{ p: 2, mt: 2 }}>
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

    </Grid>
  );
};

export default ServiceLandingPage;










// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import {
//   Box,
//   Grid,
//   Typography,
//   Rating,
//   Button,
//   TextField,
//   Card,
//   CardMedia,
//   IconButton,
//   Snackbar,
//   Alert
// } from '@mui/material';
// import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
// import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
// import axios from 'axios';
// import { styled } from '@mui/material/styles';
// import Chat from '../Chat/Chat';

// // Styled components for the arrow buttons
// const ArrowButton = styled(IconButton)(({ theme }) => ({
//   position: 'absolute',
//   top: '50%',
//   transform: 'translateY(-50%)',
//   zIndex: 1,
//   backgroundColor: theme.palette.background.paper,
//   boxShadow: theme.shadows[2],
//   '&:hover': {
//     backgroundColor: theme.palette.grey[200],
//   },
// }));

// const ServiceLandingPage = () => {
//   const { id } = useParams(); // Get the service ID from the URL
//   const [service, setService] = useState(null);
//   const [serviceReviews, setServiceReviews] = useState([]);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [showingImages, setShowingImages] = useState(true);
//   const [openSnackbar, setOpenSnackbar] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState('');
//   const [snackbarSeverity, setSnackbarSeverity] = useState('success');
//   const [showChat, setShowChat] = useState(false); // State for toggling chat visibility

//   const [price, setPrice] = useState('');
//   const [requirements, setRequirements] = useState('');
//   const [location, setLocation] = useState('');
//   const [errors, setErrors] = useState({
//     price: false,
//     requirements: false,
//     location: false
//   });

//   useEffect(() => {
//     const fetchService = async () => {
//       try {
//         const serviceResponse = await axios.get(`http://localhost:5000/fyp/getService/${id}`);
//         setService(serviceResponse.data);
//       } catch (error) {
//         console.error('Error fetching service:', error);
//       }
//     };

//     const fetchReviews = async () => {
//       try {
//         const reviewsResponse = await axios.get(`http://localhost:5000/fyp/getReviewsOnOrder/${id}`);
//         setServiceReviews(reviewsResponse.data.reviews);
//       } catch (error) {
//         console.error('Error fetching reviews:', error);
//       }
//     };

//     fetchService();
//     fetchReviews();
//   }, [id]);

//   if (!service) return <Typography>Loading service...</Typography>;

//   const handleNextMedia = () => {
//     if (showingImages) {
//       if (currentImageIndex < service.images.length - 1) {
//         setCurrentImageIndex(currentImageIndex + 1);
//       } else {
//         setShowingImages(false);
//       }
//     }
//   };

//   const handlePreviousMedia = () => {
//     if (showingImages && currentImageIndex > 0) {
//       setCurrentImageIndex(currentImageIndex - 1);
//     }
//   };

//   const handlePlaceOrder = () => {
//     let hasErrors = false;
//     let newErrors = { price: false, requirements: false, location: false };

//     if (!price) {
//       newErrors.price = true;
//       hasErrors = true;
//     }
//     if (!requirements) {
//       newErrors.requirements = true;
//       hasErrors = true;
//     }
//     if (!location) {
//       newErrors.location = true;
//       hasErrors = true;
//     }

//     setErrors(newErrors);

//     if (hasErrors) return;

//     const auth = localStorage.getItem('auth') === 'true';
//     const role = localStorage.getItem('role');

//     if (!auth) {
//       setSnackbarMessage('Please login as a Buyer.');
//       setSnackbarSeverity('error');
//       setOpenSnackbar(true);
//       return;
//     } else if (role !== 'buyer') {
//       setSnackbarMessage('Only buyers can place orders.');
//       setSnackbarSeverity('error');
//       setOpenSnackbar(true);
//       return;
//     }

//     const formdata = {
//       price,
//       requirements,
//       location
//     };

//     axios.post(`http://localhost:5000/fyp/orderPlaced/${id}`, formdata, {
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${localStorage.getItem('token')}`,
//       },
//     })
//       .then((response) => {
//         setPrice('');
//         setRequirements('');
//         setLocation('');
//         setSnackbarMessage('Order placed successfully!');
//         setSnackbarSeverity('success');
//         setOpenSnackbar(true);
//       })
//       .catch((error) => {
//         console.error('Error placing order:', error);
//       });
//   };

//   return (
//     <Grid container spacing={2}>
//       <Snackbar
//         open={openSnackbar}
//         autoHideDuration={2000}
//         onClose={() => setOpenSnackbar(false)}
//         anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
//       >
//         <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
//           {snackbarMessage}
//         </Alert>
//       </Snackbar>

//       <Grid item xs={12} md={8}>
//         <Box sx={{ p: 3 }}>
//           <Typography variant="h4">{service.title}</Typography>
//           <Typography variant="subtitle1" sx={{ mt: 1 }}>Seller: {service.seller.username}</Typography>
//           <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
//             <Typography>Orders {service.orders}</Typography>
//             <Rating value={service.rating} readOnly />
//           </Box>

//           <Box sx={{ position: 'relative', mt: 3, height: 300, overflow: 'hidden', border: '1px solid #ccc' }}>
//             <ArrowButton onClick={handlePreviousMedia} sx={{ left: 0 }} disabled={showingImages && currentImageIndex === 0}>
//               <ArrowBackIosIcon />
//             </ArrowButton>

//             {showingImages ? (
//               <CardMedia component="img" src={service.images[currentImageIndex]} sx={{ height: '100%', width: '100%', objectFit: 'contain' }} />
//             ) : (
//               <CardMedia component="video" src={service.video} controls sx={{ height: '100%', width: '100%', objectFit: 'contain' }} />
//             )}

//             <ArrowButton onClick={handleNextMedia} sx={{ right: 0 }} disabled={showingImages && currentImageIndex === service.images.length - 1 && !service.video}>
//               <ArrowForwardIosIcon />
//             </ArrowButton>
//           </Box>

//           <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
//             <Typography>Location: {service.location}</Typography>
//             <Typography>Price: PKR {service.price}</Typography>
//           </Box>
//           <Typography variant="body1" sx={{ mt: 3 }}>{service.description}</Typography>

//           <Box>
//             <TextField label="Your Requirements" value={requirements} onChange={(e) => setRequirements(e.target.value)} fullWidth multiline rows={4} sx={{ mt: 3 }} error={errors.requirements} helperText={errors.requirements && "This field is required"} />
//             <TextField label="Your Location" value={location} onChange={(e) => setLocation(e.target.value)} fullWidth sx={{ mt: 3 }} error={errors.location} helperText={errors.location && "This field is required"} />
//             <TextField label="Your Offered Price" value={price} onChange={(e) => setPrice(e.target.value)} fullWidth sx={{ mt: 3 }} error={errors.price} helperText={errors.price && "This field is required"} />
//             <Button variant="contained" sx={{ mt: 3 }} onClick={handlePlaceOrder}>Place Order</Button>
//           </Box>

//           <Button variant="contained" sx={{ mt: 2 }} onClick={() => setShowChat(!showChat)}>
//             {showChat ? 'Hide Chat' : 'Message Seller'}
//           </Button>

//           {showChat && (
//             <Chat
//               roomId={id}
//               userId={localStorage.getItem('userId')}
//               token={localStorage.getItem('token')}
//             />
//           )}
//         </Box>
//       </Grid>

//       <Grid item xs={12} md={4}>
//         <Box sx={{ p: 3 }}>
//           <Typography variant="h6">Reviews</Typography>
//           {serviceReviews.length === 0 ? (
//             <Typography>No reviews yet.</Typography>
//           ) : (
//             serviceReviews.map((review, index) => (
//               <Card key={index} sx={{ mt: 2, p: 2 }}>
//                 <Typography>{review.review}</Typography>
//                 <Rating value={review.rating} readOnly />
//               </Card>
//             ))
//           )}
//         </Box>
//       </Grid>
//     </Grid>
//   );
// };

// export default ServiceLandingPage;
