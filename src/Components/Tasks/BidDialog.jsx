import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Typography, Box, Snackbar, Alert } from '@mui/material';
import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL;

const BidDialog = ({ open, handleClose, title, description, location, price, image, video, jobId }) => {
    const [proposal, setProposal] = useState('');
    const [bid, setBid] = useState('');
    const [bidderLocation, setBidderLocation] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const [errors, setErrors] = useState({ proposal: false, bid: false, location: false });

    const validateFields = () => {
        setErrors({
            proposal: !proposal,
            bid: !bid,
            location: !bidderLocation
        });
        return proposal && bid && bidderLocation;
    };

    const handleSubmit = async () => {
        if (!validateFields()) {
            setSnackbarMessage('Please fill all required fields.');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
            return;
        }

        try {
            const { data } = await axios.post(
                `${BASE_URL}/fyp/bidJob/${jobId}`,
                { proposal, bid, location: bidderLocation },
                { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
            );

            // Show Snackbar with a success message
            setSnackbarMessage(data.message || 'Bid placed successfully');
            setSnackbarSeverity('success');
            setSnackbarOpen(true);

            // Reset fields and close dialog
            setProposal('');
            setBid('');
            setBidderLocation('');
            setErrors({ proposal: false, bid: false, location: false });
            handleClose();
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'An unexpected error occurred';
            setSnackbarMessage(errorMessage);
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        }
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <>
            <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
                <Box sx={{ maxWidth: 600, mx: 'auto' }}>
                    <DialogTitle>Place Your Bid</DialogTitle>
                    <DialogContent>
                        <Typography variant="h6">Title: {title}</Typography>
                        <Typography variant="body1" paragraph>
                            Description: {description}
                        </Typography>

                        {/* Image and Video Section */}
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
                            {image && (
                                <img
                                    src={image}
                                    alt="task"
                                    style={{ maxWidth: '100%', width: '550px', marginBottom: '10px' }}
                                />
                            )}
                            {video && (
                                <video
                                    width="100%"
                                    style={{ maxWidth: '550px' }}
                                    controls
                                >
                                    <source src={video} type="video/mp4" />
                                </video>
                            )}
                        </Box>

                        <Typography variant="h6" sx={{ mt: 2 }}>
                            Price: {price} PKR
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            Location: {location}
                        </Typography>

                        {/* Input Fields with Validation */}
                        <TextField
                            label="Your Proposal"
                            fullWidth
                            margin="normal"
                            multiline
                            rows={4}
                            value={proposal}
                            onChange={(e) => setProposal(e.target.value)}
                            error={errors.proposal}
                            helperText={errors.proposal && 'Proposal is required'}
                        />
                        <TextField
                            label="Your Location"
                            fullWidth
                            margin="normal"
                            value={bidderLocation}
                            onChange={(e) => setBidderLocation(e.target.value)}
                            error={errors.location}
                            helperText={errors.location && 'Location is required'}
                        />
                        <TextField
                            label="Your Bid (PKR)"
                            type="number"
                            fullWidth
                            margin="normal"
                            value={bid}
                            onChange={(e) => setBid(e.target.value)}
                            error={errors.bid}
                            helperText={errors.bid && 'Bid is required'}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} sx={{ border: '1px solid red', color: 'red', mb: 2 }}  variant="outlined">
                            Cancel
                        </Button>
                        <Button onClick={handleSubmit} color="success" sx={{mr:2, mb: 2}} variant="contained">
                            Place Bid
                        </Button>
                    </DialogActions>
                </Box>
            </Dialog>

            {/* Snackbar for Success and Error Messages */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </>
    );
};

export default BidDialog;
