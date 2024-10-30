// import React, { useState } from "react";
// import {
//     Dialog,
//     DialogContent,
//     IconButton,
//     TextField,
//     Button,
//     Typography,
//     InputAdornment,
// } from "@mui/material";
// import { Close as CloseIcon, Visibility, VisibilityOff } from "@mui/icons-material";
// import axios from "axios";

// const LoginDialog = ({ open, onClose }) => {
//     const [username, setUsername] = useState("");
//     const [password, setPassword] = useState("");
//     const [showPassword, setShowPassword] = useState(false);

//     const handleLogin = async () => {
//         const formData = { username, password };
//         try {
//             const { data } = await axios.post("http://localhost:5000/fyp/login", formData);
//             localStorage.setItem("token", data.token);
//             localStorage.setItem("auth", true);
//             localStorage.setItem("role", data.user.role);
//             localStorage.setItem("username", data.user.username);
//             alert(` ${data.message}`);
//             setUsername("");
//             setPassword("");
//             onClose();
//             window.location.reload();
//         } catch (error) {
//             console.error("Error logging in:", error);
//             alert("Login failed: " + (error.response?.data?.message || "An error occurred"));
//         }
//     };

//     return (
//         <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs"> {/* Set maxWidth to "xs" */}
//             <DialogContent style={{ position: "relative" }}>
//                 {/* <IconButton
//                     aria-label="close"
//                     onClick={onClose}
//                     style={{ position: "absolute", top: 10, right: 10 }}
//                 >
//                     <CloseIcon />
//                 </IconButton> */}

//                 <Typography variant="h5" align="center" gutterBottom sx={{ fontSize: "2rem", color: "green" }}>
//                     Login Your Account
//                 </Typography>

//                 <TextField
//                     fullWidth
//                     label="Username"
//                     margin="normal"
//                     value={username}
//                     onChange={(e) => setUsername(e.target.value)}
//                     sx={{
//                       mb: 0,
//                       marginTop: "13px",
//                       "& .MuiInputLabel-root": {
//                           color: "black", // Default label color
//                       },
//                       "& .MuiInputLabel-root.Mui-focused": {
//                           color: "green", // Focused label color
//                       },
//                       "& .MuiOutlinedInput-root": {
//                           "& fieldset": {
//                               borderColor: "black", // Default border color
//                           },
//                           "&:hover fieldset": {
//                               borderColor: "black", // Border color on hover
//                           },
//                           "&.Mui-focused fieldset": {
//                               borderColor: "green", // Focused border color
//                           },
//                       },
//                   }}
//                 />
//                 <TextField
//                     fullWidth
//                     label="Password"
//                     type={showPassword ? "text" : "password"}
//                     margin="normal"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     InputProps={{
//                         endAdornment: (
//                             <InputAdornment position="end">
//                                 <IconButton
//                                     onClick={() => setShowPassword((prev) => !prev)}
//                                     edge="end"
//                                     sx={{
//                                         color: showPassword ? "green" : "black", // Change icon color based on state
//                                         "&:hover": {
//                                             color: "green", // Icon color on hover
//                                         },
//                                     }}
//                                 >
//                                     {showPassword ? <VisibilityOff /> : <Visibility />}
//                                 </IconButton>
//                             </InputAdornment>
//                         ),
//                     }}
//                     sx={{
//                         mb: 0,
//                         marginTop: "13px",
//                         "& .MuiInputLabel-root": {
//                             color: "black", // Default label color
//                         },
//                         "& .MuiInputLabel-root.Mui-focused": {
//                             color: "green", // Focused label color
//                         },
//                         "& .MuiOutlinedInput-root": {
//                             "& fieldset": {
//                                 borderColor: "black", // Default border color
//                             },
//                             "&:hover fieldset": {
//                                 borderColor: "black", // Border color on hover
//                             },
//                             "&.Mui-focused fieldset": {
//                                 borderColor: "green", // Focused border color
//                             },
//                         },
//                     }}
//                 />

//                 <Button
//                     fullWidth
//                     variant="contained"
//                     color="primary"
//                     style={{ marginTop: "20px", marginBottom: "10px" }}
//                     onClick={handleLogin}
//                     sx={{ mb: 0, fontSize: "1.1rem", backgroundColor: "green", color: "white", ":hover": { backgroundColor: "black", color: "yellow" } }}
//                 >
//                     Login
//                 </Button>
//             </DialogContent>
//         </Dialog>
//     );
// };

// const Login = () => {
//     const [open, setOpen] = useState(false);

//     const handleOpen = () => setOpen(true);
//     const handleClose = () => setOpen(false);

//     return (
//         <div>
//             <Button variant="text" color="white" onClick={handleOpen}>
//                 LogIn
//             </Button>

//             <LoginDialog open={open} onClose={handleClose} />
//         </div>
//     );
// };

// export default Login;


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
