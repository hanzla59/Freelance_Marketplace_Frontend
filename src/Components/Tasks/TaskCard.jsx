import React, { useState } from 'react';
import { Card, Box, Typography, Button, useMediaQuery, useTheme, Snackbar, Alert } from '@mui/material';
import BidDialog from './BidDialog';
import BuyerProfileDialog from './BuyerProfileDialog';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useNavigate } from 'react-router-dom';


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

  const [profileDialogOpen, setProfileDialogOpen] = useState(false);
  const navigate = useNavigate();

  const handleOpenBidDialog = () => {
    const auth = localStorage.getItem('auth') === 'true';
    const role = localStorage.getItem('role');
    const userId = localStorage.getItem('userId');


    if (auth && (role === 'seller' && userId !== buyerId)) {
      setOpenBidDialog(true);
    } else {
      setSnackbarMessage(userId === buyerId ? 'You cannot bid on your own task.' : auth ? 'Only sellers can bid on the task.' : 'Please login as a Seller.');
      if(!auth){ setTimeout(() => navigate('/login'), 2000); } 
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleCloseBidDialog = () => setOpenBidDialog(false);
  const handleCloseSnackbar = () => setSnackbarOpen(false);

  const handleProfileDialogOpen = () => {
    setProfileDialogOpen(true);
  };

  const handleProfileDialogClose = () => {
    setProfileDialogOpen(false);
  };

  return (
    <>
      <Card sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', padding: 2, boxShadow: 3, border: '2px solid darkgreen', backgroundColor: 'white' }}>
        <Box flex={2} sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography component="div" gutterBottom sx={{ color: 'darkgreen', fontSize: '28px', mb: 0 }}>
            {title}
          </Typography>
          <Typography sx={{ color: 'black', fontSize: '16px' }}>
            {truncateDescription(description)}
          </Typography>
          <div style={{ display: 'flex' }}>
            <Button variant="outlined" color="textSecondary" sx={{ fontSize: '12px', cursor: 'pointer', mt: 1, borderColor: 'darkgreen', color: 'green', padding: '2px 10px', boxShadow: 2 }} onClick={handleProfileDialogOpen}>
              Client Profile
            </Button>
          </div>
        </Box>

        <Box flex={1} sx={{ display: 'flex', flexDirection: 'column', alignItems: isMobile ? 'flex-start' : 'flex-end' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <LocationOnIcon color="action" style={{ width: '18px' }} />
            <Typography variant="subtitle2" color="textSecondary" sx={{ color: 'green', fontSize: '16px',marginTop:'5px' }}>

              {location}
            </Typography>

          </div>
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
      <BuyerProfileDialog
        open={profileDialogOpen}
        onClose={handleProfileDialogClose}
        username={user}
      />
    </>
  );
};

export default TaskCard;
