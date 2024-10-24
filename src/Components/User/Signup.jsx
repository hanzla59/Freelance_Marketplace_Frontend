// import React, { useState } from "react";
// import {
//     Dialog,
//     DialogContent,
//     IconButton,
//     Grid,
//     TextField,
//     Button,
//     Select,
//     MenuItem,
//     Typography,
//     FormControl,
//     InputLabel,
//     useMediaQuery,
// } from "@mui/material";
// import { Close as CloseIcon } from "@mui/icons-material";
// import axios from "axios";
// import { useTheme } from "@mui/material/styles";

// const SignupDialog = ({ open, onClose }) => {
//     const [role, setRole] = useState("buyer");
//     const [username, setUsername] = useState("");
//     const [email, setEmail] = useState("");
//     const [cnic, setCnic] = useState("");
//     const [location, setLocation] = useState("");
//     const [password, setPassword] = useState("");

//     const theme = useTheme();
//     const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

//     const handleSubmit = async () => {
//         const formData = {
//             role,
//             username,
//             email,
//             cnic,
//             location,
//             password,
//         };
//         console.log("Form Data being sent:", formData); // Add this to check the data
//         try {
//             const { data } = await axios.post("http://localhost:5000/fyp/signup", formData);
//             localStorage.setItem("role", data.user.role);
//             localStorage.setItem("token", data.token);
//             localStorage.setItem("auth", true);
//             alert(`${data.message}`);
//             setUsername("");
//             setEmail("");
//             setCnic("");
//             setLocation("");
//             setPassword("");
//             onClose();
//         } catch (error) {
//             if (error.response) {
//                 // Extract the error message from the server response
//                 const errorMessage = error.response.data.message;
//                 alert(`${errorMessage}`);
//             } else {
//                 // Generic error message for network or unknown errors
//                 alert("Sign-up failed: An unexpected error occurred");
//             }
//             console.error("Error signing up:", error); // For debugging in the console
//         }

//     };
//     return (
//         <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
//             <DialogContent style={{ position: "relative" }}>
//                 {/* Close Icon */}
//                 {/* <IconButton
//                     aria-label="close"
//                     onClick={onClose}
//                     style={{ position: "absolute", top: 10, right: 10 }}
//                 >
//                     <CloseIcon />
//                 </IconButton> */}

//                 {/* Responsive Layout */}
//                 <Grid container>
//                     {!isSmallScreen && (
//                         <Grid
//                             item
//                             xs={6}
//                             style={{
//                                 display: "flex",
//                                 justifyContent: "center",
//                                 alignItems: "center",
//                             }}
//                         >
//                             {/* Vertically Centered Image */}
//                             <img
//                                 src="https://via.placeholder.com/400x600"
//                                 alt="Signup Illustration"
//                                 style={{ width: "80%", height: "40%", objectFit: "cover" }}
//                             />
//                         </Grid>
//                     )}

//                     <Grid
//                         item
//                         xs={isSmallScreen ? 12 : 6}
//                         style={{
//                             padding: "20px",
//                             display: "flex",
//                             flexDirection: "column",
//                             justifyContent: "center",
//                         }}
//                     >
//                         {/* Centered Title */}
//                         <Typography
//                             variant="h5"
//                             align="center"
//                             gutterBottom
//                             style={{ marginBottom: "20px", fontSize: "2rem", color: "green" }}
//                         >
//                             {`Create ${role === "buyer" ? "Buyer" : "Seller"} Account`}
//                         </Typography>

//                         {/* Role Selection using Select */}
//                         <FormControl fullWidth margin="normal" sx={{ mb: 0 }}>
//                             <InputLabel>Role</InputLabel>
//                             <Select
//                                 value={role}
//                                 onChange={(e) => setRole(e.target.value)}
//                                 label="Role"                           
//                             >
//                                 <MenuItem value="buyer">Buyer</MenuItem>
//                                 <MenuItem value="seller">Seller</MenuItem>
//                             </Select>
//                         </FormControl>

