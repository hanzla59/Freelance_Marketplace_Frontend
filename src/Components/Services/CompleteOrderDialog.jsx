import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  DialogActions,
  Box,
  IconButton,
  Snackbar,
  CircularProgress,
} from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

const CompleteOrderDialog = ({ open, onClose, order, onOrderDelivered }) => {
  const [workText, setWorkText] = useState('');
  const [uploadedImages, setUploadedImages] = useState([]);
  const [uploadedVideos, setUploadedVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [errorText, setErrorText] = useState('');

  const handleWorkTextChange = (event) => {
    setWorkText(event.target.value);
    setErrorText(''); // Clear error text on change
  };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    setUploadedImages((prev) => [...prev, ...files]);
  };

  const handleVideoUpload = (event) => {
    const files = Array.from(event.target.files);
    setUploadedVideos((prev) => [...prev, ...files]);
  };

  const handleDeleteImage = (index) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDeleteVideo = (index) => {
    setUploadedVideos((prev) => prev.filter((_, i) => i !== index));
  };

  const handleOrderDelivered = async () => {
    if (!workText) {
      setErrorText('This field must be required');
      return; // Prevent submission if the field is empty
    }

    const formData = new FormData();
    formData.append('work', workText);

    uploadedImages.forEach((file) => {
      formData.append('image', file);
    });

    uploadedVideos.forEach((file) => {
      formData.append('video', file);
    });

    setLoading(true); // Start loading

    try {
      const response = await axios.put(
        `http://localhost:5000/fyp/orderDelivered/${order._id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      setSnackbarMessage(response.data.message);
      setSnackbarOpen(true);
      onOrderDelivered();
      onClose();
    } catch (err) {
      setSnackbarMessage('Failed to deliver the order. Please try again.');
      setSnackbarOpen(true);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle>Complete Your Service Order</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Work Details"
            variant="outlined"
            value={workText}
            onChange={handleWorkTextChange}
            error={!!errorText} // Show error style if there's an error
            helperText={errorText} // Show error message
            sx={{ mb: 2, mt: 1 }}
          />
          <Box sx={{ display: 'flex', mt: 2 }}>
            <Button variant="outlined" color="black" component="label" fullWidth startIcon={<AddPhotoAlternateIcon />}>
              Upload Image
              <input hidden accept="image/*" multiple type="file" onChange={handleImageUpload} />
            </Button>
          </Box>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mt: 1 }}>
            {uploadedImages.map((file, index) => (
              <Box key={index} sx={{ position: 'relative' }}>
                <img
                  src={URL.createObjectURL(file)}
                  alt={`Uploaded ${index}`}
                  style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                />
                <IconButton
                  onClick={() => handleDeleteImage(index)}
                  sx={{ position: 'absolute', top: 0, right: 0, color: 'red' }}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))}
          </Box>
          <Box sx={{ display: 'flex', mt: 2 }}>
            <Button variant="outlined" color="black" component="label" fullWidth startIcon={<VideoLibraryIcon />}>
              Upload Video
              <input hidden accept="video/*" multiple type="file" onChange={handleVideoUpload} />
            </Button>
          </Box>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mt: 1 }}>
            {uploadedVideos.map((file, index) => (
              <Box key={index} sx={{ position: 'relative' }}>
                <video
                  src={URL.createObjectURL(file)}
                  style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                  controls
                />
                <IconButton
                  onClick={() => handleDeleteVideo(index)}
                  sx={{ position: 'absolute', top: 0, right: 0, color: 'red' }}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="error" variant="outlined">
            Cancel
          </Button>
          <Button
            onClick={handleOrderDelivered}
            color="primary"
            variant="contained"
            sx={{ mr: 2, backgroundColor: 'green' }}
            disabled={loading} // Disable the button while loading
          >
            {loading ? <CircularProgress size={24}  /> : 'Order Delivered'}
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      />  
    </>
  );
};

export default CompleteOrderDialog;
