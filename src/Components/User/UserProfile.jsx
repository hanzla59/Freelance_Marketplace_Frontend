import React, { useState, useEffect } from "react";
import {
    Box,
    Typography,
    ToggleButton,
    ToggleButtonGroup,
    Grid,
    Card,
    CardContent,
    Avatar,
    Rating,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import axios from "axios";

const UserProfile = () => {
    const [userData, setUserData] = useState(null);
    const [buyerReviews, setBuyerReviews] = useState([]);
    const [jobReviews, setJobReviews] = useState([]);
    const [viewMode, setViewMode] = useState("buyer"); // Default to "Buyer Profile"

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    useEffect(() => {
        // Fetch user profile data
        const fetchUserProfile = async () => {
            try {
                const response = await axios.get("http://localhost:5000/fyp/userProfile", {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                const { user, buyerReview, jobReview } = response.data;
                setUserData(user);
                setBuyerReviews(buyerReview);
                setJobReviews(jobReview);
            } catch (error) {
                console.error("Error fetching user profile:", error.response?.data || error.message);
            }
        };
        fetchUserProfile();
    }, []);

    if (!userData) {
        return (
            <Typography textAlign="center" mt={4}>
                Loading...
            </Typography>
        );
    }

    const isSeller = userData.role === "seller";

    return (
        <Box p={2} maxWidth="800px" mx="auto">
            {/* User Profile Header */}
            <Card
                sx={{
                    display: "flex",
                    flexDirection: isMobile ? "column" : "row",
                    alignItems: "center",
                    boxShadow: 4,
                }}
            >
                <Avatar
                    alt={userData.username}
                    src="/placeholder-avatar.png" // Replace with user's profile image if available
                    sx={{
                        width: 100,
                        height: 100,
                        margin: isMobile ? "auto" : "16px",
                    }}
                />
                <Box sx={{ flex: 1, textAlign: isMobile ? "center" : "left", p: 2 }}>
                    <Typography variant="h5" fontWeight="bold">
                        {userData.username}
                    </Typography>
                    <Typography color="text.secondary">
                        Location: {userData.location || "Not specified"}
                    </Typography>
                    {isSeller && userData.skills.length > 0 && (
                        <Typography color="text.secondary">
                            Skills: {userData.skills.join(", ")}
                        </Typography>
                    )}
                    {isSeller && userData.hourlyRate && (
                        <Typography color="text.secondary">
                            Hourly Rate: PKR {userData.hourlyRate}
                        </Typography>
                    )}
                </Box>
            </Card>

            {/* Toggle for Seller's Profile View */}
            {isSeller && (
                <Box mt={2}>
                    <ToggleButtonGroup
                        value={viewMode}
                        exclusive
                        onChange={(event, newMode) => newMode && setViewMode(newMode)}
                        fullWidth
                        color="primary"
                    >
                        <ToggleButton value="buyer">See as Buyer Profile</ToggleButton>
                        <ToggleButton value="seller">See as Seller Profile</ToggleButton>
                    </ToggleButtonGroup>
                </Box>
            )}

            {/* Profile Details */}
            <Box mt={3}>
                {viewMode === "buyer" ? (
                    <Box>
                        <Typography variant="h6" color="primary" mb={1}>
                            Buyer Details
                        </Typography>
                        <Typography>Rating: {userData.buyerRating || "Not rated yet"}</Typography>
                        <Typography>Completed Orders: {userData.buyerCompleteOrders}</Typography>
                        <Typography>Total Spent: PKR {userData.totalSpent}</Typography>
                    </Box>
                ) : (
                    <Box>
                        <Typography variant="h6" color="primary" mb={1}>
                            Seller Details
                        </Typography>
                        <Typography>Rating: {userData.sellerRating || "Not rated yet"}</Typography>
                        <Typography>Completed Orders: {userData.sellerCompleteOrders}</Typography>
                        <Typography>Total Earned: PKR {userData.totalEarned}</Typography>
                    </Box>
                )}
            </Box>

            {/* Reviews */}
            <Box mt={4}>
                <Typography variant="h5" mb={2}>
                    {viewMode === "buyer" ? "Feedback From Service Providers" : "Reviews From Clients"}
                </Typography>
                <ReviewList reviews={viewMode === "buyer" ? buyerReviews : jobReviews} viewMode={viewMode} isMobile={isMobile} />
            </Box>
        </Box>
    );
};

// Review List Component
const ReviewList = ({ reviews, viewMode, isMobile }) => {
    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {reviews.length > 0 ? (
                reviews.map((review) => (
                    <Card
                        key={review._id}
                        sx={{
                            display: "flex",
                            flexDirection: isMobile ? "column" : "row",
                            padding: 2,
                            alignItems: "flex-start",
                            justifyContent: "space-between",
                            boxShadow: 3,
                        }}
                    >
                        <Box
                            sx={{
                                flex: 1,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "flex-start",
                                padding: 1,
                            }}
                        >
                            <Typography
                                variant="body1"
                                sx={{
                                    fontWeight: "bold", // Makes "Comment" bold
                                    color: "text.primary",
                                    marginRight: 1, // Adds spacing between "Comment:" and the content
                                }}
                            >
                                Comment:
                            </Typography>
                            <Typography
                                variant="body1" // Keeps the text clean and simple
                                sx={{
                                    color: "text.secondary",
                                    fontSize: "1rem", // Ensures the text is noticeable but not overwhelming
                                }}
                            >
                                {viewMode === "buyer" ? review.comment : review.review || "No Review"}
                            </Typography>
                        </Box>


                        <Box
                            sx={{
                                flex: 1,
                                textAlign: isMobile ? "left" : "right",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: isMobile ? "flex-start" : "flex-end",
                                justifyContent: "center",
                                gap: 0.5,
                            }}
                        >
                            <Rating value={review.rating} readOnly />
                            <Typography variant="body2" color="textSecondary">
                                Reviewed by:{" "}
                                {viewMode === "buyer"
                                    ? review.seller?.username || "Unknown Seller"
                                    : review.buyer?.username || "Unknown Buyer"}
                            </Typography>
                        </Box>

                    </Card>
                ))
            ) : (
                <Typography variant="body2" color="text.secondary">
                    No reviews available.
                </Typography>
            )}
        </Box>
    );
};

export default UserProfile;

