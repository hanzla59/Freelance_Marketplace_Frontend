import React, { useState } from 'react';
import {
    Box,
    Typography,
    Button,
    Grid,
    Card,
    CardContent,
} from '@mui/material';
import CompleteOrderDialog from './CompleteOrderDialog';
import GiveReviewDialog from './GiveReviewDialog'; // Import the new dialog component
import OrderDetailDialog from './OrderDetailDialog';
import BuyerReviewDialog from '../User/BuyerReviewDialog';
import BuyerProfileDialog from '../Tasks/BuyerProfileDialog';
import axios from 'axios';

const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    });
};

const OrderCard = ({ order }) => {
    const [openCompleteDialog, setOpenCompleteDialog] = useState(false);
    const [openReviewDialog, setOpenReviewDialog] = useState(false); // State for the review dialog
    const [openOrderDetailDialog, setOpenOrderDetailDialog] = useState(false); // State for order details dialog

    const handleCompleteOrderClick = () => setOpenCompleteDialog(true);
    const handleDialogClose = () => setOpenCompleteDialog(false);
    const handleReviewDialogClose = () => setOpenReviewDialog(false); // Close review dialog
    const handleOrderDetailDialogClose = () => setOpenOrderDetailDialog(false); // Close order details dialog
    const [buyerReviewDialogOpen, setBuyerReviewDialogOpen] = useState(false);
    const [profileDialogOpen, setProfileDialogOpen] = useState(false);
    const handleOrderDelivered = () => {
        setTimeout(() => window.location.reload(), 2000);
    };

    const isSeller = localStorage.getItem('role') === 'seller';
    const isBuyer = localStorage.getItem('role') === 'buyer';
    console.log(order.buyer.username)

    const userId = localStorage.getItem('userId');

    const handleCancelOrder = async (orderId) => {
        try {
            const response = await axios.put(
                `http://localhost:5000/fyp/orderCancelled/${orderId}`,
                {},
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );
            alert(response.data.message);
            setTimeout(() => window.location.reload(), 2000);
        } catch (err) {
            alert('Failed to cancel the order');
        }
    };

    const handleGiveReview = () => {
        setOpenReviewDialog(true); // Open the review dialog
    };

    const handleOrderDetails = () => {
        setOpenOrderDetailDialog(true);
    };

    const handleBuyerReviewDialogOpen = () => {
        setBuyerReviewDialogOpen(true);
    };

    const handleBuyerReviewDialogClose = () => {
        setBuyerReviewDialogOpen(false);
    };

    const handleProfileDialogOpen = () => {
        setProfileDialogOpen(true);
    };

    const handleProfileDialogClose = () => {
        setProfileDialogOpen(false);
    };

    return (
        <>
            <Card
                sx={{
                    my: 2,
                    p: 0,
                    border: '2px solid #31473A',
                    backgroundColor: order.status === 'delivered' ? 'green' : '#EDF4F2',
                }}
            >
                <CardContent>
                    <Grid container spacing={1} alignItems="center">
                        <Grid item xs={12} sm={6}>
                            <Typography variant="subtitle2" sx={{ fontSize: '22px' }}>
                                Order ID: {order._id}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} sx={{ textAlign: 'right' }}>
                            <Typography variant="subtitle2" sx={{ fontSize: '22px' }}>
                                PKR {order.price}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body2">Requirements: {order.requirements}</Typography>
                        </Grid>
                        <Grid container justifyContent="space-between" alignItems="center" sx={{ mt: 2, marginLeft: 1 }}>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="body1">Location: {order.location}</Typography>
                                <div style={{display:'flex'}}>
                                <Typography variant="body2">Date: {formatDate(order.createdAt)}</Typography>
                                <Typography variant="body2" onClick={handleProfileDialogOpen} sx={{color:'brown', cursor:'pointer', ml:2}}>Client Profile</Typography>
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={6} sx={{ textAlign: 'right' }}>
                                {order.status === 'active' ? (
                                    <>
                                        {userId === order.seller ? (
                                            <>
                                                <Button variant="outlined" color="error" onClick={() => handleCancelOrder(order._id)}>
                                                    Cancel Order
                                                </Button>
                                                <Button variant="contained" color="success" sx={{ ml: 1 }} onClick={handleCompleteOrderClick}>
                                                    Complete Order
                                                </Button>
                                            </>
                                        ) : (
                                            <Button variant="contained" color="error" onClick={() => handleCancelOrder(order._id)}>
                                                Cancel Order
                                            </Button>
                                        )}
                                    </>
                                ) : order.status === 'complete' && userId === order.buyer ? (
                                    <>
                                        <Button variant="outlined" sx={{ color: 'black', mr: 1, borderColor: 'black' }} onClick={handleOrderDetails}>
                                            Order Details
                                        </Button>
                                        <Button variant="contained" color="success" onClick={handleGiveReview} sx={{ mr: 1 }}>
                                            Give Review to seller
                                        </Button>
                                    </>
                                ) : (
                                    <Typography variant="body2" sx={{ color: order.status === 'delivered' ? 'green' : 'red' }}>
                                        <Button variant="outlined" sx={{ color: 'black', mr: 1, borderColor: 'black' }} onClick={handleOrderDetails}>
                                            Order Details
                                        </Button>
                                        <Button variant="contained" color="success" onClick={handleBuyerReviewDialogOpen} sx={{ mr: 1 }}>
                                            Give Review to Buyer
                                        </Button>
                                    </Typography>
                                )}
                            </Grid>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

            <CompleteOrderDialog
                open={openCompleteDialog}
                onClose={handleDialogClose}
                order={order}
                onOrderDelivered={handleOrderDelivered}
            />
            <GiveReviewDialog // Add the review dialog here
                open={openReviewDialog}
                onClose={handleReviewDialogClose}
                orderId={order._id}
            />
            <OrderDetailDialog
                open={openOrderDetailDialog}
                onClose={handleOrderDetailDialogClose}
                order={order}
            />
            <BuyerReviewDialog
                open={buyerReviewDialogOpen}
                onClose={handleBuyerReviewDialogClose}
                orderId={order._id}
            />
            <BuyerProfileDialog
                open={profileDialogOpen}
                onClose={handleProfileDialogClose}
                username={order.buyer.username}
            />
        </>
    );
};

export default OrderCard;
