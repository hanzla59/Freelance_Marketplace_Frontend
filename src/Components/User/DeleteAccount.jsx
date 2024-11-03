import React, { useState } from "react";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Button,
    Grid
} from "@mui/material";
import axios from "axios";

const DeleteAccount = () => {
    const [open, setOpen] = useState(false);

    // Open confirmation dialog
    const handleOpen = () => {
        setOpen(true);
    };

    // Close confirmation dialog
    const handleClose = () => {
        setOpen(false);
    };

    // Function to handle account deletion
    const handleDelete = async () => {
        try {
            const { data } = await axios.delete("http://localhost:5000/fyp/deleteUser", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            alert(data.message);
            localStorage.clear();
            setOpen(false);
            window.location.reload();
        } catch (error) {
            console.error("Error deleting account:", error);
            alert("Account deletion failed: " + error.response.data.message);
            setOpen(false);
        }
    };

    return (
        <>
            <Button
                variant="outlined"
                color="error"
                onClick={handleOpen}
                sx={{
                    // width: "200px",
                    // fontSize: "1.1rem",
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
            {/* <Button variant="outlined" color="error"
                onClick={handleOpen}  sx={{ ":hover": { backgroundColor: "red", color: "white" } }}>Delete Account</Button> */}

            {/* Confirmation Dialog */}
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
        </>
    );
};

export default DeleteAccount;
