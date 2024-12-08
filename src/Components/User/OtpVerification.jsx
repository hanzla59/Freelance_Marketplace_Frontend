import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Link, Card, CardContent, Snackbar, Alert } from '@mui/material';
import { styled } from '@mui/system';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BASE_URL = import.meta.env.VITE_BASE_URL;

// Custom styled TextField
const StyledTextField = styled(TextField)({
    '& .MuiInputBase-input': {
        textAlign: 'center',
        fontSize: '1.5rem',
        fontWeight: 'bold',
    },
    '& .MuiOutlinedInput-root': {
        borderRadius: '8px',
        width: '60px',
        height: '60px',
        margin: '0 5px',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    },
});

export default function VerifyOtp() {
    const [otp, setOtp] = useState(['', '', '', '']); // Array for OTP input
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const navigate = useNavigate();

    // Handle OTP input
    const handleChange = (value, index) => {
        const newOtp = [...otp];
        newOtp[index] = value.slice(0, 1); // Only allow one character per field
        setOtp(newOtp);

        // Automatically focus on the next input field
        if (value && index < otp.length - 1) {
            document.getElementById(`otp-input-${index + 1}`).focus();
        }
    };

    // Verify OTP API call
    const handleVerifyOtp = async () => {
        const otpCode = otp.join('');
        if (otpCode.length !== 4) {
            setSnackbarMessage('Please enter a valid 4-digit OTP.');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
            return;
        }
        try {
            const response = await axios.post(`${BASE_URL}/fyp/verifyOTP`, { otp: otpCode }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            setSnackbarMessage(response.data.message);
            setSnackbarSeverity('success');
            setTimeout(() => {
                navigate('/verify-account');  
            }, 2000);
        } catch (err) {
            setSnackbarMessage(err.response?.data?.message || 'Invalid OTP. Please try again.');
            setSnackbarSeverity('error');
        } finally {
            setSnackbarOpen(true);
        }
    };

    // Resend OTP API call
    const handleResendOtp = async () => {
        try {
            const response = await axios.post(
                `${BASE_URL}/fyp/sentOTP`,
                {}, // Empty body since no data is being sent
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            setSnackbarMessage(response.data.message);
            setSnackbarSeverity('success');
        } catch (err) {
            setSnackbarMessage(err.response?.data?.message || 'Failed to resend OTP. Please try again.');
            setSnackbarSeverity('error');
        } finally {
            setSnackbarOpen(true);
        }
    };

    // Close Snackbar
    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{
                minHeight: '100vh',
                padding: 2,
            }}
        >
            <Card
                sx={{
                    maxWidth: 400,
                    borderRadius: '16px',
                    boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.2)',
                }}
            >
                <CardContent>
                    {/* Heading */}
                    <Typography variant="h5" align="center" gutterBottom>
                        Verify Your Email
                    </Typography>

                    {/* Description */}
                    <Typography variant="body2" color="textSecondary" align="center" gutterBottom>
                        Enter the 4-digit code sent to your registered email.
                    </Typography>

                    {/* OTP Input Fields */}
                    <Box display="flex" justifyContent="center" gap={1} mt={2}>
                        {otp.map((digit, index) => (
                            <StyledTextField
                                key={index}
                                id={`otp-input-${index}`}
                                value={digit}
                                onChange={(e) => handleChange(e.target.value, index)}
                                inputProps={{ maxLength: 1 }}
                                variant="outlined"
                            />
                        ))}
                    </Box>

                    {/* Verify OTP Button */}
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleVerifyOtp}
                        fullWidth
                        sx={{
                            mt: 3,
                            py: 1.5,
                            fontWeight: 'bold',
                            textTransform: 'none',
                            background: 'green',
                        }}
                    >
                        Verify OTP
                    </Button>

                    {/* Resend OTP Link */}
                    <Typography align="center" mt={2}>
                        <Link
                            component="button"
                            onClick={handleResendOtp}
                            sx={{
                                textDecoration: 'none',
                                fontWeight: 'bold',
                                color: 'green',
                            }}
                        >
                            Resend OTP
                        </Link>
                    </Typography>
                </CardContent>
            </Card>

            {/* Snackbar for messages */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert
                    onClose={handleSnackbarClose}
                    severity={snackbarSeverity}
                    sx={{ width: '100%' }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
}
