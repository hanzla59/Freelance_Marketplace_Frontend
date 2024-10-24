import React, { useEffect, useState } from 'react';
import { Grid, CircularProgress, Snackbar, Alert } from '@mui/material';
import ReceivedBidCard from './ReceivedBidCard';
import axios from 'axios';

const ReceivedBids = () => {
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

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
        status
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
    </>
  );
};

export default ReceivedBids;
