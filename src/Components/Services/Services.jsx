import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import ServiceCard from './ServiceCard';
import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL;

const Services = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    // Fetch services from backend
    const fetchServices = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/fyp/getServices`); // Replace with your actual backend URL
        setServices(response.data.services); // Set the fetched services data
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchServices();
  }, []);

  return (
    <>
    <div style={{ fontSize: '18px', marginTop: '20px', marginBottom: '10px', backgroundColor: 'green', padding: '10px', fontFamily: 'sans-serif', color: 'white', maxWidth: '100%', borderRadius: '5px', textAlign: 'center', boxShadow: '1px 1px 5px gray' }}>
        Public Services Buy Any Service from Service Provider
      </div>
   
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
      {services.map((service) => (
        <ServiceCard
          key={service._id}
          service={{
            id: service._id,
            image: service.images[0] || 'https://via.placeholder.com/240x300', // Fallback image if none provided
            title: service.title,
            location: service.location,
            price: service.price,
            totalOrders: service.orders,
            rating: service.rating,
          }}
        />
      ))}
    </Box>
    </>
  );
};

export default Services;
