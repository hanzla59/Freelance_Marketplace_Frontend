import React, { useState } from 'react';
import { Card, Box, Typography, Button, useMediaQuery, useTheme, Snackbar, Alert } from '@mui/material';
import BidDialog from './BidDialog';

const TaskCard = ({ title, description, location, price, status, user, jobId, image, video, buyerId }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Function to truncate the description after 15 words
  const truncateDescription = (desc) => {
    const words = desc.split(' ');
    return words.length > 15 ? `${words.slice(0, 15).join(' ')}...` : desc;
  };

  const [openBidDialog, setOpenBidDialog] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleOpenBidDialog = () => {
    const auth = localStorage.getItem('auth') === 'true';
    const role = localStorage.getItem('role');
    const userId = localStorage.getItem('userId');
    

    if (auth && (role === 'seller' && userId !== buyerId)) {
      setOpenBidDialog(true);
    } else {
      setSnackbarMessage(userId === buyerId ? 'You cannot bid on your own task.' : auth ? 'Only sellers can bid on the task.' : 'Please login as a Seller.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleCloseBidDialog = () => setOpenBidDialog(false);
  const handleCloseSnackbar = () => setSnackbarOpen(false);

  return (
    <>
      <Card sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', padding: 2, boxShadow: 3, border: '2px solid darkgreen', backgroundColor: 'white' }}>
        <Box flex={2} sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h6" component="div" gutterBottom sx={{ color: 'darkgreen' }}>
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ color: 'black', fontSize: '18px' }}>
            {truncateDescription(description)}
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ color: 'gray', fontSize: '14px', mt: 1 }}>
            Buyer: {user}
          </Typography>
        </Box>

        <Box flex={1} sx={{ display: 'flex', flexDirection: 'column', alignItems: isMobile ? 'flex-start' : 'flex-end' }}>
          <Typography variant="subtitle2" color="textSecondary" sx={{ color: 'red', fontSize: '14px' }}>
            {location}
          </Typography>
          <Typography variant="h6" component="div" sx={{ color: 'black' }}>
            {price} PKR
          </Typography>

          {status === 'open' ? (
            <Button variant="contained" color="success" sx={{ marginTop: 1, padding: '5px 30px' }} onClick={handleOpenBidDialog}>
              Bid
            </Button>
          ) : (
            <Typography variant="body2" color="textSecondary" sx={{ marginTop: 1 }}>
              {status}
            </Typography>
          )}
        </Box>
      </Card>

      {/* BidDialog component */}
      <BidDialog
        open={openBidDialog}
        handleClose={handleCloseBidDialog}
        title={title}
        description={description}
        location={location}
        price={price}
        image={image}
        video={video}
        jobId={jobId}
      />

      {/* Colorful Snackbar for notifications */}
      <Snackbar 
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default TaskCard;
