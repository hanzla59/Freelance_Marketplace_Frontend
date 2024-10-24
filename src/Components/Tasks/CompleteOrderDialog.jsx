import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, CircularProgress, Grid } from '@mui/material';
import axios from 'axios';

const CompleteOrderDialog = ({ open, onClose, orderId, onCompleteSuccess }) => {
  const [work, setWork] = useState('');
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleVideoChange = (event) => {
    setVideo(event.target.files[0]);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('work', work);
    if (image) formData.append('image', image);
    if (video) formData.append('video', video);

    try {
      const response = await axios.put(
        `http://localhost:5000/fyp/completeJobOrder/${orderId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      alert(response.data.message);
      setLoading(false);
      onCompleteSuccess(orderId);
      onClose();
    } catch (err) {
      setLoading(false);
      if (err.response) {
        setError(err.response.data.message);
      } else {
        setError('Failed to complete the order');
      }
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Complete Job Order</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
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
          <Grid item xs={12}>
            <input
              accept="image/*"
              type="file"
              onChange={handleImageChange}
              style={{ display: 'none' }}
              id="image-upload"
            />
            <label htmlFor="image-upload">
              <Button variant="outlined" color="primary" component="span">
                Upload Image (Optional)
              </Button>
            </label>
            {image && <p>Selected Image: {image.name}</p>}
          </Grid>
          <Grid item xs={12}>
            <input
              accept="video/*"
              type="file"
              onChange={handleVideoChange}
              style={{ display: 'none' }}
              id="video-upload"
            />
            <label htmlFor="video-upload">
              <Button variant="outlined" color="primary" component="span">
                Upload Video (Optional)
              </Button>
            </label>
            {video && <p>Selected Video: {video.name}</p>}
          </Grid>
        </Grid>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          color="primary"
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : 'Complete Order'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CompleteOrderDialog;
