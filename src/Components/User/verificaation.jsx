import React, { useState } from 'react';
import {
  Button,
  Container,
  Typography,
  Box,
  Grid,
} from '@mui/material';
import axios from 'axios';

const VerificationDialog = () => {
  const [frontCnic, setFrontCnic] = useState(null);
  const [backCnic, setBackCnic] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle file change
  const handleFileChange = (event, setFile) => {
    setFile(event.target.files[0]);
  };

  // Handle form submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('frontSide', frontCnic);
    formData.append('backSide', backCnic);

    try {
      const { data } = await axios.post('http://localhost:5000/fyp/applyForVerification', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      alert(data.message);
      
      // Clear inputs after successful submission
      setFrontCnic(null);
      setBackCnic(null);
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.message;
        alert(`${errorMessage}`);
      } else {
        alert("Verification failed: An unexpected error occurred");
      }
      console.error("Error during verification:", error); 
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 2 }}>
      <Typography variant="h4" align="center" sx={{ color: 'green' }}>
        Apply For Verification
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} justifyContent="center">
          {/* Front CNIC Upload */}
          <Grid item xs={12}>
            <Typography variant="h6" align="center" sx={{ mt: 0, mb: 0 }}>
              Upload Front Side of CNIC
            </Typography>
            <Box
              sx={{
                border: '2px dashed #1976d2',
                borderRadius: '8px',
                height: { xs: '200px', md: '210px' },
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '10px auto',
                overflow: 'hidden',
                mt: 1,
                mb: 0.5,
              }}
            >
              <input
                type="file"
                accept="image/*"
                id="frontCnic"
                style={{ display: 'none' }}
                onChange={(e) => handleFileChange(e, setFrontCnic)}
                required
              />
              <label
                htmlFor="frontCnic"
                style={{
                  cursor: 'pointer',
                  flexGrow: 1,
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                {frontCnic ? (
                  <img
                    src={URL.createObjectURL(frontCnic)}
                    alt="Front CNIC"
                    style={{ maxHeight: '100%', maxWidth: '100%' }}
                  />
                ) : (
                  <Typography variant="body1">Click to upload (400x250 px)</Typography>
                )}
              </label>
            </Box>
          </Grid>

          {/* Back CNIC Upload */}
          <Grid item xs={12}>
            <Typography variant="h6" align="center" sx={{ mt: 0, mb: 0 }}>
              Upload Back Side of CNIC
            </Typography>
            <Box
              sx={{
                border: '2px dashed #1976d2',
                borderRadius: '8px',
                height: { xs: '200px', md: '210px' },
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '10px auto',
                overflow: 'hidden',
                mt: 1,
              }}
            >
              <input
                type="file"
                accept="image/*"
                id="backCnic"
                style={{ display: 'none' }}
                onChange={(e) => handleFileChange(e, setBackCnic)}
                required
              />
              <label
                htmlFor="backCnic"
                style={{
                  cursor: 'pointer',
                  flexGrow: 1,
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                {backCnic ? (
                  <img
                    src={URL.createObjectURL(backCnic)}
                    alt="Back CNIC"
                    style={{ maxHeight: '100%', maxWidth: '100%' }}
                  />
                ) : (
                  <Typography variant="body1">Click to upload (400x250 px)</Typography>
                )}
              </label>
            </Box>
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              sx={{
                fontSize: '1.05rem',
                width: '100%',
                maxWidth: '400px',
                color: 'white',
                backgroundColor: 'black',
                '&:hover': { backgroundColor: 'green' },
              }}
            >
              {loading ? 'Applying' : 'Apply'}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default VerificationDialog;
