import React, { useState, useRef } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, CircularProgress, Grid, Snackbar, Box, IconButton } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL;

const CompleteOrderDialog = ({ open, onClose, orderId, onCompleteSuccess }) => {
  const [work, setWork] = useState('');
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: '' });
  
  const imageInputRef = useRef(null);
  const videoInputRef = useRef(null);

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleVideoChange = (event) => {
    setVideo(event.target.files[0]);
  };

  const handleRemoveImage = () => {
    setImage(null);
    if (imageInputRef.current) imageInputRef.current.value = '';  // Clear the input value
  };

  const handleRemoveVideo = () => {
    setVideo(null);
    if (videoInputRef.current) videoInputRef.current.value = '';  // Clear the input value
  };

  const handleSnackbarClose = () => setSnackbar({ ...snackbar, open: false });

  const handleSubmit = async () => {
    setLoading(true);

    const formData = new FormData();
    formData.append('work', work);
    if (image) formData.append('image', image);
    if (video) formData.append('video', video);

    try {
      const response = await axios.put(
        `${BASE_URL}/fyp/completeJobOrder/${orderId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      setSnackbar({ open: true, message: response.data.message, severity: 'success' });
      setLoading(false);
      onCompleteSuccess(orderId);
      onClose();
    } catch (err) {
      setLoading(false);
      const errorMessage = err.response ? err.response.data.message : 'Failed to complete the order';
      setSnackbar({ open: true, message: errorMessage, severity: 'error' });
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Complete Job Order</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Work Description"
              fullWidth
              required
              multiline
              rows={4}
              value={work}
              onChange={(e) => setWork(e.target.value)}
            />
          </Grid>
          
          {/* Image Upload and Preview */}
          <Grid item xs={12} >
            <input
              ref={imageInputRef}
              accept="image/*"
              type="file"
              onChange={handleImageChange}
              style={{ display: 'none' }}
              id="image-upload"
            />
            <label htmlFor="image-upload">
              <Button variant="outlined" color="black" component="span" fullWidth>
                Upload Image (Optional)
              </Button>
            </label>
            {image && (
              <Box mt={2} display="flex" alignItems="center">
                <Box
                  component="img"
                  src={URL.createObjectURL(image)}
                  alt="Selected Image"
                  sx={{ width: 100, height: 100, objectFit: 'cover', marginRight: 2 }}
                />
                <Button variant="outlined" color="secondary" onClick={handleRemoveImage}>
                  Remove
                </Button>
              </Box>
            )}
          </Grid>

          {/* Video Upload and Preview */}
          <Grid item xs={12} >
            <input
              ref={videoInputRef}
              accept="video/*"
              type="file"
              onChange={handleVideoChange}
              style={{ display: 'none' }}
              id="video-upload"
            />
            <label htmlFor="video-upload">
              <Button variant="outlined" color="black" component="span" fullWidth>
                Upload Video (Optional)
              </Button>
            </label>
            {video && (
              <Box mt={2} display="flex" alignItems="center">
                <Box
                  component="video"
                  src={URL.createObjectURL(video)}
                  alt="Selected Video"
                  controls
                  sx={{ width: 100, height: 100, objectFit: 'cover', marginRight: 2 }}
                />
                <Button variant="outlined" color="secondary" onClick={handleRemoveVideo}>
                  Remove
                </Button>
              </Box>
            )}
          </Grid>
        
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} variant='outlined' sx={{ color: 'red', borderColor: 'red'}}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant='contained' color="success" disabled={loading} sx={{  mr: 2 }}>
          {loading ? <CircularProgress size={24} /> : 'Complete Order'}
        </Button>
      </DialogActions>

      {/* Snackbar for Success/Error Messages */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbar.message}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        action={
          <IconButton size="small" color="inherit" onClick={handleSnackbarClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </Dialog>
  );
};

export default CompleteOrderDialog;