//                         {/* Form Fields */}
//                         <TextField
//                             fullWidth
//                             label="Username"
//                             margin="normal"
//                             value={username}
//                             onChange={(e) => setUsername(e.target.value)}
//                             sx={{
//                                 mb: 0,
//                                 marginTop: "13px",
//                                 "& .MuiInputLabel-root": {
//                                     color: "black", // Default label color
//                                 },
//                                 "& .MuiInputLabel-root.Mui-focused": {
//                                     color: "green", // Focused label color
//                                 },
//                                 "& .MuiOutlinedInput-root": {
//                                     "& fieldset": {
//                                         borderColor: "black", // Default border color
//                                     },
//                                     "&:hover fieldset": {
//                                         borderColor: "black", // Border color on hover
//                                     },
//                                     "&.Mui-focused fieldset": {
//                                         borderColor: "green", // Focused border color
//                                     },
//                                 },
//                             }}
//                         />
//                         <TextField
//                             fullWidth
//                             label="Email"
//                             margin="normal"
//                             type="email"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                             sx={{
//                                 mb: 0,
//                                 marginTop: "13px",
//                                 "& .MuiInputLabel-root": {
//                                     color: "black", // Default label color
//                                 },
//                                 "& .MuiInputLabel-root.Mui-focused": {
//                                     color: "green", // Focused label color
//                                 },
//                                 "& .MuiOutlinedInput-root": {
//                                     "& fieldset": {
//                                         borderColor: "black", // Default border color
//                                     },
//                                     "&:hover fieldset": {
//                                         borderColor: "black", // Border color on hover
//                                     },
//                                     "&.Mui-focused fieldset": {
//                                         borderColor: "green", // Focused border color
//                                     },
//                                 },
//                             }}
//                         />
//                         <TextField
//                             fullWidth
//                             label="CNIC"
//                             margin="normal"
//                             value={cnic}
//                             onChange={(e) => setCnic(e.target.value)}
//                             sx={{
//                                 mb: 0,
//                                 marginTop: "13px",
//                                 "& .MuiInputLabel-root": {
//                                     color: "black", // Default label color
//                                 },
//                                 "& .MuiInputLabel-root.Mui-focused": {
//                                     color: "green", // Focused label color
//                                 },
//                                 "& .MuiOutlinedInput-root": {
//                                     "& fieldset": {
//                                         borderColor: "black", // Default border color
//                                     },
//                                     "&:hover fieldset": {
//                                         borderColor: "black", // Border color on hover
//                                     },
//                                     "&.Mui-focused fieldset": {
//                                         borderColor: "green", // Focused border color
//                                     },
//                                 },
//                             }}
//                         />
//                         <TextField
//                             fullWidth
//                             label="Location"
//                             margin="normal"
//                             value={location}
//                             onChange={(e) => setLocation(e.target.value)}
//                             sx={{
//                                 mb: 0,
//                                 marginTop: "13px",
//                                 "& .MuiInputLabel-root": {
//                                     color: "black", // Default label color
//                                 },
//                                 "& .MuiInputLabel-root.Mui-focused": {
//                                     color: "green", // Focused label color
//                                 },
//                                 "& .MuiOutlinedInput-root": {
//                                     "& fieldset": {
//                                         borderColor: "black", // Default border color
//                                     },
//                                     "&:hover fieldset": {
//                                         borderColor: "black", // Border color on hover
//                                     },
//                                     "&.Mui-focused fieldset": {
//                                         borderColor: "green", // Focused border color
//                                     },
//                                 },
//                             }}
//                         />
//                         <TextField
//                             fullWidth
//                             label="Password"
//                             type="password"
//                             margin="normal"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                             sx={{
//                                 mb: 0,
//                                 marginTop: "13px",
//                                 "& .MuiInputLabel-root": {
//                                     color: "black", // Default label color
//                                 },
//                                 "& .MuiInputLabel-root.Mui-focused": {
//                                     color: "green", // Focused label color
//                                 },
//                                 "& .MuiOutlinedInput-root": {
//                                     "& fieldset": {
//                                         borderColor: "black", // Default border color
//                                     },
//                                     "&:hover fieldset": {
//                                         borderColor: "black", // Border color on hover
//                                     },
//                                     "&.Mui-focused fieldset": {
//                                         borderColor: "green", // Focused border color
//                                     },
//                                 },
//                             }}
//                         />

//                         {/* Submit Button */}
//                         <Button
//                             fullWidth
//                             variant="contained"
//                             color="primary"
//                             style={{ marginTop: "10px" }}
//                             onClick={handleSubmit}
//                             sx={{ mb: 0, fontSize: "1.1rem", backgroundColor: "green", color: "white", ":hover": { backgroundColor: "black", color: "yellow" } }}
//                         >
//                             Sign Up
//                         </Button>
//                     </Grid>
//                 </Grid>
//             </DialogContent>
//         </Dialog>
//     );
// };

// const Signup = () => {
//     const [open, setOpen] = useState(false);

//     const handleOpen = () => setOpen(true);
//     const handleClose = () => setOpen(false);

