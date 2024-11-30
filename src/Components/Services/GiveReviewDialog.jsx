// import React, { useState } from 'react';
// import {
//     Dialog,
//     DialogTitle,
//     DialogContent,
//     DialogActions,
//     TextField,
//     Button,
//     Snackbar,
//     Rating,
//     Typography,
// } from '@mui/material';
// import axios from 'axios';
// const BASE_URL = import.meta.env.VITE_BASE_URL;

// const GiveReviewDialog = ({ open, onClose, orderId }) => {
//     const [rating, setRating] = useState(0); // Initialize rating to 0
//     const [review, setReview] = useState('');
//     const [snackbarOpen, setSnackbarOpen] = useState(false);
//     const [snackbarMessage, setSnackbarMessage] = useState('');
//     const [error, setError] = useState('');

//     const handleSubmit = async () => {
//         if (rating === 0 || !review) {
//             setError("Rating and comment are required.");
//             return;
//         }

//         try {
//             const response = await axios.post(
//                 `${BASE_URL}/fyp/giveReviewOnOrder/${orderId}`,
//                 { rating, review },
//                 {
//                     headers: {
//                         'Content-Type': 'application/json',
//                         Authorization: `Bearer ${localStorage.getItem('token')}`,
//                     },
//                 }
//             );

//             setSnackbarMessage(response.data.message);
//             setSnackbarOpen(true);
//             onClose(); // Close the dialog after successful submission
//             setRating(0); // Reset state
//             setReview('');
//             setError('');
//         } catch (err) {
//             console.error(err);
//             setSnackbarMessage(err.response?.data?.error || "An error occurred while giving review.");
//             setSnackbarOpen(true);
//         }
//     };

//     const handleCloseSnackbar = () => {
//         setSnackbarOpen(false);
//     };

//     return (
//         <div>
//             <Dialog open={open} onClose={onClose}>
//                 <DialogTitle>Submit Your Review</DialogTitle>
//                 <DialogContent>
//                     {error && <Typography color="error">{error}</Typography>}
//                     <Rating
//                         name="simple-controlled"
//                         value={rating}
//                         onChange={(event, newValue) => {
//                             setRating(newValue);
//                         }}
//                         sx={{ mb: 2 }}
//                     />
//                     <TextField
//                         autoFocus
//                         margin="dense"
//                         label="Comment"
//                         type="text"
//                         fullWidth
//                         variant="outlined"
//                         value={review}
//                         onChange={(e) => setReview(e.target.value)}
//                         inputProps={{ maxLength: 150 }}
//                     />
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={onClose} color="primary">
//                         Cancel
//                     </Button>
//                     <Button onClick={handleSubmit} color="primary">
//                         Submit Review
//                     </Button>
//                 </DialogActions>
//             </Dialog>

//             <Snackbar
//                 open={snackbarOpen}
//                 autoHideDuration={6000}
//                 onClose={handleCloseSnackbar}
//                 message={snackbarMessage}
//             />
//         </div>
//     );
// };

// export default GiveReviewDialog;





import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Snackbar,
    Rating,
    Typography,
    CircularProgress, // Import CircularProgress for the loading spinner
} from '@mui/material';
import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL;

const GiveReviewDialog = ({ open, onClose, orderId }) => {
    const [rating, setRating] = useState(0); // Initialize rating to 0
    const [review, setReview] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); // Loading state

    const handleSubmit = async () => {
        if (rating === 0 || !review) {
            setError("Rating and comment are required.");
            return;
        }

        setLoading(true); // Start loading
        try {
            const response = await axios.post(
                `${BASE_URL}/fyp/giveReviewOnOrder/${orderId}`,
                { rating, review },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );

            setSnackbarMessage(response.data.message);
            setSnackbarOpen(true);
            onClose(); // Close the dialog after successful submission
            setRating(0); // Reset state
            setReview('');
            setError('');
        } catch (err) {
            console.error(err);
            setSnackbarMessage(err.response?.data?.error || "An error occurred while giving review.");
            setSnackbarOpen(true);
        } finally {
            setLoading(false); // Stop loading
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    return (
        <div>
            <Dialog open={open} onClose={onClose}>
                <DialogTitle>Submit Your Review</DialogTitle>
                <DialogContent>
                    {error && <Typography color="error">{error}</Typography>}
                    <Rating
                        name="simple-controlled"
                        value={rating}
                        onChange={(event, newValue) => {
                            setRating(newValue);
                        }}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Comment"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        inputProps={{ maxLength: 150 }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="primary">
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        color="primary"
                        disabled={loading} // Disable the button when loading
                    >
                        {loading ? (
                            <CircularProgress size={24} color="inherit" /> // Show the spinner when loading
                        ) : (
                            'Submit Review'
                        )}
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                message={snackbarMessage}
            />
        </div>
    );
};

export default GiveReviewDialog;
