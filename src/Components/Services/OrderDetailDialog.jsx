import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box } from '@mui/material';

const OrderDetailDialog = ({ open, onClose, order }) => {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Order Id: {order._id}</DialogTitle>
            <DialogContent dividers>
                <Typography variant="body1" gutterBottom>
                    {order.comment || 'No comment provided.'}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Image
                </Typography>
                {order.image && (
                    <Box sx={{ mt: 2, textAlign: 'center' }}>
                        <img src={order.image} alt="Order Image" style={{ maxWidth: '100%' }} />
                    </Box>
                )}
                <Typography variant="body1" gutterBottom>
                    Video
                </Typography>
                {order.video && (
                    <Box sx={{ mt: 2, textAlign: 'center' }}>
                        <video controls style={{ maxWidth: '100%' }}>
                            <source src={order.video} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </Box>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary" variant="outlined">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default OrderDetailDialog;
