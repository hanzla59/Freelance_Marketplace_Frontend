// import React, { useEffect, useState } from 'react';
// import { Box, Typography, Button, Grid, Card, CardContent, CircularProgress } from '@mui/material';
// import axios from 'axios';
// import { useTheme } from '@mui/material/styles';
// import { useMediaQuery } from '@mui/material';

// // Helper function to format the date
// const formatDate = (isoDate) => {
//   const date = new Date(isoDate);
//   return date.toLocaleDateString('en-US', {
//     year: 'numeric',
//     month: 'numeric',
//     day: 'numeric',
//   });
// };

// // OrderCard Component
// const OrderCard = ({ order }) => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

//   let isSeller = false;
//   if (localStorage.getItem('role') === 'seller') {
//     isSeller = 'seller';
//   }

//   let isBuyer = false;
//   if (localStorage.getItem('role') === 'buyer') {
//     isBuyer = 'buyer';
//   }

//   //handle cancel order and update the ui

//   const handleCancelOrder = async (orderId) => {
//     try {
//       const response = await axios.put(
//         `http://localhost:5000/fyp/orderCancelled/${orderId}`,
//         {},
//         {
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${localStorage.getItem('token')}`,
//           },
//         }
//       );
//       alert(response.data.message);
//       setTimeout(() => {
//         window.location.reload();
//       }, 2000);
      

      
//     } catch (err) {
//       alert('Failed to cancel the order');
//     }
//   }
  
//   return (
//     <Card sx={{ my: 2, p: 0, border: '2px solid #31473A', backgroundColor: '#EDF4F2' }}>
//       <CardContent>
//         <Grid container spacing={1} alignItems="center">
//           {/* Top Left: Order ID */}
//           <Grid item xs={12} sm={6}>
//             <Typography variant="subtitle2" sx={{ fontSize: '22px' }}>
//               Order ID: {order._id}
//             </Typography>
//           </Grid>

//           {/* Top Right: Order Price */}
//           <Grid item xs={12} sm={6} sx={{ textAlign: isMobile ? 'left' : 'right' }}>
//             <Typography variant="subtitle2" sx={{ fontSize: '22px' }}>
//               PKR {order.price}
//             </Typography>
//           </Grid>

//           {/* Below Order ID: Requirements */}
//           <Grid item xs={12}>
//             <Typography variant="body2">
//               Requirements: {order.requirements}
//             </Typography>
//           </Grid>

//           {/* Row for Location, Date, and Buttons */}
//           <Grid container justifyContent="space-between" alignItems="center" sx={{ mt: 2, marginLeft: 1 }}>
//             {/* Left: Location and Date */}
//             <Grid item xs={12} sm={6}>
//               <Typography variant="body1">Location: {order.location}</Typography>
//               <Typography variant="body2">Date: {formatDate(order.createdAt)}</Typography>
//             </Grid>

//             {/* Right: Buttons for Seller and Buyer */}
//             <Grid item xs={12} sm={6} sx={{ textAlign: 'right' }}>
//               {order.status === 'active' ? (
//                 <>
//                   {isSeller && (
//                     <>
//                       <Button variant="contained" color="success" sx={{ mr: 1 }}>
//                         Complete Order
//                       </Button>
//                       <Button variant="outlined" color="error" onClick={() => handleCancelOrder(order._id)}>
//                         Cancel Order
//                       </Button>
//                     </>
//                   )}
//                   {isBuyer && (
//                     <Button variant="contained" color="error" onClick={() => handleCancelOrder(order._id)}>
//                       Cancel Order
//                     </Button>
//                   )}
//                 </>
//               ) : (
//                 <Typography variant="body2" color="textSecondary">
//                   Status: {order.status}
//                 </Typography>
//               )}
//             </Grid>
//           </Grid>
//         </Grid>
//       </CardContent>
//     </Card>
//   );
// };

// export default function ServiceOrders() {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     // Fetch orders from the API
//     const fetchOrders = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/fyp/getOrders', {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`,
//           },
//         });
//         setOrders(response.data.orders);
//         setLoading(false);
//       } catch (err) {
//         console.error('Error fetching orders:', err);
//         setError('Failed to fetch orders.');
//         setLoading(false);
//       }
//     };

//     fetchOrders();
//   }, []);

//   return (
//     <Box >
//       <Typography variant="h5" sx={{ mb: 2 }}>
//         Your Orders
//       </Typography>

