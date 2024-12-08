import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Snackbar, CircularProgress } from '@mui/material';
import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL;
import { useNavigate } from 'react-router-dom';

const CreateTask = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [budget, setBudget] = useState('');
    const [location, setLocation] = useState('');
    const [image, setImage] = useState(null);
    const [video, setVideo] = useState(null);
    const [errors, setErrors] = useState({});
    const [snackbar, setSnackbar] = useState({ open: false, message: '' });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        if (files.length > 0) {
            name === 'image' ? setImage(files[0]) : setVideo(files[0]);
            e.target.value = null;
        }
    };

    const handleRemoveFile = (type) => {
        type === 'image' ? setImage(null) : setVideo(null);
    };

    const handleSubmit = async () => {
        const validationErrors = {};
        if (!title) validationErrors.title = 'Title is required';
        if (!description) validationErrors.description = 'Description is required';
        if (!budget) validationErrors.budget = 'Budget is required';
        if (!location) validationErrors.location = 'Location is required';

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('budget', budget);
        formData.append('location', location);
        if (image) formData.append('image', image);
        if (video) formData.append('video', video);

        setLoading(true); // Set loading to true when starting the API call

        try {
            const response = await axios.post(`${BASE_URL}/fyp/postJob`, formData, {
                headers: { 
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${localStorage.getItem("token")}` 
                },
            });
            setLoading(false); // Stop loading after response
            if (response.status === 200) {
                setSnackbar({ open: true, message: 'Job posted successfully' });
                setTitle('');
                setDescription('');
                setBudget('');
                setLocation('');
                setImage(null);
                setVideo(null);
            }
        } catch (error) {
            setLoading(false); // Stop loading on error
            const errorMessage = error.response ? error.response.data.message : "An unexpected error occurred";
            setSnackbar({ open: true, message: `${errorMessage}` });
            if(error.response?.data?.cnicStatus){
                setTimeout(() => {
                    navigate('/verify-account');
                }, 2000);
            }
            console.error(error.error);
        }
    };

    return (
        <Box sx={{ padding: 2, maxWidth: 500, margin: 'auto' }}>
            <Typography variant="h6" gutterBottom sx={{ textAlign: 'center', fontSize: 30, color: 'green' }}>
                Create New Task
            </Typography>
            <TextField
                label="Title"
                fullWidth
                margin="normal"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                error={!!errors.title}
                helperText={errors.title}
                required
                sx={{
                    "& .MuiInputLabel-root": { color: "black" },
                    "& .MuiInputLabel-root.Mui-focused": { color: "green" },
                    "& .MuiOutlinedInput-root": {
                        "& fieldset": { borderColor: "black" },
                        "&:hover fieldset": { borderColor: "black" },
                        "&.Mui-focused fieldset": { borderColor: "green" },
                    },
                }}
            />
            <TextField
                label="Description"
                fullWidth
                margin="normal"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                error={!!errors.description}
                helperText={errors.description}
                required
                multiline
                rows={4}
                sx={{
                    "& .MuiInputLabel-root": { color: "black" },
                    "& .MuiInputLabel-root.Mui-focused": { color: "green" },
                    "& .MuiOutlinedInput-root": {
                        "& fieldset": { borderColor: "black" },
                        "&:hover fieldset": { borderColor: "black" },
                        "&.Mui-focused fieldset": { borderColor: "green" },
                    },
                }}
            />
            <TextField
                label="Budget"
                type="number"
                fullWidth
                margin="normal"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                error={!!errors.budget}
                helperText={errors.budget}
                required
                sx={{
                    "& .MuiInputLabel-root": { color: "black" },
                    "& .MuiInputLabel-root.Mui-focused": { color: "green" },
                    "& .MuiOutlinedInput-root": {
                        "& fieldset": { borderColor: "black" },
                        "&:hover fieldset": { borderColor: "black" },
                        "&.Mui-focused fieldset": { borderColor: "green" },
                    },
                }}
            />
            <TextField
                label="Location"
                fullWidth
                margin="normal"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                error={!!errors.location}
                helperText={errors.location}
                required
                sx={{
                    "& .MuiInputLabel-root": { color: "black" },
                    "& .MuiInputLabel-root.Mui-focused": { color: "green" },
                    "& .MuiOutlinedInput-root": {
                        "& fieldset": { borderColor: "black" },
                        "&:hover fieldset": { borderColor: "black" },
                        "&.Mui-focused fieldset": { borderColor: "green" },
                    },
                }}
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
                <Button
                    variant="outlined"
                    component="span"
                    fullWidth
                    sx={{
                        borderColor: 'green',
                        color: 'green',
                        '&:hover': {
                            borderColor: 'darkgreen',
                            color: 'darkgreen',
                        },
                    }}
                >
                    Upload Image (Optional)
                </Button>
            </label>
            {image && (
                <Box sx={{ mt: 1, display: 'flex', alignItems: 'center' }}>
                    <img src={URL.createObjectURL(image)} alt="Uploaded" style={{ width: '50px', height: '50px', marginRight: '10px' }} />
                    <Button variant="outlined" color="error" onClick={() => handleRemoveFile('image')}>
                        Remove
                    </Button>
                </Box>
            )}
            <input
                accept="video/*"
                style={{ display: 'none' }}
                id="video-upload"
                type="file"
                name="video"
                onChange={handleFileChange}
            />
            <label htmlFor="video-upload">
                <Button
                    variant="outlined"
                    component="span"
                    fullWidth
                    sx={{
                        marginTop: 1,
                        borderColor: 'green',
                        color: 'green',
                        '&:hover': {
                            borderColor: 'darkgreen',
                            color: 'darkgreen',
                        },
                    }}
                >
                    Upload Video (Optional)
                </Button>
            </label>
            {video && (
                <Box sx={{ mt: 1, display: 'flex', alignItems: 'center' }}>
                    <video src={URL.createObjectURL(video)} controls style={{ width: '100px', height: 'auto', marginRight: '10px', marginTop: 1, marginBottom: 1 }} />
                    <Button variant="outlined" color="error" onClick={() => handleRemoveFile('video')}>
                        Remove
                    </Button>
                </Box>
            )}
            <Button
                onClick={handleSubmit}
                variant="contained"
                disabled={loading} // Disable button while loading
                sx={{
                    mt: 2,
                    backgroundColor: 'green',
                    color: 'white',
                    width: '100%',
                    '&:hover': {
                        backgroundColor: 'darkgreen',
                    },
                }}
            >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Post Task'}
            </Button>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
                message={snackbar.message}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            />
        </Box>
    );
};

export default CreateTask;
