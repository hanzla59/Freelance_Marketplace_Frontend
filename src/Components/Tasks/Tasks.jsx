import React, { useEffect, useState } from 'react';
import { Grid, CircularProgress } from '@mui/material';
import TaskCard from './TaskCard';
import axios from 'axios';

const Tasks = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/fyp/jobs', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setJobs(response.data.jobs || []); // Ensure jobs is an array
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch jobs');
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <Grid container spacing={2}>
      {jobs.map((job) => (
        <Grid item xs={12} key={job._id || Math.random()}>
          <TaskCard
            title={job.title || 'No Title Available'}
            description={job.description || 'No Description Available'}
            location={job.location || 'No Location Specified'}
            price={job.budget || 'N/A'}
            status={job.status || 'Unknown Status'}
            user={(job.buyer && job.buyer.username) || 'Anonymous'}
            jobId={job._id || ''}
            image={job.image || ''}
            video={job.video || ''}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default Tasks;