//       {loading ? (
//         <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
//           <CircularProgress />
//         </Box>
//       ) : error ? (
//         <Typography color="error">{error}</Typography>
//       ) : orders.length > 0 ? (
//         orders.map((order) => <OrderCard key={order._id} order={order} />)
//       ) : (
//         <Typography>No orders found.</Typography>
//       )}
//     </Box>
//   );
// }




// import React, { useEffect, useState } from 'react';
// import {
//   Box,
//   Typography,
//   Button,
//   Grid,
//   Card,
//   CardContent,
//   CircularProgress,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
//   IconButton,
// } from '@mui/material';
// import axios from 'axios';
// import { useTheme } from '@mui/material/styles';
// import { useMediaQuery } from '@mui/material';
// import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
// import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
// import DeleteIcon from '@mui/icons-material/Delete';

// const formatDate = (isoDate) => {
//   const date = new Date(isoDate);
//   return date.toLocaleDateString('en-US', {
//     year: 'numeric',
//     month: 'numeric',
//     day: 'numeric',
//   });
// };

// const OrderCard = ({ order }) => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
//   const [openDialog, setOpenDialog] = useState(false);
//   const [workText, setWorkText] = useState('');
//   const [uploadedImages, setUploadedImages] = useState([]);
//   const [uploadedVideos, setUploadedVideos] = useState([]);

//   const handleCompleteOrderClick = () => setOpenDialog(true);
//   const handleDialogClose = () => setOpenDialog(false);

//   const handleWorkTextChange = (event) => setWorkText(event.target.value);

//   const handleImageUpload = (event) => {
//     const files = Array.from(event.target.files);
//     setUploadedImages((prev) => [...prev, ...files]);
//   };

//   const handleVideoUpload = (event) => {
//     const files = Array.from(event.target.files);
//     setUploadedVideos((prev) => [...prev, ...files]);
//   };

//   const handleDeleteImage = (index) => {
//     setUploadedImages((prev) => prev.filter((_, i) => i !== index));
//   };

//   const handleDeleteVideo =  (index) => {
//     setUploadedVideos((prev) => prev.filter((_, i) => i !== index));
//   };

//   const handleOrderDelivered = async () => {
//     const formData = new FormData();
//   formData.append('work', workText);
  
//   uploadedImages.forEach((file) => {
//     formData.append('image', file);
//   });

//   uploadedVideos.forEach((file) => {
//     formData.append('video', file);
//   });

//   try {
//     const response = await axios.put(`http://localhost:5000/fyp/orderDelivered/${order._id}`, formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//         Authorization: `Bearer ${localStorage.getItem('token')}`,
//       },
//     });
//     alert(response.data.message);
//     handleDialogClose();
//     setTimeout(() => window.location.reload(), 2000); // Reload to see updated order status
//   } catch (err) {
//     alert('Failed to deliver the order. Please try again.');
//   }
//   };

//   let isSeller = false;
//   let isBuyer = false;
//   if (localStorage.getItem('role') === 'seller') {
//     isSeller = 'seller';
//   }

//   if (localStorage.getItem('role') === 'buyer') {
//     isBuyer = 'buyer';
//   }

