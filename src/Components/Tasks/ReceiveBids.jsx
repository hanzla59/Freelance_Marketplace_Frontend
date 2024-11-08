// import React, { useEffect, useState } from 'react';
// import { Grid, CircularProgress, Snackbar, Alert } from '@mui/material';
// import ReceivedBidCard from './ReceivedBidCard';
// import axios from 'axios';

// const ReceivedBids = () => {
//   const [bids, setBids] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [successMessage, setSuccessMessage] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');

//   useEffect(() => {
//     const fetchBids = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/fyp/getProposals', {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`,
//           },
//         });
//         setBids(response.data.proposals.flat()); 
//         setLoading(false);
//       } catch (err) {
//         setError('Failed to fetch bids');
//         setLoading(false);
//       }
//     };

//     fetchBids();
//   }, []);

//   const updateBidStatus = async (bidId, status) => {
//     try {
//       const response = await axios.put(`http://localhost:5000/fyp/updateProposal/${bidId}`, {
//         status
//       }, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('token')}`,
//         },
//       });
//       setSuccessMessage(response.data.message);

//       setBids(bids.map(bid => bid._id === bidId ? { ...bid, status } : bid));
//     } catch (error) {
//       if (error.response) {
//         setErrorMessage(error.response.data.message);
//       } else {
//         setErrorMessage("An unexpected error occurred");
//       }
//     }
//   };

//   const handleAccept = (bidId) => {
//     updateBidStatus(bidId, 'accept');
//   };

//   const handleReject = (bidId) => {
//     updateBidStatus(bidId, 'reject');
//   };

//   if (loading) {
//     return <CircularProgress />;
//   }

//   if (error) {
//     return <p>{error}</p>;
//   }

//   return (
//     <>
//       <Grid container spacing={2}>
//         {bids.map((bid) => (
//           <Grid item xs={12} key={bid._id}>
//             <ReceivedBidCard
//               proposal={bid.proposal}
//               location={bid.location}
//               bid={bid.bid}
//               job={bid.job.title}
//               status={bid.status}
//               onAccept={() => handleAccept(bid._id)}
//               onReject={() => handleReject(bid._id)}
//             />
//           </Grid>
//         ))}
//       </Grid>

//       {/* Snackbar for success message */}
//       <Snackbar open={!!successMessage} autoHideDuration={6000} onClose={() => setSuccessMessage('')}>
//         <Alert onClose={() => setSuccessMessage('')} severity="success" sx={{ width: '100%' }}>
//           {successMessage}
//         </Alert>
//       </Snackbar>

//       {/* Snackbar for error message */}
//       <Snackbar open={!!errorMessage} autoHideDuration={6000} onClose={() => setErrorMessage('')}>
//         <Alert onClose={() => setErrorMessage('')} severity="error" sx={{ width: '100%' }}>
//           {errorMessage}
//         </Alert>
//       </Snackbar>
//     </>
//   );
// };

// export default ReceivedBids;






import React, { useEffect, useState } from 'react';
import { Grid, CircularProgress, Snackbar, Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import ReceivedBidCard from './ReceivedBidCard';
import axios from 'axios';

const ReceivedBids = () => {
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [openMessageDialog, setOpenMessageDialog] = useState(false);
  const [message, setMessage] = useState('');
  const [currentBid, setCurrentBid] = useState(null);
  const [roomId, setRoomId] = useState(null); // To store the room ID

  useEffect(() => {
    const fetchBids = async () => {
      try {
        const response = await axios.get('http://localhost:5000/fyp/getProposals', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setBids(response.data.proposals.flat());
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch bids');
        setLoading(false);
      }
    };

    fetchBids();
  }, []);

  const updateBidStatus = async (bidId, status) => {
    try {
      const response = await axios.put(`http://localhost:5000/fyp/updateProposal/${bidId}`, {
        status,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setSuccessMessage(response.data.message);
      setBids(bids.map(bid => bid._id === bidId ? { ...bid, status } : bid));
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("An unexpected error occurred");
      }
    }
  };

  const handleAccept = (bidId) => {
    updateBidStatus(bidId, 'accept');
  };

  const handleReject = (bidId) => {
    updateBidStatus(bidId, 'reject');
  };

  //use useeffect to fetch 
  const handleMessageClick = async (bid) => {
    setCurrentBid(bid);
    const senderId = localStorage.getItem('userId');
    const receiverId = bid.seller._id;

    // Check if a room already exists or create one
    try {
      const response = await axios.post('http://localhost:5000/fyp/rooms', {
        user1: senderId,
        user2: receiverId,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      setRoomId(response.data.roomId);
      setOpenMessageDialog(true);
    } catch (error) {
      setErrorMessage('Failed to create or join room');
    }
  };

  const handleSendMessage = async () => {
    if (!message.trim()) {
      setErrorMessage('Message cannot be empty');
      return;
    }

    try {
      const senderId = localStorage.getItem('userId');
      const receiverId = currentBid?.seller?._id;

      const response = await axios.post('http://localhost:5000/fyp/sendMessage', {
        roomId, // Send the room ID with the message
        senderId,
        receiverId,
        message,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      setSuccessMessage('Message sent successfully');
      setOpenMessageDialog(false);
      setMessage('');
    } catch (error) {
      setErrorMessage('Failed to send message');
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <Grid container spacing={2}>
        {bids.map((bid) => (
          <Grid item xs={12} key={bid._id}>
            <ReceivedBidCard
              proposal={bid.proposal}
              location={bid.location}
              bid={bid.bid}
              job={bid.job.title}
              status={bid.status}
              onAccept={() => handleAccept(bid._id)}
              onReject={() => handleReject(bid._id)}
            />
            <Button 
              variant="contained" 
              color="primary" 
              onClick={() => handleMessageClick(bid)} 
              style={{ marginTop: '10px' }}
            >
              Message
            </Button>
          </Grid>
        ))}
      </Grid>

      {/* Snackbar for success message */}
      <Snackbar open={!!successMessage} autoHideDuration={6000} onClose={() => setSuccessMessage('')}>
        <Alert onClose={() => setSuccessMessage('')} severity="success" sx={{ width: '100%' }}>
          {successMessage}
        </Alert>
      </Snackbar>

      {/* Snackbar for error message */}
      <Snackbar open={!!errorMessage} autoHideDuration={6000} onClose={() => setErrorMessage('')}>
        <Alert onClose={() => setErrorMessage('')} severity="error" sx={{ width: '100%' }}>
          {errorMessage}
        </Alert>
      </Snackbar>

      {/* Message Dialog */}
      <Dialog open={openMessageDialog} onClose={() => setOpenMessageDialog(false)}>
        <DialogTitle>Send Message</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="message"
            label="Message"
            type="text"
            fullWidth
            variant="outlined"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            multiline
            rows={4}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenMessageDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSendMessage} color="primary">
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ReceivedBids;


