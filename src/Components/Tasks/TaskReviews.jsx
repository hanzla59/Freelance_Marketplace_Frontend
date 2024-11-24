import React, { useEffect, useState } from 'react';
import { Box, Card, Typography, Rating, useTheme, useMediaQuery } from '@mui/material';
import axios from 'axios';

const TaskReviews = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [reviews, setReviews] = useState([]);
  const username = localStorage.getItem('username'); // Get username from localStorage

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/fyp/getReviews/${username}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        setReviews(response.data.reviews); // Store the fetched reviews
      } catch (error) {
        console.error('Error fetching reviews', error);
      }
    };

    fetchReviews();
  }, [username]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      <Typography variant="h5">My Completed Task Reviews</Typography>
      {reviews.length > 0 ? (
        reviews.map((review, index) => (
          <Card
            key={index}
            sx={{
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              padding: 2,
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              boxShadow: 3,
              marginBottom: 1,
              border: '2px solid darkgreen',
            }}
          >
            {/* Left Side - Job Title and Review */}
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" component="div">
                Task: {review.jobOrder?.job?.title || 'No Title'} {/* Check if jobOrder and job exist */}
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                Comment: {review.review || 'No Review'} {/* Review content */}
              </Typography>
            </Box>

            {/* Right Side - Rating and Buyer */}
            <Box sx={{ flex: 1, textAlign: isMobile ? 'left' : 'right' }}>
              <Rating value={review.rating} readOnly />
              <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                Reviewed by: {review.buyer?.username || 'Unknown'} {/* Buyer Username */}
              </Typography>
            </Box>
          </Card>
        ))
      ) : (
        <Typography variant="body2">No reviews available.</Typography>
      )}
    </Box>
  );
};

export default TaskReviews;

