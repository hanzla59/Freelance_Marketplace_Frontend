import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, Paper } from '@mui/material';

function ComplainsList() {
    const [complains, setComplains] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchComplains = async () => {
            try {
                const response = await axios.get('http://localhost:5000/fyp/getComplains', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setComplains(response.data.complains);
            } catch (error) {
                console.error('Error fetching complains:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchComplains();
    }, []);

    if (loading) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <Box>
            {complains.length > 0 ? (
                complains.map((complain) => (
                    <Paper
                        key={complain._id}
                        elevation={3}
                        sx={{
                            padding: 2,
                            margin: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            gap: 2,
                            borderRadius: 2,
                        }}
                    >
                        <Box display="flex" justifyContent="space-between">
                            <Typography variant="body1">ID: {complain._id}</Typography>
                            <Typography variant="body1">Against: {complain.against.username}</Typography>
                        </Box>
                        <Typography variant="body2" sx={{ marginTop: 1 }}>
                           Complain:  {complain.complain}
                        </Typography>
                        <Typography variant="body2" sx={{ marginTop: 1, fontStyle: 'italic' }}>
                            Response: {complain.response || 'No response yet'}
                        </Typography>
                        <Box display="flex" justifyContent="flex-end" mt={1}>
                            <Typography variant="subtitle2">Status: {complain.status}</Typography>
                        </Box>
                    </Paper>
                ))
            ) : (
                <Typography>No complains found.</Typography>
            )}
        </Box>
    );
}

export default ComplainsList;




