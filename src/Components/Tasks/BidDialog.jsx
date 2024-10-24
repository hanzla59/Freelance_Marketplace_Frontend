import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Typography, Box } from '@mui/material';
import axios from 'axios';

const BidDialog = ({ open, handleClose, title, description, location, price, image, video, jobId }) => {
    const [proposal, setProposal] = useState('');
    const [bid, setBid] = useState('');
    const [bidderLocation, setBidderLocation] = useState('');
    const [error, setError] = useState(null);


    const handleSubmit = async () => {
        if (!proposal || !bid || !bidderLocation) {
            setError('All fields are required');
            return;
        }

        try {
            const { data } = await axios.post(
                `http://localhost:5000/fyp/bidJob/${jobId}`,
                {
                    proposal,
                    bid,
                    location: bidderLocation,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );

            // If the bid is placed successfully, show a success message and reset fields
            alert('Bid placed successfully');
            setProposal('');
            setBid('');
            setBidderLocation('');
            handleClose();

            // Display response message if exists
            if (data.message) {
                alert(data.message);
                setError(data.message);
            }
        } catch (err) {
            // Check if there's a response from the server
            if (err.response && err.response.data) {
                const errorMessage = err.response.data.message;
                // Display the error message from the backend
                alert(`Error: ${errorMessage}`);
                setError(err.message);
            } else {
                // Handle generic network errors or unknown errors
                alert('An unexpected error occurred');
            }
        }
    };


    return (
        <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
            <DialogTitle>Place Your Bid</DialogTitle>
            <DialogContent>
                <Typography variant="h6">{title}</Typography>
                <Typography variant="body1" paragraph>
                    {description}
                </Typography>

                {/* Image and Video (if available) */}
                <Box sx={{ display: 'flex', overflowX: 'auto' }}>
                    {image && <img src={image} alt="task" style={{ maxWidth: '100px', marginRight: '10px' }} />}
                    {video && (
                        <video width="150" controls>
                            <source src={video} type="video/mp4" />
                        </video>
                    )}
                </Box>

                <Typography variant="h6" sx={{ mt: 2 }}>
                    {price} PKR
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    Location: {location}
                </Typography>

                <TextField
                    label="Your Proposal"
                    fullWidth
                    margin="normal"
                    multiline
                    rows={4}
                    value={proposal}
                    onChange={(e) => setProposal(e.target.value)}
                    required
                />
                <TextField
                    label="Your Location"
                    fullWidth
                    margin="normal"
                    value={bidderLocation}
                    onChange={(e) => setBidderLocation(e.target.value)}
                    required
                />
                <TextField
                    label="Your Bid (PKR)"
                    type="number"
                    fullWidth
                    margin="normal"
                    value={bid}
                    onChange={(e) => setBid(e.target.value)}
                    required
                />

                {error && <Typography color="error">{error}</Typography>}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="secondary">
                    Cancel
                </Button>
                <Button onClick={handleSubmit} color="primary" variant="contained">
                    Place Bid
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default BidDialog;
