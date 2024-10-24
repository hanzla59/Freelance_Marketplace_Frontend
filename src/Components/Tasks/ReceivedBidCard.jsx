import React from 'react';
import { Card, Box, Typography, Button, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const ReceivedBidCard = ({ proposal, location, bid, job,  status, onAccept, onReject }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Card sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', padding: 2, boxShadow: 3, border: '2px solid green' }}>
      {/* Left side: Proposal and Location */}
      <Box flex={2} sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h5" color="black" >
          Job: {job}
        </Typography>
        <Typography variant="h6" component="div" gutterBottom>
          {proposal}
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ color: 'black', fontSize: '16px', mt: 1 }}>
          Location: {location}
        </Typography>
      </Box>

      {/* Right side: Bid Price and Status/Actions */}
      <Box flex={1} sx={{ display: 'flex', flexDirection: 'column', alignItems: isMobile ? 'flex-start' : 'flex-end' }}>
        <Typography variant="h6" component="div" sx={{ color: 'black' }}>
          {bid} PKR
        </Typography>

        {/* Status or Accept/Reject Buttons */}
        {status === 'submitted' ? (
          <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
            <Button variant="contained" color="success" onClick={onAccept}>
              Accept
            </Button>
            <Button variant="outlined" color="error" onClick={onReject}>
              Reject
            </Button>
          </Box>
        ) : (
          <Typography variant="body2" color="textSecondary" sx={{ marginTop: 1 }}>
            {status}
          </Typography>
        )}
      </Box>
    </Card>
  );
};

export default ReceivedBidCard;
