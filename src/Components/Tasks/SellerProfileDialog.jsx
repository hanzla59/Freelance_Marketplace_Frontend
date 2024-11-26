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

// const SellerProfileDialog = ({ open, onClose, username }) => {
//   const [loading, setLoading] = useState(false);
//   const [profile, setProfile] = useState(null);
//   const [reviews, setReviews] = useState([]);

//   const fetchSellerProfile = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.post('http://localhost:5000/fyp/sellerProfile', { username });
//       setProfile(response.data.user);
//       setReviews(response.data.jobReview);
//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching seller profile:', error);
//       setLoading(false);
//     }
//   };

//   // Fetch profile on open
//   React.useEffect(() => {
//     if (open) {
//       fetchSellerProfile();
//     }
//   }, [open]);

//   return (
//     <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
//       <DialogTitle>Seller Profile</DialogTitle>
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
//                 {/* <Typography variant="body2" color="textSecondary">
//                   {profile.email}
//                 </Typography> */}
//               </Box>
//             </Box>
//             <Typography variant="body1" gutterBottom>
//               Name: {profile.name || 'N/A'}
//             </Typography>
//             <Typography variant="body1" gutterBottom>
//               Location: {profile.location || 'N/A'}
//             </Typography>
//             <Typography variant="body1" gutterBottom>
//               Total Earned: PKR {profile.totalEarned || 'N/A'}
//             </Typography>
//             <Typography variant="body1" gutterBottom>
//               Average Ratting: {profile.sellerRating || 'N/A'}
//             </Typography>

//             <Typography variant="h6" sx={{ mt: 2 }}>
//               Seller Reviews:
//             </Typography>
//             {reviews.length > 0 ? (
//               reviews.map((review, index) => (
//                 <Box key={index} sx={{ mt: 1, p: 2, border: '1px solid #ccc', borderRadius: 1 }}>
//                   <Typography variant="body2" color="textSecondary">
//                     From Buyer: {review.buyer.username}
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

// export default SellerProfileDialog;














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
  CircularProgress,
  Card,
  Rating,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import axios from 'axios';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const SellerProfileDialog = ({ open, onClose, username }) => {
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState(null);
  const [reviews, setReviews] = useState([]);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const fetchSellerProfile = async () => {
    try {
      setLoading(true);
      const response = await axios.post('http://localhost:5000/fyp/sellerProfile', { username });
      setProfile(response.data.user);
      setReviews(response.data.jobReview);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching seller profile:', error);
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (open) {
      fetchSellerProfile();
    }
  }, [open]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Service Provider Profile</DialogTitle>
      <DialogContent>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 200 }}>
            <CircularProgress />
          </Box>
        ) : profile ? (
          <Box>
            {/* Profile Header */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <Avatar
                src={profile.avatar || ''}
                alt={profile.username}
                sx={{ width: 64, height: 64 }}
              />
              <Box>
                <Typography variant="h6">{profile.username}</Typography>

                <Typography variant="body2" color="textSecondary" style={{ fontSize: "16px" }}>
                  <LocationOnIcon   style={{ width: '30px', mt: 2 }} />
                  {profile.location || 'N/A'}
                </Typography>


              </Box>
            </Box>
            <Typography variant="body1" gutterBottom>
              Name: {profile.name || 'N/A'}
            </Typography>

            <Typography variant="body1" gutterBottom>
              Total Complete Orders:  {profile.sellerCompleteOrders || 'N/A'}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Total Earned: PKR {profile.totalEarned || 'N/A'}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Average Rating: {profile.sellerRating || 'N/A'}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Hourly Rate: PKR {profile.hourlyRate || 'N/A'}
            </Typography>
            <Typography color="text.secondary">
              Skills: {profile.skills.join(", ")}
            </Typography>

            {/* Reviews Section */}
            <Typography variant="h6" sx={{ mt: 2 }}>
              Review From Clients:
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
                  <Box
                    sx={{
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                      padding: 1,
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: 'bold',
                        color: 'text.primary',
                        marginRight: 1,
                      }}
                    >
                      Comment:
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: 'text.secondary',
                        fontSize: '1rem',
                      }}
                    >
                      {review.review || 'No Review'}
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
                      Reviewed by: {review.buyer?.username || 'Unknown Buyer'}
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

export default SellerProfileDialog;

