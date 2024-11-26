// import React, { useState } from 'react';
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Typography,
//   Button,
//   Box,
//   Avatar,
//   CircularProgress,
// } from '@mui/material';
// import axios from 'axios';

// const BuyerProfileDialog = ({ open, onClose, username }) => {
//   const [loading, setLoading] = useState(false);
//   const [profile, setProfile] = useState(null);
//   const [reviews, setReviews] = useState([]);

//   const fetchBuyerProfile = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.post('http://localhost:5000/fyp/buyerProfile', { username });
//       setProfile(response.data.user);
//       setReviews(response.data.buyerReview);
//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching buyer profile:', error);
//       setLoading(false);
//     }
//   };

//   // Fetch profile on open
//   React.useEffect(() => {
//     if (open) {
//       fetchBuyerProfile();
//     }
//   }, [open]);

//   return (
//     <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
//       <DialogTitle>Buyer Profile</DialogTitle>
//       <DialogContent>
//         {loading ? (
//           <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 200 }}>
//             <CircularProgress />
//           </Box>
//         ) : profile ? (
//           <Box>
//             <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
//               <Avatar
//                 src={profile.avatar || ''}
//                 alt={profile.username}
//                 sx={{ width: 64, height: 64 }}
//               />
//               <Box>
//                 <Typography variant="h6">{profile.username}</Typography>
//                 <Typography variant="body2" color="textSecondary">
//                   {profile.location}
//                 </Typography>
//               </Box>
//             </Box>
//             <Typography variant="body1" gutterBottom>
//               Name: {profile.name || 'N/A'}
//             </Typography>
//             <Typography variant="body1" gutterBottom>
//               Total Spent: PKR {profile.totalSpent || 'N/A'}
//             </Typography>
//             <Typography variant="body1" gutterBottom>
//               Avearge Ratting: {profile.buyerRating || 'N/A'}
//             </Typography>

//             <Typography variant="h6" sx={{ mt: 2 }}>
//               Buyer Reviews:
//             </Typography>
//             {reviews.length > 0 ? (
//               reviews.map((review, index) => (
//                 <Box key={index} sx={{ mt: 1, p: 2, border: '1px solid #ccc', borderRadius: 1 }}>
//                   <Typography variant="body2" color="textSecondary">
//                     From Seller: {review.seller.username}
//                   </Typography>
//                   <Typography variant="body2">Rating: {review.rating}/5</Typography>
//                   <Typography variant="body2">{review.comment}</Typography>
//                 </Box>
//               ))
//             ) : (
//               <Typography variant="body2" color="textSecondary">
//                 No reviews available.
//               </Typography>
//             )}
//           </Box>
//         ) : (
//           <Typography variant="body2" color="textSecondary">
//             Unable to load profile details.
//           </Typography>
//         )}
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={onClose} color="primary">
//           Close
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default BuyerProfileDialog;



























import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Box,
  Avatar,
  Card,
  Rating,
  useTheme,
  useMediaQuery,
  CircularProgress,
} from '@mui/material';
import axios from 'axios';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const BuyerProfileDialog = ({ open, onClose, username }) => {
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState(null);
  const [reviews, setReviews] = useState([]);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));


  const fetchBuyerProfile = async () => {
    try {
      setLoading(true);
      const response = await axios.post('http://localhost:5000/fyp/buyerProfile', { username });
      setProfile(response.data.user);
      setReviews(response.data.buyerReview);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching buyer profile:', error);
      setLoading(false);
    }
  };

  // Fetch profile on open
  React.useEffect(() => {
    if (open) {
      fetchBuyerProfile();
    }
  }, [open]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Client Profile</DialogTitle>
      <DialogContent>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 200 }}>
            <CircularProgress />
          </Box>
        ) : profile ? (
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <Avatar
                src={profile.avatar || ''}
                alt={profile.username}
                sx={{ width: 64, height: 64 }}
              />
              <Box>
                <Typography variant="h6">{profile.username}</Typography>
                <Typography variant="body2" color="textSecondary" style={{fontSize: "16px"}}>
                <LocationOnIcon color="action" style={{width:'30px', mt: 2}}/>
                  {profile.location}
                </Typography>
              </Box>
            </Box>
            <Typography variant="body1" gutterBottom>
              Name: {profile.name || 'N/A'}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Total Spent: PKR {profile.totalSpent || 'N/A'}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Total Complete Orders: {profile.buyerCompleteOrders || 'N/A'}
            </Typography>

            <Typography variant="body1" gutterBottom>
              Avearge Ratting: {profile.buyerRating || 'N/A'}
            </Typography>

            <Typography variant="h6" sx={{ mt: 2 }}>
              Feedback from Service Providers:
            </Typography>
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <Card
                  key={review._id}
                  sx={{
                    display: 'flex',
                    flexDirection: isMobile ? 'column' : 'row',
                    padding: 2,
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    boxShadow: 3,
                    mt: 2,
                    border: '1px solid green'
                  }}
                >
                  <Box>
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: 'bold',
                        color: 'text.primary',
                        marginRight: 1,
                      }}
                    >
                      Comment
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: 'text.secondary',
                        fontSize: '1rem',
                      }}
                    >
                      {review.comment || 'No Review'}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      flex: 1,
                      textAlign: isMobile ? 'left' : 'right',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: isMobile ? 'flex-start' : 'flex-end',
                      justifyContent: 'center',
                      gap: 0.5,
                    }}
                  >
                    <Rating value={review.rating} readOnly />
                    <Typography variant="body2" color="textSecondary">
                      Reviewed by: {review.seller?.username || 'Unknown Buyer'}
                    </Typography>
                  </Box>
                </Card>
              ))
            ) : (
              <Typography variant="body2" color="textSecondary">
                No reviews available.
              </Typography>
            )}
          </Box>
        ) : (
          <Typography variant="body2" color="textSecondary">
            Unable to load profile details.
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BuyerProfileDialog;
