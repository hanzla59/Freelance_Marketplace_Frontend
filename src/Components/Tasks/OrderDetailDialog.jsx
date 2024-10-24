import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, Button, useMediaQuery, useTheme, Box } from '@mui/material';

const OrderDetailDialog = ({ open, onClose, orderId, price, work, image, video }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h6">Order ID: {orderId}</Typography>
          <Typography variant="h6">{price} PKR</Typography>
        </Box>
      </DialogTitle>
      <DialogContent dividers>
        {/* Work description */}
        <Typography variant="body1" sx={{ marginBottom: 2 }}>
          <strong>Work Description:</strong>
        </Typography>
        <Typography variant="body2" sx={{ marginBottom: 4 }}>
          {work || 'No work description available'}
        </Typography>

        {/* Conditional rendering for image */}
        {image && (
          <Box sx={{ marginBottom: 4 }}>
            <Typography variant="body1" sx={{ marginBottom: 2 }}>
              <strong>Image:</strong>
            </Typography>
            <Box component="img" src={image} alt="Order Image" sx={{ width: '100%', maxHeight: '300px', objectFit: 'cover' }} />
          </Box>
        )}

        {/* Conditional rendering for video */}
        {video && (
          <Box sx={{ marginBottom: 4 }}>
            <Typography variant="body1" sx={{ marginBottom: 2 }}>
              <strong>Video:</strong>
            </Typography>
            <Box
              component="video"
              controls
              src={video}
              alt="Order Video"
              sx={{ width: '100%', maxHeight: '300px', objectFit: 'cover' }}
            />
          </Box>
        )}

        {/* Message if neither image nor video is available */}
        {!image && !video && (
          <Typography variant="body2" sx={{ marginBottom: 2 }}>
            No image or video available for this order.
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained" color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default OrderDetailDialog;
