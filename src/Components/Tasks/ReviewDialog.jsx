// ReviewDialog.js
import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Rating,
  Snackbar,
} from '@mui/material';
import axios from 'axios';

const ReviewDialog = ({ open, onClose, orderId }) => {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleSubmit = async () => {
    try {
      await axios.post(`http://localhost:5000/fyp/giveReview/${orderId}`, {
        rating,
        review: comment,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      setSnackbarMessage('Review added successfully!');
      setSnackbarOpen(true);
      onClose(); // Close the dialog after submission
    } catch (error) {
      setSnackbarMessage(error.response ? error.response.data.message : 'Failed to add review');
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Submit Your Review</DialogTitle>
        <DialogContent>
          <Rating
            name="simple-controlled"
            value={rating}
            onChange={(event, newValue) => {
              setRating(newValue);
            }}
            sx={{ mb: 2 }}
          />
          <TextField
            autoFocus
            margin="dense"
            label="Comment"
            type="text"
            fullWidth
            variant="outlined"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            inputProps={{ maxLength: 150 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit Review
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
      />
    </div>
  );
};

export default ReviewDialog;
