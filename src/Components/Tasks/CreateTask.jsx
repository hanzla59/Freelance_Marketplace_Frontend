// import React, { useState } from 'react';
// import { Dialog, DialogTitle, DialogContent, TextField, Button, IconButton, Box } from '@mui/material';
// import { DialogActions, useMediaQuery } from '@mui/material';
// import { useTheme } from '@mui/material/styles';
// import CloseIcon from '@mui/icons-material/Close';
// import axios from 'axios';

// const PostTaskDialog = ({ open, handleClose }) => {
//     const theme = useTheme();
//     const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

//     // States for form data
//     const [title, setTitle] = useState('');
//     const [description, setDescription] = useState('');
//     const [budget, setBudget] = useState('');
//     const [location, setLocation] = useState('');
//     const [image, setImage] = useState(null);
//     const [video, setVideo] = useState(null);
//     const [errors, setErrors] = useState({});

//     // Handle file change for image/video
//     const handleFileChange = (e) => {
//         const { name, files } = e.target;
//         if (name === 'image') {
//             setImage(files[0]);
//         } else if (name === 'video') {
//             setVideo(files[0]);
//         }
//     };

//     // Handle form submission
//     const handleSubmit = async () => {
//         const errors = {};

//         // Frontend validation
//         if (!title) errors.title = 'Title is required';
//         if (!description) errors.description = 'Description is required';
//         if (!budget) errors.budget = 'Budget is required';
//         if (!location) errors.location = 'Location is required';

//         // If validation fails, show errors
//         if (Object.keys(errors).length > 0) {
//             setErrors(errors);
//             return;
//         }

//         const formData = new FormData();
//         formData.append('title', title);
//         formData.append('description', description);
//         formData.append('budget', budget);
//         formData.append('location', location);
//         if (image) formData.append('image', image);
//         if (video) formData.append('video', video);

//         try {
//             // API call
//             const response = await axios.post('http://localhost:5000/fyp/postJob', formData, {
//                 headers: { 
//                     'Content-Type': 'multipart/form-data',
//                     Authorization: `Bearer ${localStorage.getItem("token")}` 
//                 },
//             });
//             if (response.status === 200) {
//                 handleClose();
//                 alert('Job posted successfully');
//                 window.location.reload();
//             }
//         } catch (error) {
//             if (error.response) {
//                 const errorMessage = error.response.data.message;
//                 alert(`Error: ${errorMessage}`);
//             } else {
//                 alert("Error posting job: An unexpected error occurred");
//             }
//         }
//     };

//     return (
//         <Dialog open={open} onClose={handleClose} fullScreen={fullScreen}>
//             <DialogTitle>
//                 Create New Task
//                 <IconButton
//                     aria-label="close"
//                     onClick={handleClose}
//                     sx={{ position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}
//                 >
//                     <CloseIcon />
//                 </IconButton>
//             </DialogTitle>
//             <DialogContent>
//                 <TextField
//                     label="Title"
//                     fullWidth
//                     margin="normal"
//                     value={title}
//                     onChange={(e) => setTitle(e.target.value)}  // Correctly bind onChange
//                     error={!!errors.title}
//                     helperText={errors.title}
//                     required
//                 />
//                 <TextField
//                     label="Description"
//                     fullWidth
//                     margin="normal"
//                     value={description}
//                     onChange={(e) => setDescription(e.target.value)}  // Correctly bind onChange
//                     error={!!errors.description}
//                     helperText={errors.description}
//                     required
//                     multiline
//                     rows={4}
//                 />
//                 <TextField
//                     label="Budget"
//                     type="number"
//                     fullWidth
//                     margin="normal"
//                     value={budget}
//                     onChange={(e) => setBudget(e.target.value)}  // Correctly bind onChange
//                     error={!!errors.budget}
//                     helperText={errors.budget}
//                     required
//                 />
//                 <TextField
//                     label="Location"
//                     fullWidth
//                     margin="normal"
//                     value={location}
//                     onChange={(e) => setLocation(e.target.value)}  // Correctly bind onChange
//                     error={!!errors.location}
//                     helperText={errors.location}
//                     required
//                 />
//                 <input
//                     accept="image/*"
//                     style={{ display: 'none' }}
//                     id="image-upload"
//                     type="file"
//                     name="image"
//                     onChange={handleFileChange}
//                 />
//                 <label htmlFor="image-upload">
//                     <Button variant="outlined" component="span" fullWidth>
//                         Upload Image (Optional)
//                     </Button>
//                 </label>
//                 <input
//                     accept="video/*"
//                     style={{ display: 'none' }}
//                     id="video-upload"
//                     type="file"
//                     name="video"
//                     onChange={handleFileChange}
//                 />
//                 <label htmlFor="video-upload">
//                     <Button variant="outlined" component="span" fullWidth>
//                         Upload Video (Optional)
//                     </Button>
//                 </label>
//             </DialogContent>
//             <DialogActions>
//                 <Button onClick={handleClose} color="secondary">
//                     Cancel
//                 </Button>
//                 <Button onClick={handleSubmit} color="primary" variant="contained">
//                     Post Task
//                 </Button>
//             </DialogActions>
//         </Dialog>
//     );
// };


// const CreateTask = () => {
//     const [open, setOpen] = useState(false);

//     const handleOpen = () => {
//         setOpen(true);
//     };

//     const handleClose = () => {
//         setOpen(false);
//     };

//     return (
//         <>
//         <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//             <Button variant="outlined" color='white'  onClick={handleOpen}>
//                 Click to open the Post Task Dialog
//             </Button>
//             <PostTaskDialog open={open} handleClose={handleClose} />
//         </Box>
//         </>
//     );
// };

// export default CreateTask;


import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Snackbar } from '@mui/material';
import axios from 'axios';

const CreateTask = () => {
    // States for form data
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [budget, setBudget] = useState('');
    const [location, setLocation] = useState('');
    const [image, setImage] = useState(null);
    const [video, setVideo] = useState(null);
    const [errors, setErrors] = useState({});
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    // Handle file change for image/video
    const handleFileChange = (e) => {
        const { name, files } = e.target;
        if (files.length > 0) {
            if (name === 'image') {
                setImage(files[0]);
            } else if (name === 'video') {
                setVideo(files[0]);
            }
        }
    };

    // Handle file removal
    const handleRemoveFile = (type) => {
        if (type === 'image') {
            setImage(null);
        } else if (type === 'video') {
            setVideo(null);
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
                setSnackbarMessage('Job posted successfully');
                setSnackbarOpen(true);
                window.location.reload();
            }
        } catch (error) {
            if (error.response) {
                const errorMessage = error.response.data.message;
                setSnackbarMessage(`Error: ${errorMessage}`);
                setSnackbarOpen(true);
            } else {
                setSnackbarMessage("Error posting job: An unexpected error occurred");
                setSnackbarOpen(true);
            }
        }
    };

    // Snackbar close handler
    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <Box sx={{ padding: 2, maxWidth: 500, margin: 'auto' }}>
            <Typography variant="h6" gutterBottom sx={{ textAlign: 'center', fontSize: 30, color: 'green' }}>Create New Task</Typography>
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
                Post Task
            </Button>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                message={snackbarMessage}
                sx={{ bgcolor: 'primary.main' }} // Customize background color here
            />
        </Box>
    );
};

export default CreateTask;


