import React, { useState, useEffect } from 'react';
import {
    TextField,
    Button,
    Grid,
    IconButton,
    Typography,
    Box,
    Snackbar,
    Alert,
} from '@mui/material';
import { AddAPhoto, VideoCall, Delete } from '@mui/icons-material';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UpdateService = () => {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        location: '',
        price: '',
        images: [],
        video: null,
    });
    const [errors, setErrors] = useState({});
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    // images: images || [],  // Assuming `images` is an array of URLs
    // video: video || null    // Assuming `video` is a URL or null

    useEffect(() => {
        // Fetch current service data to populate the form
        axios.get(`http://localhost:5000/fyp/getService/${id}`)
            .then(response => {
                const { title, description, location, price, images, video } = response.data;
                setFormData({
                    title,
                    description,
                    location,
                    price,
                    images:  [],  
                    video: null    
                });
            })
            .catch(error => {
                console.error("Error fetching service data:", error);
            });
    }, [id]);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files).filter(file => file instanceof File);
        if (files.length + formData.images.length > 3) {
            setSnackbar({ open: true, message: 'You can upload a maximum of 3 images.', severity: 'error' });
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

    const handleDeleteVideo = () => {
        setFormData({ ...formData, video: null });
    };

    const validateForm = () => {
        let tempErrors = {};
        if (!formData.title) tempErrors.title = "Title is required";
        if (!formData.description) tempErrors.description = "Description is required";
        if (!formData.location) tempErrors.location = "Location is required";
        if (!formData.price) tempErrors.price = "Price is required";

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = () => {
        if (!validateForm()) return;

        const formDataToSend = new FormData();
        formDataToSend.append('title', formData.title);
        formDataToSend.append('description', formData.description);
        formDataToSend.append('location', formData.location);
        formDataToSend.append('price', formData.price);

        formData.images.forEach((image) => {
            formDataToSend.append('images', image);
        });

        if (formData.video) {
            formDataToSend.append('video', formData.video);
        }

        axios.put(`http://localhost:5000/fyp/updateService/${id}`, formDataToSend, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
            .then(response => {
                setSnackbar({ open: true, message: response.data.message, severity: 'success' });
            })
            .catch(error => {
                if (error.response) {
                    setSnackbar({ open: true, message: error.response.data.message, severity: 'error' });
                } else {
                    setSnackbar({ open: true, message: "Service update failed: An unexpected error occurred", severity: 'error' });
                }
                console.error("Error updating service:", error);
            });
    };

    const handleSnackbarClose = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    return (
        <div>
            <Typography variant="h4" align="center" sx={{ mb: 2, color: "green" }}>
                Update Service
            </Typography>

            <Grid container spacing={2}>
                {/* Title, Description, Location, and Price Fields */}
                {/* (similar to the CreateService component) */}

                {/* Image Upload */}
                {/* (similar logic for uploading and displaying images as CreateService) */}

                {/* Video Upload */}
                {/* (similar logic for uploading and displaying video as CreateService) */}
                <Grid item xs={12} >
                    <TextField
                        label="Title"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        error={!!errors.title}
                        helperText={errors.title}
                        fullWidth
                        required
                        sx={{
                            mb: 0,
                            marginTop: "13px",
                            "& .MuiInputLabel-root": { color: "black" },
                            "& .MuiInputLabel-root.Mui-focused": { color: "green" },
                            "& .MuiOutlinedInput-root": {
                                "& fieldset": { borderColor: "black" },
                                "&:hover fieldset": { borderColor: "black" },
                                "&.Mui-focused fieldset": { borderColor: "green" },
                            },
                        }}
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
                        sx={{
                            mb: 0,
                            marginTop: "13px",
                            "& .MuiInputLabel-root": { color: "black" },
                            "& .MuiInputLabel-root.Mui-focused": { color: "green" },
                            "& .MuiOutlinedInput-root": {
                                "& fieldset": { borderColor: "black" },
                                "&:hover fieldset": { borderColor: "black" },
                                "&.Mui-focused fieldset": { borderColor: "green" },
                            },
                        }}
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
                        sx={{
                            mb: 0,
                            marginTop: "13px",
                            "& .MuiInputLabel-root": { color: "black" },
                            "& .MuiInputLabel-root.Mui-focused": { color: "green" },
                            "& .MuiOutlinedInput-root": {
                                "& fieldset": { borderColor: "black" },
                                "&:hover fieldset": { borderColor: "black" },
                                "&.Mui-focused fieldset": { borderColor: "green" },
                            },
                        }}
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
                        sx={{
                            mb: 0,
                            marginTop: "13px",
                            "& .MuiInputLabel-root": { color: "black" },
                            "& .MuiInputLabel-root.Mui-focused": { color: "green" },
                            "& .MuiOutlinedInput-root": {
                                "& fieldset": { borderColor: "black" },
                                "&:hover fieldset": { borderColor: "black" },
                                "&.Mui-focused fieldset": { borderColor: "green" },
                            },
                        }}
                    />
                </Grid>

                {/* Image Upload */}
                <Grid item xs={12}>
                    <Button
                        variant="outlined"
                        color='green'
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
                                    {typeof image === 'string' ? (
                                        <img
                                            src={image}  // Render as URL if string
                                            alt={`Uploaded Image ${index}`}
                                            style={{ width: '100%', height: 'auto' }}
                                        />
                                    ) : (
                                        <img
                                            src={URL.createObjectURL(image)}  // Render as a preview for `File` instances
                                            alt={`Upload Preview ${index}`}
                                            style={{ width: '100%', height: 'auto' }}
                                        />
                                    )}
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
                        color='green'
                    >
                        Upload Video (Optional)
                        <input
                            type="file"
                            accept="video/*"
                            hidden
                            onChange={handleVideoUpload}
                        />
                    </Button>

                    {/* Show uploaded video */}
                    {formData.video && (
                        <Box sx={{ mt: 2, textAlign: 'center' }}>
                            {typeof formData.video === 'string' ? (
                                <video
                                    width="300"
                                    controls
                                    src={formData.video}  // Render as URL if string
                                    style={{ margin: 'auto', display: 'block' }}
                                />
                            ) : (
                                formData.video instanceof File && formData.video.type.startsWith('video/') && (
                                    <video
                                        width="300"
                                        controls
                                        src={URL.createObjectURL(formData.video)}  // Render as a preview for `File`
                                        style={{ margin: 'auto', display: 'block' }}
                                    />
                                )
                            )}
                            <Button
                                variant="outlined"
                                color="error"
                                onClick={handleDeleteVideo}
                                sx={{ mt: 1 }}
                            >
                                Remove
                            </Button>
                        </Box>
                    )}
                </Grid>

                <Box textAlign="center" sx={{ mt: 3 }}>
                    <Button
                        variant="contained"
                        color="success"
                        onClick={handleSubmit}
                        sx={{ width: '100%' }}
                    >
                        Update Service
                    </Button>
                </Box>

                {/* Snackbar for notifications */}
                <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleSnackbarClose}>
                    <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: '100%' }}>
                        {snackbar.message}
                    </Alert>
                </Snackbar>
            </Grid>
        </div>
    );
};

export default UpdateService;
