import React from 'react';
import { Card, Box, Typography, Button, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import axios from 'axios';
import { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Snackbar, Alert } from '@mui/material';
import SellerProfileDialog from '../Tasks/SellerProfileDialog';

const ReceivedBidCard = ({ proposal, location, bid, job, status, onAccept, onReject, sellerId, sellerName }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));


  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [openMessageDialog, setOpenMessageDialog] = useState(false);
  const [message, setMessage] = useState('');
  const [currentBid, setCurrentBid] = useState(null);
  const [roomId, setRoomId] = useState(null); // To store the room ID
  const [profileDialogOpen, setProfileDialogOpen] = useState(false);


  const handleMessageClick = async (sellerId) => {
    const senderId = localStorage.getItem('userId');
    const receiverId = sellerId;

    // Check if a room already exists or create one
    try {
      const response = await axios.post('http://localhost:5000/fyp/rooms', {
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
      const receiverId = sellerId;

      const response = await axios.post('http://localhost:5000/fyp/sendMessage', {
        roomId,
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
      console.error(error);
    }
  };

  const handleProfileDialogOpen = () => {
    setProfileDialogOpen(true);
  };

  const handleProfileDialogClose = () => {
    setProfileDialogOpen(false);
  };

  return (
    <>
      <Card sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', padding: 2, boxShadow: 3, border: '2px solid green' }}>
        {/* Left side: Proposal and Location */}
        <Box flex={2} sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h5" color="black" >
            Job: {job}
          </Typography>
          <Typography variant="h6" component="div" gutterBottom>
            {proposal}
          </Typography>
          <div style={{ display: 'flex' }}>
          {/* <Typography variant="body2" color="textSecondary" sx={{ color: 'black', fontSize: '16px' }}>
            Location: {location}
          </Typography> */}
          <Typography variant="body2" color="textSecondary" sx={{ fontSize: '14px',  cursor: 'pointer', color: 'brown' }} onClick={handleProfileDialogOpen}>
           Service Provider Profile
          </Typography>
          </div>
          
          
          
        </Box>

        {/* Right side: Bid Price and Status/Actions */}
        <Box flex={1} sx={{ display: 'flex', flexDirection: 'column', alignItems: isMobile ? 'flex-start' : 'flex-end' }}>
          <Typography variant="h6" component="div" sx={{ color: 'black' }}>
            {bid} PKR
          </Typography>

          {/* Status or Accept/Reject Buttons */}
          {status === 'submitted' ? (
            <Box sx={{ display: 'flex', gap: 1, mt: 3 }}>       
              <Button
                variant="contained"
                onClick={() => handleMessageClick(sellerId)}
                style={{ color: 'white', backgroundColor: 'black' }}
              >
                Message
              </Button>
              <Button variant="contained" color="success" onClick={onAccept}>
                Accept
              </Button>
              <Button variant="outlined" color="error" onClick={onReject}>
                Reject
              </Button>
            </Box>
          ) : (
            <Typography variant="body2" color="textSecondary" sx={{ marginTop: 3 }}>
              <Button
                variant="contained"

                onClick={() => handleMessageClick(sellerId)}
                style={{ marginRight: '10px', color: 'white', backgroundColor: 'black' }}
              >
                Message
              </Button>
              {status}
            </Typography>
          )}
        </Box>
      </Card>


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
      <SellerProfileDialog
        open={profileDialogOpen}
        onClose={handleProfileDialogClose}
        username={sellerName}
      />
    </>
  );
};

export default ReceivedBidCard;
