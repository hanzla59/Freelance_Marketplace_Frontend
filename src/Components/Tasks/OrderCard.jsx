import React, { useState } from 'react';
import { Card, Box, Typography, Button, useTheme, useMediaQuery } from '@mui/material';
import OrderDetailDialog from './OrderDetailDialog'; // Import the dialog component
import ReviewDialog from './ReviewDialog'; // Import the review dialog component
import BuyerReviewDialog from '../User/BuyerReviewDialog';

const OrderCard = ({ orderId, price, status, sellerName, buyerName, creationDate, work, image, video, onCancel, onComplete, buyerId}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const role = localStorage.getItem('role');
  const userId = localStorage.getItem('userId');

  const [dialogOpen, setDialogOpen] = useState(false);
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false); // State for review dialog
  const [buyerReviewDialogOpen, setBuyerReviewDialogOpen] = useState(false); // State for buyer review dialog

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

  const handleBuyerReviewDialogOpen = () => {
    setBuyerReviewDialogOpen(true);
  };

  const handleBuyerReviewDialogClose = () => {
    setBuyerReviewDialogOpen(false);
  };


  return (
    <>
      <Card sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', padding: 2, boxShadow: 3, marginBottom: 1, border: '2px solid #31473A', backgroundColor: '#EDF4F2' }}>
        <Box flex={2} sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h6" component="div" gutterBottom>
            OrderId: {orderId}
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ color: 'black', fontSize: '16px', mt: 1 }}>
            {userId === buyerId ? `Seller: ${sellerName}` : `Buyer: ${buyerName}`}
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ color: 'black', fontSize: '14px', mt: 1 }}>
            Date: {new Date(creationDate).toLocaleDateString()}
          </Typography>
        </Box>

        <Box flex={1} sx={{ display: 'flex', flexDirection: 'column', alignItems: isMobile ? 'flex-start' : 'flex-end' }}>
          <Typography variant="h6" component="div" sx={{ color: 'black' }}>
            {price} PKR
          </Typography>
          {status === 'active' && userId === buyerId ? (
            <Button variant="contained" color="error" sx={{ mt: 1 }} onClick={onCancel}>
              Cancel
            </Button>
          ) : status === 'complete' && userId === buyerId ? (
            <>
            <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>

              <Button variant="contained"  sx={{ mt: 1, backgroundColor: 'green', color: 'white' }} onClick={handleDialogOpen}>
                Open
              </Button>
              <Button variant="outlined" color="secondary" sx={{ mt: 1, color: 'green', borderColor: 'green' }} onClick={handleReviewDialogOpen}>
                Give Review to Seller
              </Button>

            </Box>
            </>
          ) : status === 'active' && userId !== buyerId ? (
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
              <Button variant="contained"  sx={{ mt: 1,mr:1, backgroundColor: 'green', color: 'white' }} onClick={handleDialogOpen}>
                Open
              </Button>
              <Button variant="outlined" color="secondary" sx={{ mt: 1, color: 'green', borderColor: 'green' }} onClick={handleBuyerReviewDialogOpen}>
                Give Review to Buyer
              </Button>


              {/* {status} */}
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
      {/* BuyerReviewDialog for submitting a review to the buyer */}
      <BuyerReviewDialog
        open={buyerReviewDialogOpen}
        onClose={handleBuyerReviewDialogClose}
        orderId={orderId}
      />
    </>
  );
};

export default OrderCard;
