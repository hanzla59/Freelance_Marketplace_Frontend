import React, { useState } from "react";
import { TextField, Button, Box, Typography, Snackbar, Container, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from 'react-router-dom';


const BASE_URL = import.meta.env.VITE_BASE_URL;

// Password pattern for validation
const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false); // State to toggle visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State to toggle visibility
  const navigate = useNavigate();

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset previous error
    setError("");

    // Validate password
    if (!newPassword.match(passwordPattern)) {
      setError("Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 8 characters long.");
      return;
    }

    // Validate if passwords match
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try { 

      const response = await axios.post(`${BASE_URL}/fyp/resetPassword`, { password: newPassword }, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      
      setSnackbarMessage(response.data.message || "Password reset successfully");
      setSnackbarOpen(true);
      setNewPassword("");
      setConfirmPassword("");
      setTimeout(() => {
          navigate('/login');
      }, 2000);
    } catch (error) {
      setSnackbarMessage(error.response?.data?.message || "Error resetting password");
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 4 }}>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <Typography variant="h5" component="h1" sx={{ textAlign: 'center', mb: 2, color: 'green' }}>
            Reset Password
          </Typography>
          <TextField
            label="New Password"
            type={showNewPassword ? "text" : "password"} // Toggle password visibility
            fullWidth
            required
            value={newPassword}
            onChange={handleNewPasswordChange}
            error={!!error && !newPassword.match(passwordPattern)}
            helperText={error && !newPassword.match(passwordPattern) ? "Password must match the required pattern." : ""}
            margin="normal"
            variant="outlined"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowNewPassword(!showNewPassword)}>
                    {showNewPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="Confirm New Password"
            type={showConfirmPassword ? "text" : "password"} // Toggle password visibility
            fullWidth
            required
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            error={!!error && newPassword !== confirmPassword}
            helperText={error && newPassword !== confirmPassword ? "Passwords do not match." : ""}
            margin="normal"
            variant="outlined"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {error && <Typography color="error" align="center" sx={{ mt: 1 }}>{error}</Typography>}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2, backgroundColor: 'green' }}
            disabled={loading}
          >
            {loading ? "Resetting..." : "Change Password"}
          </Button>
        </form>
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
    </Container>
  );
};

export default ResetPassword;
