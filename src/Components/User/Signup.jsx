// import React, { useState } from "react";
// import {
//     Box,
//     TextField,
//     Button,
//     Select,
//     MenuItem,
//     Typography,
//     FormControl,
//     InputLabel,
//     Snackbar,
//     Alert,
//     useMediaQuery,
//     useTheme,
//     IconButton,
// } from "@mui/material";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import image from "../../Assets/logo.png";
// import { Visibility, VisibilityOff } from "@mui/icons-material";

// const Signup = ({ isLoggedIn, setIsLoggedIn }) => {
//     const [role, setRole] = useState("buyer");
//     const [username, setUsername] = useState("");
//     const [email, setEmail] = useState("");
//     const [cnic, setCnic] = useState("");
//     const [location, setLocation] = useState("");
//     const [password, setPassword] = useState("");
//     const [showPassword, setShowPassword] = useState(false);
//     const [snackbarOpen, setSnackbarOpen] = useState(false);
//     const [snackbarMessage, setSnackbarMessage] = useState("");
//     const [fieldErrors, setFieldErrors] = useState({});
//     const [focusedField, setFocusedField] = useState(""); // State to track focused field
//     const navigate = useNavigate();

//     const theme = useTheme();
//     const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

//     const handleSubmit = async () => {
//         // Reset field errors
//         setFieldErrors({});

//         // Validate fields
//         const errors = {};
//         if (!username) errors.username = "Username is required";
//         if (!email) errors.email = "Email is required";
//         if (!cnic) errors.cnic = "CNIC is required";
//         if (!location) errors.location = "Location is required";
//         if (!password) errors.password = "Password is required";

//         if (Object.keys(errors).length > 0) {
//             setFieldErrors(errors);
//             return;
//         } 

//         const formData = { role, username, email, cnic, location, password };

//         try {
//             const { data } = await axios.post("http://localhost:5000/fyp/signup", formData);

//             localStorage.setItem("role", data.user.role);
//             localStorage.setItem("token", data.token);
//             localStorage.setItem("auth", true);
//             localStorage.setItem("username", data.user.username);
//             localStorage.setItem("userId", data.user._id);
//             setSnackbarMessage(data.message);
//             setSnackbarOpen(true);
//             setUsername("");
//             setEmail("");
//             setCnic("");
//             setLocation("");
//             setPassword("");
//             setTimeout(() => {
//                 navigate("/");
//                 setIsLoggedIn(true);
//                 // window.location.reload();

//             }, 1500);

//         } catch (error) {
//             const errorMessage = error.response ? error.response.data.message : "An unexpected error occurred";
//             setSnackbarMessage(errorMessage);
//             setSnackbarOpen(true);
//         }
//     };

//     const handleCloseSnackbar = () => {
//         setSnackbarOpen(false);
//     };

//     return (
//         <Box
//             display="flex"
//             flexDirection={isSmallScreen ? "column" : "row"}
//             justifyContent="center"
//             alignItems="center"
//             height="100vh"
//             padding="20px"
//         >
//             {!isSmallScreen && (
//                 <Box
//                     flex={0.5}
//                     display="flex"
//                     justifyContent="center"
//                     alignItems="center"
//                 >
//                     <img
//                         src={image}
//                         alt="Signup Illustration"
//                         style={{
//                             maxWidth: "450px",
//                             maxHeight: "450px",
//                             width: "100%",
//                             height: "auto",
//                             objectFit: "cover",
//                         }}
//                     />
//                 </Box>
//             )}

//             <Box
//                 flex={isSmallScreen ? 1 : 0.5}
//                 padding="20px"
//                 display="flex"
//                 flexDirection="column"
//                 justifyContent="center"
//             >
//                 <Typography
//                     variant="h5"
//                     align="center"
//                     gutterBottom
//                     style={{ marginBottom: "20px", fontSize: "2rem", color: "green" }}
//                 >
//                     {`Create ${role === "buyer" ? "Buyer" : "Seller"} Account`}
//                 </Typography>

//                 {/* Role Selection using Select */}
//                 <FormControl margin="normal">

//                     <InputLabel>Role</InputLabel>
//                     <Select
//                         value={role}
//                         onChange={(e) => setRole(e.target.value)}
//                         label="Role"
//                     >
//                         <MenuItem value="buyer">Buyer</MenuItem>
//                         <MenuItem value="seller">Seller</MenuItem>
//                     </Select>
//                 </FormControl>

