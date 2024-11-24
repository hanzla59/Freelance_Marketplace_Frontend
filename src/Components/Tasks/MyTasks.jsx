// import React, { useState, useEffect } from 'react';
// import {
//   Grid,
//   Card,
//   CardContent,
//   CardActions,
//   Typography,
//   Button,
//   CircularProgress,
//   Snackbar,
//   Box
// } from '@mui/material';
// import axios from 'axios';

// const MyTasks = () => {
//   const [jobs, setJobs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [openSnackbar, setOpenSnackbar] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState('');

//   useEffect(() => {
//     const fetchJobs = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/fyp/getJobByUser', {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`,
//           },
//         });
//         setJobs(response.data.jobs);
//         setLoading(false);
//       } catch (err) {
//         setError('Failed to fetch jobs');
//         setLoading(false);
//       }
//     };

//     fetchJobs();
//   }, []);

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/fyp/deleteJob/${id}`, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('token')}`,
//         },
//       });
//       setJobs(jobs.filter(job => job._id !== id));
//       setSnackbarMessage('Job deleted successfully');
//       setOpenSnackbar(true);
//       setTimeout(() => {
//           window.location.reload();   
//       }, 4000);
//     } catch (err) {
//       if (err.response) {
//         setSnackbarMessage(err.response.data.message);
//       } else {
//         setSnackbarMessage('Failed to delete job');
//       }
//       setOpenSnackbar(true);
//     }
//   };

//   const handleCloseSnackbar = () => {
//     setOpenSnackbar(false);
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
//         {jobs.map(job => (
//           <Grid item xs={12} key={job._id}>
//             <Card sx={{ display: 'flex', flexDirection: 'row', padding: 2, boxShadow: 3, border: '2px solid black' }}>
//               <CardContent sx={{ flex: 1 }}>
//                 <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
//                   {/* Title */}
//                   <Typography variant="h6" sx={{ mb: 1 }}>
//                     {job.title}
//                   </Typography>
//                   {/* Budget */}
//                   <Typography variant="body1" sx={{ color: 'green', mb: 1 }}>
//                     Budget: {job.budget} PKR
//                   </Typography>
//                   {/* Description */}
//                   <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
//                     {job.description}
//                   </Typography>
//                   {/* Creation Date */}
//                   <Typography variant="body2" color="black" sx={{ mb: 1 }}>
//                     Created At: {new Date(job.createdAt).toLocaleDateString()}
//                   </Typography>
//                 </Box>
//               </CardContent>
//               <CardActions sx={{ alignSelf: 'flex-end' }}>
//                 <Button variant="contained" color="error" onClick={() => handleDelete(job._id)}>
//                   Delete
//                 </Button>
//               </CardActions>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//       <Snackbar
//         open={openSnackbar}
//         autoHideDuration={4000}
//         onClose={handleCloseSnackbar}
//         message={snackbarMessage}
//         anchorOrigin={{ vertical: 'top', horizontal: 'center' }} // Positioning the Snackbar
//       />
//     </>
//   );
// };

// export default MyTasks;








import React, { useState, useEffect } from 'react';
import {
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  CircularProgress,
  Snackbar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
} from '@mui/material';
import axios from 'axios';

const MyTasks = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [jobToDelete, setJobToDelete] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/fyp/getJobByUser', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setJobs(response.data.jobs);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch jobs');
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const confirmDelete = (id) => {
    setJobToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/fyp/deleteJob/${jobToDelete}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setJobs(jobs.filter((job) => job._id !== jobToDelete));
      setSnackbarMessage('Job deleted successfully');
      setOpenSnackbar(true);
      setDeleteDialogOpen(false);
    } catch (err) {
      if (err.response) {
        setSnackbarMessage(err.response.data.message);
      } else {
        setSnackbarMessage('Failed to delete job');
      }
      setOpenSnackbar(true);
    }
  };

  const handleCloseDialog = () => {
    setDeleteDialogOpen(false);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
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
        {jobs.map((job) => (
          <Grid item xs={12} key={job._id}>
            <Card sx={{ display: 'flex', flexDirection: 'row', padding: 2, boxShadow: 3, border: '2px solid black' }}>
              <CardContent sx={{ flex: 1 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                  {/* Title */}
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    {job.title}
                  </Typography>
                  {/* Budget */}
                  <Typography variant="body1" sx={{ color: 'green', mb: 1 }}>
                    Budget: {job.budget} PKR
                  </Typography>
                  {/* Description */}
                  <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                    {job.description}
                  </Typography>
                  {/* Creation Date */}
                  <Typography variant="body2" color="black" sx={{ mb: 1 }}>
                    Created At: {new Date(job.createdAt).toLocaleDateString()}
                  </Typography>
                </Box>
              </CardContent>
              <CardActions sx={{ alignSelf: 'flex-end' }}><>
                {(job.status !== 'complete' && job.status !== 'inprogress') &&
                  <Button variant="contained" color="error" onClick={() => confirmDelete(job._id)}>
                    Delete
                  </Button>
                }
                {(job.status === 'complete' || job.status === 'inprogress') &&
                  <Typography variant="body2" color="black" sx={{ mb: 1 }}>
                    Status: {job.status}
                  </Typography>
                }
              </>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      {/* Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this task? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      {/* Snackbar */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      />
    </>
  );
};

export default MyTasks;
