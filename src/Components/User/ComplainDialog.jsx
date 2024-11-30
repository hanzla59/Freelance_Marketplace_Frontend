import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Box,
    IconButton,
    Snackbar,
} from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL;

function ComplainDialog({ setComplainsSent }) {
    const [open, setOpen] = useState(false);
    const [username, setUsername] = useState('');
    const [complain, setComplain] = useState('');
    const [orderId, setOrderId] = useState('');
    const [image, setImage] = useState(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [error, setError] = useState('');

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleImageRemove = () => {
        setImage(null);
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const handleSubmit = async () => {
        if (!username || !complain) {
            setError('Username and complain are required.');
            return;
        }
        setError('');

        const formData = new FormData();
        formData.append('against', username);
        formData.append('complain', complain);
        formData.append('orderId', orderId);
        if (image) {
            formData.append('complainImage', image);
        }

        try {
            const response = await axios.post(`${BASE_URL}/fyp/complain`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setSnackbarMessage(response.data.message);
            setComplainsSent((prevComplainsSent) => prevComplainsSent + 1);
            setComplain('');
            setUsername('');
            setOrderId('');
            setSnackbarOpen(true);
            handleClose();
        } catch (error) {
            console.error(error);
            setSnackbarMessage(error.response.data.message);
            setSnackbarOpen(true);
        }
    };

    return (
        <div>
            <Button variant="contained" color="primary" onClick={handleOpen}>
                Open Complain Form
            </Button>
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                <DialogTitle>Submit a Complain</DialogTitle>
                <DialogContent>
                    <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <TextField
                            label="Username (Against)"
                            variant="outlined"
                            fullWidth
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                         <TextField
                            label="OrderId"
                            variant="outlined"
                            fullWidth
                            value={orderId}
                            onChange={(e) => setOrderId(e.target.value)}
                            required
                        />
                        <TextField
                            label="Complain"
                            variant="outlined"
                            fullWidth
                            multiline
                            rows={4}
                            value={complain}
                            onChange={(e) => setComplain(e.target.value)}
                            required
                        />
                        <Box>
                            <label htmlFor="upload-image">
                                <input
                                    accept="image/*"
                                    id="upload-image"
                                    type="file"
                                    style={{ display: 'none' }}
                                    onChange={handleImageChange}
                                />
                                <IconButton color="primary" component="span">
                                    <PhotoCamera />
                                </IconButton>
                            </label>
                            {image && (
                                <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <img
                                        src={URL.createObjectURL(image)}
                                        alt="Preview"
                                        style={{ width: 100, height: 100, objectFit: 'cover' }}
                                    />
                                    <IconButton color="secondary" onClick={handleImageRemove}>
                                        <DeleteIcon />
                                    </IconButton>
                                </Box>
                            )}
                        </Box>
                        {error && <span style={{ color: 'red' }}>{error}</span>}
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSubmit} color="primary" variant="contained">
                        Send Complain
                    </Button>
                    <Button onClick={handleClose} color="secondary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={4000}
                onClose={handleSnackbarClose}
                message={snackbarMessage}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            />
        </div>
    );
}

export default ComplainDialog;