//                 {/* Form Fields */}
//                 <TextField
//                     fullWidth
//                     label="Username"
//                     margin="normal"
//                     value={username}
//                     onChange={(e) => setUsername(e.target.value)}
//                     error={!!fieldErrors.username}
//                     helperText={fieldErrors.username}
//                     sx={{
//                         mb: 0,
//                         marginTop: "13px",
//                         "& .MuiInputLabel-root": { color: "black" },
//                         "& .MuiInputLabel-root.Mui-focused": { color: "green" },
//                         "& .MuiOutlinedInput-root": {
//                             "& fieldset": { borderColor: "black" },
//                             "&:hover fieldset": { borderColor: "black" },
//                             "&.Mui-focused fieldset": { borderColor: "green" },
//                         },
//                     }}
//                 />
//                 <TextField
//                     fullWidth
//                     label="Email"
//                     margin="normal"
//                     type="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     error={!!fieldErrors.email}
//                     helperText={fieldErrors.email}
//                     sx={{
//                         mb: 0,
//                         marginTop: "13px",
//                         "& .MuiInputLabel-root": { color: "black" },
//                         "& .MuiInputLabel-root.Mui-focused": { color: "green" },
//                         "& .MuiOutlinedInput-root": {
//                             "& fieldset": { borderColor: "black" },
//                             "&:hover fieldset": { borderColor: "black" },
//                             "&.Mui-focused fieldset": { borderColor: "green" },
//                         },
//                     }}
//                 />
//                 <TextField
//                     fullWidth
//                     label="CNIC"
//                     margin="normal"
//                     value={cnic}
//                     onChange={(e) => setCnic(e.target.value)}
//                     error={!!fieldErrors.cnic}
//                     helperText={fieldErrors.cnic}
//                     sx={{
//                         mb: 0,
//                         marginTop: "13px",
//                         "& .MuiInputLabel-root": { color: "black" },
//                         "& .MuiInputLabel-root.Mui-focused": { color: "green" },
//                         "& .MuiOutlinedInput-root": {
//                             "& fieldset": { borderColor: "black" },
//                             "&:hover fieldset": { borderColor: "black" },
//                             "&.Mui-focused fieldset": { borderColor: "green" },
//                         },
//                     }}
//                 />
//                 <TextField
//                     fullWidth
//                     label="Location"
//                     margin="normal"
//                     value={location}
//                     onChange={(e) => setLocation(e.target.value)}
//                     error={!!fieldErrors.location}
//                     helperText={fieldErrors.location}
//                     sx={{
//                         mb: 0,
//                         marginTop: "13px",
//                         "& .MuiInputLabel-root": { color: "black" },
//                         "& .MuiInputLabel-root.Mui-focused": { color: "green" },
//                         "& .MuiOutlinedInput-root": {
//                             "& fieldset": { borderColor: "black" },
//                             "&:hover fieldset": { borderColor: "black" },
//                             "&.Mui-focused fieldset": { borderColor: "green" },
//                         },
//                     }}
//                 />
//                 <TextField
//                     fullWidth
//                     label="Password"
//                     type={showPassword ? "text" : "password"}
//                     margin="normal"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     error={!!fieldErrors.password}
//                     helperText={fieldErrors.password}
//                     sx={{
//                         mb: 0,
//                         marginTop: "13px",
//                         "& .MuiInputLabel-root": { color: "black" },
//                         "& .MuiInputLabel-root.Mui-focused": { color: "green" },
//                         "& .MuiOutlinedInput-root": {
//                             "& fieldset": { borderColor: "black" },
//                             "&:hover fieldset": { borderColor: "black" },
//                             "&.Mui-focused fieldset": { borderColor: "green" },
//                         },
//                     }}
//                     InputProps={{
//                         style: { borderColor: focusedField === "password" ? "green" : "" },
//                         endAdornment: (
//                             <IconButton
//                                 onClick={() => setShowPassword(!showPassword)}
//                                 edge="end"
//                             >
//                                 {showPassword ? <VisibilityOff /> : <Visibility />}
//                             </IconButton>
//                         ),
//                     }}
//                 />

//                 {/* Submit Button */}
//                 <Button
//                     fullWidth
//                     variant="contained"
//                     color="primary"
//                     style={{ marginTop: "10px" }}
//                     onClick={handleSubmit}
//                     sx={{ mb: 0, fontSize: "1.1rem", backgroundColor: "green", color: "white", ":hover": { backgroundColor: "black", color: "yellow" } }}
//                 >
//                     Sign Up
//                 </Button>
//             </Box>

