import React, { useState } from "react";
import {
    Snackbar,
    Alert,
    TextField,
    Button,
    Typography,
    InputAdornment,
    Box,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success"); // success or error
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async () => {
        // Reset error states
        setUsernameError(false);
        setPasswordError(false);

        // Input validation
        if (!username) {
            setUsernameError(true);
        }
        if (!password) {
            setPasswordError(true);
        }

        // If either field is empty, stop the login process
        if (!username || !password) {
            setSnackbarMessage("Please enter both username and password.");
            setSnackbarSeverity("error");
            setSnackbarOpen(true);
            return;
        }

        const formData = { username, password };
        try {
            const { data } = await axios.post("http://localhost:5000/fyp/login", formData);
            localStorage.setItem("token", data.token);
            localStorage.setItem("auth", true);
            localStorage.setItem("role", data.user.role);
            localStorage.setItem("username", data.user.username);

            setSnackbarMessage(data.message || "Login successful");
            setSnackbarSeverity("success");
            setSnackbarOpen(true);

            // Navigate to homepage after a short delay
            setTimeout(() => {
                navigate("/");
                window.location.reload();
            }, 1000);
        } catch (error) {
            setSnackbarMessage(error.response?.data?.message || "Login failed");
            setSnackbarSeverity("error");
            setSnackbarOpen(true);
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    return (
        <Box display="flex" flexDirection={{ xs: "column", md: "row" }} justifyContent="center" alignItems="center"  sx={{ padding: 2 }}>
            {/* Image on the left for desktop view */}
            {/* <Box display={{ xs: "none", md: "block" }} >
                <img src={image} alt="login" style={{ Width: "100%", height: "auto", marginRight: "20px" }} />
            </Box> */}
            <Box  display="flex" flexDirection="column" alignItems="center">
                <Typography variant="h5" align="center" gutterBottom sx={{ fontSize: "2rem", color: "green" }}>
                    Login Your Account
                </Typography>

                <TextField
                    fullWidth
                    label="Username"
                    margin="normal"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    error={usernameError}
                    helperText={usernameError ? "Enter username" : ""}
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
                <TextField
                    fullWidth
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={passwordError}
                    helperText={passwordError ? "Enter password" : ""}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <Button onClick={() => setShowPassword((prev) => !prev)} edge="end" sx={{ color: showPassword ? "green" : "black" }}>
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </Button>
                            </InputAdornment>
                        ),
                    }}
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

                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    style={{ marginTop: "20px", marginBottom: "10px" }}
                    onClick={handleLogin}
                    sx={{ mb: 0, fontSize: "1.1rem", backgroundColor: "green", color: "white", ":hover": { backgroundColor: "black", color: "yellow" } }}
                >
                    Login
                </Button>

                <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={3000}
                    onClose={handleCloseSnackbar}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                >
                    <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
                        {snackbarMessage}
                    </Alert>
                </Snackbar>
            </Box>
        </Box>
    );
};

export default Login;