//   const handleCancelOrder = async (orderId) => {
//     try {
//       const response = await axios.put(
//         `http://localhost:5000/fyp/orderCancelled/${orderId}`,
//         {},
//         {
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${localStorage.getItem('token')}`,
//           },
//         }
//       );
//       alert(response.data.message);
//       setTimeout(() => window.location.reload(), 2000);
//     } catch (err) {
//       alert('Failed to cancel the order');
//     }
//   };

//   return (
//     <Card sx={{ my: 2, p: 0, border: '2px solid #31473A', backgroundColor: order.status === 'delivered' ? 'green' : '#EDF4F2' }}>
//       <CardContent>
//         <Grid container spacing={1} alignItems="center">
//           <Grid item xs={12} sm={6}>
//             <Typography variant="subtitle2" sx={{ fontSize: '22px' }}>
//               Order ID: {order._id}
//             </Typography>
//           </Grid>
//           <Grid item xs={12} sm={6} sx={{ textAlign: isMobile ? 'left' : 'right' }}>
//             <Typography variant="subtitle2" sx={{ fontSize: '22px' }}>
//               PKR {order.price}
//             </Typography>
//           </Grid>
//           <Grid item xs={12}>
//             <Typography variant="body2">Requirements: {order.requirements}</Typography>
//           </Grid>
//           <Grid container justifyContent="space-between" alignItems="center" sx={{ mt: 2, marginLeft: 1 }}>
//             <Grid item xs={12} sm={6}>
//               <Typography variant="body1">Location: {order.location}</Typography>
//               <Typography variant="body2">Date: {formatDate(order.createdAt)}</Typography>
//             </Grid>
//             <Grid item xs={12} sm={6} sx={{ textAlign: 'right' }}>
//               {order.status === 'active' ? (
//                 <>
//                   {isSeller && (
//                     <>
//                       <Button variant="contained" color="success" sx={{ mr: 1 }} onClick={handleCompleteOrderClick}>
//                         Complete Order
//                       </Button>
//                       <Button variant="outlined" color="error" onClick={() => handleCancelOrder(order._id)}>
//                         Cancel Order
//                       </Button>
//                     </>
//                   )}
//                   {isBuyer && (
//                     <Button variant="contained" color="error" onClick={() => handleCancelOrder(order._id)}>
//                       Cancel Order
//                     </Button>
//                   )}
//                 </>
//               ) : (
//                 <Typography variant="body2" color="textSecondary">
//                   Status: {order.status}
//                 </Typography>
//               )}
//             </Grid>
//           </Grid>
//         </Grid>

//         <Dialog open={openDialog} onClose={handleDialogClose} fullWidth maxWidth="sm">
//           <DialogTitle>Complete Your Service Order</DialogTitle>
//           <DialogContent>
//             <TextField
//               fullWidth
//               multiline
//               rows={4}
//               label="Work Details"
//               variant="outlined"
//               value={workText}
//               onChange={handleWorkTextChange}
//               sx={{ mb: 2, mt: 1 }}
//             />
//             <Box sx={{ display: 'flex', mt: 2 }}>
//               <Button variant="contained" component="label" fullWidth startIcon={<AddPhotoAlternateIcon />}>
//                 Upload Image
//                 <input hidden accept="image/*" multiple type="file" onChange={handleImageUpload} />
//               </Button>
//             </Box>
//             <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mt: 1 }}>
//               {uploadedImages.map((file, index) => (
//                 <Box key={index} sx={{ position: 'relative' }}>
//                   <img
//                     src={URL.createObjectURL(file)}
//                     alt={`Uploaded ${index}`}
//                     style={{ width: '80px', height: '80px', objectFit: 'cover' }}
//                   />
//                   <IconButton
//                     onClick={() => handleDeleteImage(index)}
//                     sx={{ position: 'absolute', top: 0, right: 0, color: 'red' }}
//                   >
//                     <DeleteIcon />
//                   </IconButton>
//                 </Box>
//               ))}
//             </Box>
//             <Box sx={{ display: 'flex', mt: 2 }}>
//               <Button variant="contained" component="label" fullWidth startIcon={<VideoLibraryIcon />}>
//                 Upload Video
//                 <input hidden accept="video/*" multiple type="file" onChange={handleVideoUpload} />
//               </Button>
//             </Box>
//             <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mt: 1 }}>
//               {uploadedVideos.map((file, index) => (
//                 <Box key={index} sx={{ position: 'relative' }}>
//                   <video
//                     src={URL.createObjectURL(file)}
//                     style={{ width: '80px', height: '80px', objectFit: 'cover' }}
//                     controls
//                   />
//                   <IconButton
//                     onClick={() => handleDeleteVideo(index)}
//                     sx={{ position: 'absolute', top: 0, right: 0, color: 'red' }}
//                   >
//                     <DeleteIcon />
//                   </IconButton>
//                 </Box>
//               ))}
//             </Box>
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={handleDialogClose} color="error" variant="outlined">
//               Cancel
//             </Button>
//             <Button onClick={handleOrderDelivered} color="primary" variant="contained" sx={{ mr: 2 }}>
//               Order Delivered
//             </Button>
//           </DialogActions>
//         </Dialog>
//       </CardContent>
//     </Card>
//   );
// };





import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, CircularProgress } from '@mui/material';
import OrderCard from './OrderCard'; // Import the OrderCard component

export default function ServiceOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:5000/fyp/getOrders', {
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
      <Typography variant="h5" sx={{ mb: 2 }}>
        Your Orders
      </Typography>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : orders.length > 0 ? (
        orders.map((order) => <OrderCard key={order._id} order={order} />)
      ) : (
        <Typography>No orders found.</Typography>
      )}
    </Box>
  );
}
