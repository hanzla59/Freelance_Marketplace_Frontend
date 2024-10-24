import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, Button, IconButton, Box } from '@mui/material';
import { DialogActions, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';

const PostTaskDialog = ({ open, handleClose }) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    // States for form data
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [budget, setBudget] = useState('');
    const [location, setLocation] = useState('');
    const [image, setImage] = useState(null);
    const [video, setVideo] = useState(null);
    const [errors, setErrors] = useState({});

    // Handle file change for image/video
    const handleFileChange = (e) => {
        const { name, files } = e.target;
        if (name === 'image') {
            setImage(files[0]);
        } else if (name === 'video') {
            setVideo(files[0]);
        }
    };

    // Handle form submission
    const handleSubmit = async () => {
        const errors = {};

        // Frontend validation
        if (!title) errors.title = 'Title is required';
        if (!description) errors.description = 'Description is required';
        if (!budget) errors.budget = 'Budget is required';
        if (!location) errors.location = 'Location is required';

        // If validation fails, show errors
        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('budget', budget);
        formData.append('location', location);
        if (image) formData.append('image', image);
        if (video) formData.append('video', video);

        try {
            // API call
            const response = await axios.post('http://localhost:5000/fyp/postJob', formData, {
                headers: { 
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${localStorage.getItem("token")}` 
                },
            });
            if (response.status === 200) {
                handleClose();
                alert('Job posted successfully');
                window.location.reload();
            }
        } catch (error) {
            if (error.response) {
                const errorMessage = error.response.data.message;
                alert(`Error: ${errorMessage}`);
            } else {
                alert("Error posting job: An unexpected error occurred");
            }
        }
    };

    return (
        <Dialog open={open} onClose={handleClose} fullScreen={fullScreen}>
            <DialogTitle>
                Create New Task
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{ position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <TextField
                    label="Title"
                    fullWidth
                    margin="normal"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}  // Correctly bind onChange
                    error={!!errors.title}
                    helperText={errors.title}
                    required
                />
                <TextField
                    label="Description"
                    fullWidth
                    margin="normal"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}  // Correctly bind onChange
                    error={!!errors.description}
                    helperText={errors.description}
                    required
                    multiline
                    rows={4}
                />
                <TextField
                    label="Budget"
                    type="number"
                    fullWidth
                    margin="normal"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}  // Correctly bind onChange
                    error={!!errors.budget}
                    helperText={errors.budget}
                    required
                />
                <TextField
                    label="Location"
                    fullWidth
                    margin="normal"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}  // Correctly bind onChange
                    error={!!errors.location}
                    helperText={errors.location}
                    required
                />
                <input
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="image-upload"
                    type="file"
                    name="image"
                    onChange={handleFileChange}
                />
                <label htmlFor="image-upload">
                    <Button variant="outlined" component="span" fullWidth>
                        Upload Image (Optional)
                    </Button>
                </label>
                <input
                    accept="video/*"
                    style={{ display: 'none' }}
                    id="video-upload"
                    type="file"
                    name="video"
                    onChange={handleFileChange}
                />
                <label htmlFor="video-upload">
                    <Button variant="outlined" component="span" fullWidth>
                        Upload Video (Optional)
                    </Button>
                </label>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="secondary">
                    Cancel
                </Button>
                <Button onClick={handleSubmit} color="primary" variant="contained">
                    Post Task
                </Button>
            </DialogActions>
        </Dialog>
    );
};


const CreateTask = () => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Button variant="outlined" color='white'  onClick={handleOpen}>
                Click to open the Post Task Dialog
            </Button>
            <PostTaskDialog open={open} handleClose={handleClose} />
        </Box>
        </>
    );
};

export default CreateTask;

