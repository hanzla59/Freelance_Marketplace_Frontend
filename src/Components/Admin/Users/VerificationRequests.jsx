import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Card, CardContent, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import axios from 'axios';

const VerificationRequestCard = ({ request, openDialog }) => {
    const username = request.user ? request.user.username : 'Unknown User';
    const cnic = request.user ? request.user.cnic : 'N/A';

    return (
        <Card sx={{ display: 'flex', flexDirection: 'row', p: 2, mb: 2, width: '100%', maxWidth: '100%', borderRadius: '8px', boxShadow: 3, border: '1px solid black' }}>
            <CardContent sx={{ flex: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '22px' }}>Username: {username}</Typography>
                <Typography variant="body2" color="textSecondary" sx={{ mt: 2, fontSize: '16px' }}>
                    Verification Request Date: {new Date(request.createdAt).toLocaleDateString()}
                </Typography>
            </CardContent>
            <CardContent sx={{ flex: 1, textAlign: 'right' }}>
                <Typography variant="subtitle2" sx={{ fontSize: '16px' }}>CNIC: {cnic}</Typography>
                {request.status === "pending" ? (
                    <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={() => openDialog(request)}>
                        Open Request
                    </Button>
                ) : (
                    <Typography variant="body2" color="textSecondary" sx={{ mt: 2, fontSize: '16px' }}>
                        Status: {request.status}
                    </Typography>
                )}
            </CardContent>
        </Card>
    );
};


const VerificationRequests = () => {
    const [requests, setRequests] = useState([]);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await axios.get('http://localhost:5000/fyp/admin/verificationRequest');
                setRequests(response.data.allVerificationRequests);
            } catch (error) {
                console.error('Error fetching verification requests', error);
            }
        };
        fetchRequests();
    }, []);

    const openDialog = (request) => {
        setSelectedRequest(request);
        setOpen(true);
    };

    const closeDialog = () => {
        setOpen(false);
        setSelectedRequest(null);
    };

    const handleAccept = async () => {
        try {
            await axios.put(
                `http://localhost:5000/fyp/admin/verifyUser/${selectedRequest._id}`,
                { status: "approved" },
                { headers: { 'Content-Type': 'application/json' } }
            );
            setRequests((prevRequests) => prevRequests.filter((request) => request._id !== selectedRequest._id));
            closeDialog();
        } catch (error) {
            console.error('Error accepting verification request', error);
        }
    };

    const handleReject = async () => {
        try {
            await axios.put(
                `http://localhost:5000/fyp/admin/verifyUser/${selectedRequest._id}`,
                { status: "reject" },
                { headers: { 'Content-Type': 'application/json' } }
            );
            setRequests((prevRequests) => prevRequests.filter((request) => request._id !== selectedRequest._id));
            closeDialog();
        } catch (error) {
            console.error('Error rejecting verification request', error);
        }
    };

    return (
        <Box sx={{ p: 3 }}>
            {requests.map((request) => (
                <VerificationRequestCard key={request._id} request={request} openDialog={openDialog} />
            ))}
            {selectedRequest && (
                <Dialog open={open} onClose={closeDialog} maxWidth="sm" fullWidth>
                    <DialogTitle>CNIC: {selectedRequest.user.cnic}</DialogTitle>
                    <DialogContent>
                        <Box sx={{ textAlign: 'center', mb: 2 }}>
                            <img src={selectedRequest.frontSide} alt="Front CNIC" style={{ width: '100%', maxWidth: '550px', marginBottom: '16px' }} />
                            <img src={selectedRequest.backSide} alt="Back CNIC" style={{ width: '100%', maxWidth: '550px' }} />
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button color="success" variant="contained" onClick={handleAccept}>Accept</Button>
                        <Button color="error" variant="contained" onClick={handleReject}>Reject</Button>
                    </DialogActions>
                </Dialog>
            )}
        </Box>
    );
};

export default VerificationRequests;
