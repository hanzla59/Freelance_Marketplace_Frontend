import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Box,
    Typography,
    Paper,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Snackbar
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
const BASE_URL = import.meta.env.VITE_BASE_URL;

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function ComplainsList() {
    const [complains, setComplains] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedComplain, setSelectedComplain] = useState(null);
    const [responseText, setResponseText] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    useEffect(() => {
        const fetchComplains = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/fyp/admin/getComplain`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setComplains(response.data.complains);
            } catch (error) {
                console.error('Error fetching complains:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchComplains();
    }, []);

    const handleOpenDialog = (complain) => {
        setSelectedComplain(complain);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setResponseText('');
    };

    const handleSendResponse = async () => {
        try {
            await axios.put(`${BASE_URL}/fyp/admin/updateComplain/${selectedComplain._id}`, {
                response: responseText
            }, {
                headers: {
                    // Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            setSnackbarMessage("Complain resolved successfully");
            setSnackbarOpen(true);
            handleCloseDialog();
            // Optionally, refetch complains to get the updated list
            // fetchComplains();
        } catch (error) {
            console.error('Error updating complain response:', error);
            setSnackbarMessage("Failed to resolve complain");
            setSnackbarOpen(true);
        }
    };

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };

    if (loading) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <Box>
            {complains.length > 0 ? (
                complains.map((complain) => (
                    <Paper
                        key={complain._id}
                        elevation={3}
                        sx={{
                            padding: 2,
                            margin: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            gap: 2,
                            borderRadius: 2,
                        }}
                    >
                        <Box display="flex" justifyContent="space-between">
                            <Typography variant="body1">ID: {complain._id}</Typography>
                            <Typography variant="body1">Against: {complain.against.username}</Typography>
                        </Box>
                        <Typography variant="body2" sx={{ marginTop: 1 }}>
                            Complain: {complain.complain}
                        </Typography>
                        <Typography variant="body2" sx={{ marginTop: 1, fontStyle: 'italic' }}>
                            Response: {complain.response || 'No response yet'}
                        </Typography>
                        <Box display="flex" justifyContent="flex-end" mt={1}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => handleOpenDialog(complain)}
                            >
                                Respond
                            </Button>
                        </Box>
                    </Paper>
                ))
            ) : (
                <Typography>No complains found.</Typography>
            )}

            {/* Dialog for response */}
            <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm">
                <DialogTitle>Respond to Complain</DialogTitle>
                {selectedComplain && (
                    <DialogContent>
                        <Typography variant="body1" sx={{ marginBottom: 2 }}>
                            Complain: {selectedComplain.complain}
                        </Typography>
                        {selectedComplain.image && (
                            <Box sx={{ marginBottom: 2 }}>
                                <img
                                    src={selectedComplain.image}
                                    alt="Complain"
                                    style={{ width: '100%', maxHeight: '300px', objectFit: 'cover' }}
                                />
                            </Box>
                        )}
                        <TextField
                            label="Your Response"
                            variant="outlined"
                            fullWidth
                            multiline
                            rows={4}
                            value={responseText}
                            onChange={(e) => setResponseText(e.target.value)}
                        />
                    </DialogContent>
                )}
                <DialogActions>
                    <Button onClick={handleSendResponse} color="primary" variant="contained">
                        Send Response
                    </Button>
                    <Button onClick={handleCloseDialog} color="secondary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Snackbar for feedback */}
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
}

export default ComplainsList;
