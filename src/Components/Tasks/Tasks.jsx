import React, { useEffect, useState } from 'react';
import { Grid, CircularProgress, Typography } from '@mui/material';
import TaskCard from './TaskCard';
import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL;

const Tasks = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/fyp/jobs`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setJobs(response.data.jobs || []);
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
    <>
      <div style={{ fontSize: '18px', marginTop: '20px', marginBottom: '10px', backgroundColor: 'green', padding: '10px', fontFamily: 'sans-serif', color: 'white', maxWidth: '100%', borderRadius: '5px', textAlign: 'center', boxShadow: '1px 1px 5px gray' }}>
        Public Tasks Bids On These And Get Orders From Clients
      </div>
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
              buyerId={job.buyer || ''}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Tasks;
