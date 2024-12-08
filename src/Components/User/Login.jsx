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
const BASE_URL = import.meta.env.VITE_BASE_URL;

// Password pattern
const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

const Login = ({ setIsLoggedIn }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async () => {
        // Reset error states
        setUsernameError(false);
        setPasswordError(false);

        // Input validation
        if (!username || username.length < 5) {
            setUsernameError(true);
        }
        if (!password || !passwordPattern.test(password)) {
            setPasswordError(true);
        }

        // If either field is empty or invalid, stop the login process
        if (!username || username.length < 5 || !password || !passwordPattern.test(password)) {
            setSnackbarMessage("Please enter valid username (min 5 characters) and password.");
            // setSnackbarSeverity("error");
            // setSnackbarOpen(true);
            return;
        }

        // Convert username to lowercase before sending the request
        const formData = { username, password };
        try {
            const { data } = await axios.post(`${BASE_URL}/fyp/login`, formData);

            localStorage.setItem("token", data.token);
            localStorage.setItem("auth", true);
            localStorage.setItem("role", data.user.role);
            localStorage.setItem("username", data.user.username);
            localStorage.setItem("userId", data.user._id);

            setSnackbarMessage(data.message || "Login successful");
            setSnackbarSeverity("success");
            setSnackbarOpen(true);

            // Navigate to homepage after a short delay
            setTimeout(() => {
                navigate("/");
                setIsLoggedIn(true);
            }, 500);

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
        <Box display="flex" flexDirection={{ xs: "column", md: "row" }} justifyContent="center" alignItems="center" sx={{ padding: 2 }}>
            <Box display="flex" flexDirection="column" alignItems="center">
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
                    helperText={usernameError ? "Username must be at least 5 characters" : ""}
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
                    helperText={passwordError ? (
                        <>
                            <span>Password must contain at least one uppercase letter, one lowercase letter,</span><br />
                            <span>one number, one special character, and be at least 8 characters long</span>
                        </>
                    ) : ""}
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
                <Typography variant="body2" align="right" gutterBottom sx={{ color: "brown", cursor: "pointer" }} onClick={() => navigate("/otpForResetPassword")}>Forget Password</Typography>

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