//             {/* Snackbar for notifications */}
//             <Snackbar
//                 open={snackbarOpen}
//                 autoHideDuration={6000}
//                 onClose={handleCloseSnackbar}
//                 anchorOrigin={{ vertical: "top", horizontal: "center" }}
//             >
//                 <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
//                     {snackbarMessage}
//                 </Alert>
//             </Snackbar>
//         </Box>
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
    IconButton,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import image from "../../Assets/logo.png";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Signup = ({ isLoggedIn, setIsLoggedIn }) => {
    const [roleName, setRoleName] = useState("buyer");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [cnic, setCnic] = useState("");
    const [location, setLocation] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [fieldErrors, setFieldErrors] = useState({});
    const [focusedField, setFocusedField] = useState(""); // State to track focused field
    const navigate = useNavigate();

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

    // Password pattern
    const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

    const handleSubmit = async () => {
        // Reset field errors
        setFieldErrors({});

        // Validate fields
        const errors = {};

        // Email validation
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!username) errors.username = "Username is required";
        if (username && username.length < 5) errors.username = "Username must be at least 5 characters long"; // Minimum length check for username
        if (!email) errors.email = "Email is required";
        if (!emailRegex.test(email)) errors.email = "Please enter a valid email address";
        if (!cnic) errors.cnic = "CNIC is required";
        if (cnic && cnic.replace(/[^\d]/g, "").length !== 13) errors.cnic = "CNIC must be exactly 13 digits (format: XXXXX-XXXXXXX-X)";
        if (!location) errors.location = "Location is required";
        if (!password) errors.password = "Password is required";
        if (!passwordPattern.test(password)) errors.password = "Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 8 characters long.";

        if (Object.keys(errors).length > 0) {
            setFieldErrors(errors);
            return;
        }

        // Remove dashes before sending CNIC to the backend
        const formattedCnic = cnic.replace(/-/g, "");

        const role = roleName === "buyer" ? "buyer" : "seller";

        const formData = { role, username, email, cnic: formattedCnic, location, password };

        try {
            const { data } = await axios.post("http://localhost:5000/fyp/signup", formData);

            localStorage.setItem("role", data.user.role);
            localStorage.setItem("token", data.token);
            localStorage.setItem("auth", true);
            localStorage.setItem("username", data.user.username);
            localStorage.setItem("userId", data.user._id);
            setSnackbarMessage(data.message);
            setSnackbarOpen(true);
            setUsername("");
            setEmail("");
            setCnic("");
            setLocation("");
            setPassword("");
            setTimeout(() => {
                navigate("/");
                setIsLoggedIn(true);
            }, 1500);

        } catch (error) {
            const errorMessage = error.response ? error.response.data.message : "An unexpected error occurred";
            setSnackbarMessage(errorMessage);
            setSnackbarOpen(true);
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    // Function to format CNIC with dashes
    const formatCnic = (value) => {
        let cnicValue = value.replace(/[^\d]/g, ""); // Remove all non-numeric characters
        if (cnicValue.length <= 5) return cnicValue;
        if (cnicValue.length <= 12) {
            return `${cnicValue.slice(0, 5)}-${cnicValue.slice(5)}`;
        }
        return `${cnicValue.slice(0, 5)}-${cnicValue.slice(5, 12)}-${cnicValue.slice(12, 13)}`;
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
                            maxWidth: "450px",
                            maxHeight: "450px",
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
                    {`Create ${roleName === "buyer" ? "Buyer" : "Service Provider"} Account`}
                </Typography>

                {/* Role Selection using Select */}
                <FormControl margin="normal">
                    <InputLabel>Role</InputLabel>
                    <Select
                        value={roleName}
                        onChange={(e) => setRoleName(e.target.value)}
                        label="Role"
                    >
                        <MenuItem value="buyer">Buyer</MenuItem>
                        <MenuItem value="Service Provider">Service Provider</MenuItem>
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
                    label="Email"
                    margin="normal"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={!!fieldErrors.email}
                    helperText={fieldErrors.email}
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
                    label="CNIC"
                    margin="normal"
                    value={formatCnic(cnic)}
                    onChange={(e) => setCnic(e.target.value)}
                    error={!!fieldErrors.cnic}
                    helperText={fieldErrors.cnic}
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
                    label="Location"
                    margin="normal"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    error={!!fieldErrors.location}
                    helperText={fieldErrors.location}
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
                    margin="normal"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={!!fieldErrors.password}
                    helperText={fieldErrors.password}
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
                    InputProps={{
                        endAdornment: (
                            <IconButton
                                onClick={() => setShowPassword((prev) => !prev)}
                                edge="end"
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        ),
                    }}
                />

                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    sx={{ mt: 2 }}
                >
                    Sign Up
                </Button>
                <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={6000}
                    onClose={handleCloseSnackbar}
                    anchorOrigin={{ vertical: "top", horizontal: "center" }}
                >
                    <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: "100%" }}>
                        {snackbarMessage}
                    </Alert>
                </Snackbar>
            </Box>
        </Box>
    );
};

export default Signup;