//     return (
//         <div>
//             <Button variant="text" color="white" onClick={handleOpen}>
//                 SignUp
//             </Button>

//             <SignupDialog open={open} onClose={handleClose} />
//         </div>
//     );
// };

// export default Signup;


import React, { useState } from "react";
import {
    Box,
    TextField,
    Button,
    Select,
    MenuItem,
    Typography,
    FormControl,
    InputLabel,
    Snackbar,
    Alert,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import image from "../../Assets/react.svg";

const Signup = () => {
    const [role, setRole] = useState("buyer");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [cnic, setCnic] = useState("");
    const [location, setLocation] = useState("");
    const [password, setPassword] = useState("");
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [fieldErrors, setFieldErrors] = useState({});
    const navigate = useNavigate();
    
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

    const handleSubmit = async () => {
        // Reset field errors
        setFieldErrors({});

        // Validate fields
        const errors = {};
        if (!username) errors.username = "Username is required";
        if (!email) errors.email = "Email is required";
        if (!cnic) errors.cnic = "CNIC is required";
        if (!location) errors.location = "Location is required";
        if (!password) errors.password = "Password is required";

        if (Object.keys(errors).length > 0) {
            setFieldErrors(errors);
            return;
        }

        const formData = { role, username, email, cnic, location, password };

        try {
            const { data } = await axios.post("http://localhost:5000/fyp/signup", formData);
            localStorage.setItem("role", data.user.role);
            localStorage.setItem("token", data.token);
            localStorage.setItem("auth", true);
            setSnackbarMessage(data.message);
            setSnackbarOpen(true);
            setUsername("");
            setEmail("");
            setCnic("");
            setLocation("");
            setPassword("");
            setTimeout(() => {
                navigate("/");
                window.location.reload();
            }, 500);
        } catch (error) {
            const errorMessage = error.response ? error.response.data.message : "An unexpected error occurred";
            setSnackbarMessage(errorMessage);
            setSnackbarOpen(true);
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    return (
        <Box
            display="flex"
            flexDirection={isSmallScreen ? "column" : "row"}
            justifyContent="center"
            alignItems="center"
            height="100vh"
            padding="20px"
        >
            {!isSmallScreen && (
                <Box
                    flex={0.5}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                >
                    <img
                        src={image}
                        alt="Signup Illustration"
                        style={{
                            maxWidth: "250px",
                            maxHeight: "250px",
                            width: "100%",
                            height: "auto",
                            objectFit: "cover",
                        }}
                    />
                </Box>
            )}

            <Box
                flex={isSmallScreen ? 1 : 0.5}
                padding="20px"
                display="flex"
                flexDirection="column"
                justifyContent="center"
            >
                <Typography
                    variant="h5"
                    align="center"
                    gutterBottom
                    style={{ marginBottom: "20px", fontSize: "2rem", color: "green" }}
                >
                    {`Create ${role === "buyer" ? "Buyer" : "Seller"} Account`}
                </Typography>

                {/* Role Selection using Select */}
                <FormControl  margin="normal">
                    <InputLabel>Role</InputLabel>
                    <Select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        label="Role"
                    >
                        <MenuItem value="buyer">Buyer</MenuItem>
                        <MenuItem value="seller">Seller</MenuItem>
                    </Select>
                </FormControl>

                {/* Form Fields */}
                <TextField
                    fullWidth
                    label="Username"
                    margin="normal"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    error={!!fieldErrors.username}
                    helperText={fieldErrors.username}
                />
                <TextField
                    fullWidth
                    label="Email"
                    margin="normal"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={!!fieldErrors.email}
                    helperText={fieldErrors.email}
                />
                <TextField
                    fullWidth
                    label="CNIC"
                    margin="normal"
                    value={cnic}
                    onChange={(e) => setCnic(e.target.value)}
                    error={!!fieldErrors.cnic}
                    helperText={fieldErrors.cnic}
                />
                <TextField
                    fullWidth
                    label="Location"
                    margin="normal"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    error={!!fieldErrors.location}
                    helperText={fieldErrors.location}
                />
                <TextField
                    fullWidth
                    label="Password"
                    type="password"
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={!!fieldErrors.password}
                    helperText={fieldErrors.password}
                />

                {/* Submit Button */}
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    style={{ marginTop: "10px" }}
                    onClick={handleSubmit}
                    sx={{ mb: 0, fontSize: "1.1rem", backgroundColor: "green", color: "white", ":hover": { backgroundColor: "black", color: "yellow" } }}
                >
                    Sign Up
                </Button>
            </Box>

            {/* Snackbar for notifications */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default Signup;
