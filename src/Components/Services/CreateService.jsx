import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Grid,
  IconButton,
  Typography,
  Box,
} from '@mui/material';
import { AddAPhoto, VideoCall, Delete } from '@mui/icons-material';
import axios from 'axios';

const CreateService = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    price: '',
    images: [],
    video: null,
  });
  const [errors, setErrors] = useState({});
  
  // Handlers
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + formData.images.length > 3) {
      alert('You can upload a maximum of 3 images.');
      return;
    }
    setFormData({ ...formData, images: [...formData.images, ...files] });
  };

  const handleVideoUpload = (e) => {
    setFormData({ ...formData, video: e.target.files[0] });
  };

  const handleDeleteImage = (index) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    setFormData({ ...formData, images: newImages });
  };

  const validateForm = () => {
    let tempErrors = {};
    if (!formData.title) tempErrors.title = "Title is required";
    if (!formData.description) tempErrors.description = "Description is required";
    if (!formData.location) tempErrors.location = "Location is required";
    if (!formData.price) tempErrors.price = "Price is required";
    if (formData.images.length < 1) tempErrors.images = "At least one image is required";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;
  
    // Prepare form data for submission
    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('location', formData.location);
    formDataToSend.append('price', formData.price);
  
    // Append each image file
    formData.images.forEach((image, index) => {
      formDataToSend.append(`images`, image);
    });
  
    // Append video if available
    if (formData.video) {
      formDataToSend.append('video', formData.video);
    }
  
    axios.post('http://localhost:5000/fyp/createService', formDataToSend, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    .then((response) => {
      alert(response.data.message);
      handleClose(); 
    })
    .catch((error) => {
      if (error.response) {
        // Extract the error message from the server response
        const errorMessage = error.response.data.message;
        alert(`${errorMessage}`);
    } else {
        // Generic error message for network or unknown errors
        alert("Sign-up failed: An unexpected error occurred");
    }
    console.error("Error signing up:", error);
    });
  };
  

  return (
    <div>
      {/* Button to Open Dialog */}
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Button variant="outlined" color='white' onClick={handleClickOpen}>
        Click to open Create Service Dialog
      </Button>
      </Box>

      {/* Create Task Dialog */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Create Service</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                error={!!errors.title}
                helperText={errors.title}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                error={!!errors.description}
                helperText={errors.description}
                fullWidth
                multiline
                rows={4}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                error={!!errors.location}
                helperText={errors.location}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Price"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleInputChange}
                error={!!errors.price}
                helperText={errors.price}
                fullWidth
                required
              />
            </Grid>

            {/* Image Upload */}
            <Grid item xs={12}>
              <Button
                variant="outlined"
                component="label"
                fullWidth
                startIcon={<AddAPhoto />}
              >
                Upload Images (Min: 1, Max: 3)
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  hidden
                  onChange={handleImageUpload}
                />
              </Button>
              {errors.images && (
                <Typography color="error" variant="body2">
                  {errors.images}
                </Typography>
              )}
              {/* Show uploaded images */}
              <Grid container spacing={2} sx={{ mt: 1 }}>
                {formData.images.map((image, index) => (
                  <Grid item xs={4} key={index}>
                    <Box position="relative">
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`Upload Preview ${index}`}
                        style={{ width: '100%', height: 'auto' }}
                      />
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleDeleteImage(index)}
                        sx={{ position: 'absolute', top: 0, right: 0 }}
                      >
                        <Delete />
                      </IconButton>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Grid>

            {/* Video Upload */}
            <Grid item xs={12}>
              <Button
                variant="outlined"
                component="label"
                fullWidth
                startIcon={<VideoCall />}
              >
                Upload Video (Optional)
                <input
                  type="file"
                  accept="video/*"
                  hidden
                  onChange={handleVideoUpload}
                />
              </Button>
            </Grid>
          </Grid>

          {/* Post Task Button */}
          <Box textAlign="center" sx={{ mt: 3 }}>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Post Service
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateService;
