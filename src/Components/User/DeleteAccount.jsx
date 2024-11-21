// import React, { useState } from "react";
// import {
//     Dialog,
//     DialogActions,
//     DialogContent,
//     DialogContentText,
//     DialogTitle,
//     Button,
//     Alert,
//     Grid
// } from "@mui/material";
// import axios from "axios";

// const DeleteAccount = () => {
//     const [open, setOpen] = useState(false);

//     // Open confirmation dialog
//     const handleOpen = () => {
//         setOpen(true);
//     };

//     // Close confirmation dialog
//     const handleClose = () => {
//         setOpen(false);
//     };

//     // Function to handle account deletion
//     const handleDelete = async () => {
//         try {
//             const { data } = await axios.delete("http://localhost:5000/fyp/deleteUser", {
//                 headers: {
//                     Authorization: `Bearer ${localStorage.getItem("token")}`,
//                 },
//             });
//             alert(data.message);
//             localStorage.clear();
//             setOpen(false);
//             window.location.reload();
//         } catch (error) {
//             alert("Account deletion failed: " + error.response.data.message);
//             setOpen(false);
//         }
//     };

//     return (
//         <>
//             <Button
//                 variant="outlined"
//                 color="error"
//                 onClick={handleOpen}
//                 sx={{
//                     borderColor: "red",
//                     color: "red",
//                     ":hover": {
//                         backgroundColor: "red",
//                         color: "white",
//                     },
//                 }}
//             >
//                 Delete Account
//             </Button>
//             <Dialog
//                 open={open}
//                 onClose={handleClose}
//                 fullWidth
//                 maxWidth="sm"
//                 aria-labelledby="alert-dialog-title"
//                 aria-describedby="alert-dialog-description"
//             >
//                 <DialogTitle id="alert-dialog-title" sx={{ color: "red" }}>
//                     {"Delete Account Confirmation"}
//                 </DialogTitle>
//                 <DialogContent>
//                     <DialogContentText id="alert-dialog-description">
//                         Are you sure you want to delete your account? This action cannot be undone.
//                     </DialogContentText>
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={handleClose} color="primary" variant="outlined" sx={{ fontSize: "1.1rem" }}>
//                         Cancel
//                     </Button>
//                     <Button
//                         onClick={handleDelete}
//                         color="error"
//                         variant="contained"
//                         sx={{
//                             fontSize: "1.1rem",
//                             backgroundColor: "red",
//                             ":hover": { backgroundColor: "darkred" },
//                         }}
//                     >
//                         Yes, Delete
//                     </Button>
//                 </DialogActions>
//             </Dialog>
//         </>
//     );
// };

// export default DeleteAccount;



import React, { useState } from "react";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Button,
    Snackbar,
    Alert,
} from "@mui/material";
import axios from "axios";

const DeleteAccount = () => {
    const [open, setOpen] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    // Open confirmation dialog
    const handleOpen = () => {
        setOpen(true);
    };

    // Close confirmation dialog
    const handleClose = () => {
        setOpen(false);
    };

    // Close snackbar
    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    // Function to handle account deletion
    const handleDelete = async () => {
        try {
            const { data } = await axios.delete("http://localhost:5000/fyp/deleteUser", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            setSnackbarMessage(data.message);
            setSnackbarSeverity('success');
            localStorage.clear();
            setOpen(false);
            window.location.reload();
        } catch (error) {
            setSnackbarMessage("Account deletion failed: " + error.response?.data?.message || error.message);
            setSnackbarSeverity('error');
            setOpen(false);
        } finally {
            setSnackbarOpen(true);
        }
    };

    return (
        <>
            <Button
                variant="outlined"
                color="error"
                onClick={handleOpen}
                sx={{
                    borderColor: "red",
                    color: "red",
                    ":hover": {
                        backgroundColor: "red",
                        color: "white",
                    },
                }}
            >
                Delete Account
            </Button>

            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth
                maxWidth="sm"
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" sx={{ color: "red" }}>
                    {"Delete Account Confirmation"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete your account? This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary" variant="outlined" sx={{ fontSize: "1.1rem" }}>
                        Cancel
                    </Button>
                    <Button
                        onClick={handleDelete}
                        color="error"
                        variant="contained"
                        sx={{
                            fontSize: "1.1rem",
                            backgroundColor: "red",
                            ":hover": { backgroundColor: "darkred" },
                        }}
                    >
                        Yes, Delete
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </>
    );
};

export default DeleteAccount;
