import React, { useState } from 'react';
import { Card, Box, Typography, Button, useTheme, useMediaQuery } from '@mui/material';
import OrderDetailDialog from './OrderDetailDialog'; // Import the dialog component
import ReviewDialog from './ReviewDialog'; // Import the review dialog component

const OrderCard = ({ orderId, price, status, sellerName, buyerName, creationDate, work, image, video, onCancel, onComplete }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const role = localStorage.getItem('role');

  const [dialogOpen, setDialogOpen] = useState(false);
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false); // State for review dialog

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleReviewDialogOpen = () => {
    setReviewDialogOpen(true);
  };

  const handleReviewDialogClose = () => {
    setReviewDialogOpen(false);
  };

  return (
    <>
      <Card sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', padding: 2, boxShadow: 3, marginBottom: 1, border: '2px solid #31473A', backgroundColor: '#EDF4F2' }}>
        <Box flex={2} sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h6" component="div" gutterBottom>
            Order ID: {orderId}
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ color: 'black', fontSize: '16px', mt: 1 }}>
            {role === 'buyer' ? `Seller: ${sellerName}` : `Buyer: ${buyerName}`}
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ color: 'black', fontSize: '14px', mt: 1 }}>
            Date: {new Date(creationDate).toLocaleDateString()}
          </Typography>
        </Box>

        <Box flex={1} sx={{ display: 'flex', flexDirection: 'column', alignItems: isMobile ? 'flex-start' : 'flex-end' }}>
          <Typography variant="h6" component="div" sx={{ color: 'black' }}>
            {price} PKR
          </Typography>
          {status === 'active' && role === 'buyer' ? (
            <Button variant="contained" color="error" sx={{ mt: 1 }} onClick={onCancel}>
              Cancel
            </Button>
          ) : status === 'complete' && role === 'buyer' ? (
            <>
            <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>

              <Button variant="contained"  sx={{ mt: 1, backgroundColor: 'green', color: 'white' }} onClick={handleDialogOpen}>
                Open
              </Button>
              <Button variant="outlined" color="secondary" sx={{ mt: 1, color: 'green', borderColor: 'green' }} onClick={handleReviewDialogOpen}>
                Review
              </Button>

            </Box>
            </>
          ) : status === 'active' && role === 'seller' ? (
            <>
            <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
              <Button variant="outlined" color="error" sx={{ mt: 1 }} onClick={onCancel}>
                Cancel
              </Button>
              <Button variant="contained"  sx={{ mt: 1, backgroundColor: 'green', color: 'white' }} onClick={onComplete}>
                Complete
              </Button>

            </Box>
            </>
          ) : (
            <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
              {status}
            </Typography>
          )}
        </Box>
      </Card>

      {/* OrderDetailDialog for showing order details */}
      <OrderDetailDialog
        open={dialogOpen}
        onClose={handleDialogClose}
        orderId={orderId}
        price={price}
        work={work}
        image={image}
        video={video}
      />

      {/* ReviewDialog for submitting a review */}
      <ReviewDialog
        open={reviewDialogOpen}
        onClose={handleReviewDialogClose}
        orderId={orderId}
      />
    </>
  );
};

export default OrderCard;
