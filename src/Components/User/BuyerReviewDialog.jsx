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

const BuyerReviewDialog = ({ open, onClose, orderId }) => {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleSubmit = async () => {
    if (!comment.trim() || rating === 0) {
      setSnackbarMessage('Please provide both a comment and a rating.');
      setSnackbarOpen(true);
      return;
    }

    try {
      await axios.post(
        `http://localhost:5000/fyp/giveBuyerReview/${orderId}`,
        {
          rating,
          review: comment,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      setSnackbarMessage('Review added successfully!');
      setSnackbarOpen(true);
      setComment('');
      setRating(0);
      onClose(); // Close the dialog after submission
    } catch (error) {
      setSnackbarMessage(
        error.response ? error.response.data.message : 'Failed to add review'
      );
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Submit Your Review for the Buyer</DialogTitle>
        <DialogContent>
          <Rating
            name="buyer-rating"
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
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      />
    </div>
  );
};

export default BuyerReviewDialog;
