import React, { useState, useEffect } from 'react';
import DashboardComponent from './DashboardComponent';
import axios from 'axios';

export default function Analytics() {
    const [users, setUsers] = useState({}); // Initialize with an empty object
    const [task, setTask] = useState({});
    const [service, setService] = useState({});
    useEffect(() => {
        // Fetch users data
        axios.get('http://localhost:5000/fyp/admin/getUsers')
            .then((res) => {
                console.log('Users API response:', res.data); // Debug log
                setUsers(res.data); // Set the response directly as the users state
            })
            .catch((err) => console.error('Error fetching users:', err));
    
        // Fetch task data
        axios.get('http://localhost:5000/fyp/admin/getJobs')
            .then((res) => {
                console.log('Tasks API response:', res.data); // Debug log
                setTask(res.data); // Adjust this based on your API response structure
            })
            .catch((err) => console.error('Error fetching tasks:', err));
    
        // Fetch services data
        axios.get('http://localhost:5000/fyp/admin/getServices')
            .then((res) => {
                console.log('Services API response:', res.data); // Debug log
                setService(res.data); // Adjust this based on your API response structure
            })
            .catch((err) => {
                console.error('Error fetching services:', err);
            });
    
    }, []); // Run once on component mount

    return (
        <>
        {/* Users Dashboard Component */}
        <DashboardComponent
            title='Total Users'
            content={users.total_Users || 0}
            detail={`${users.total_Sellers || 0} Seller & ${users.total_Buyers || 0} Buyer`}
            bgcolor='#3D0C11' // Light yellow background
            fgcolor='white'   // Dark text color
        />

        {/* Total Tasks */}
        <DashboardComponent
            title='Total Tasks'
            content={task.total_Jobs || 0}
            detail='Total Tasks Listed'
            bgcolor='#231123' // Light blue background
            fgcolor='#E8DB7D'   // Dark text color
        />

        {/* Active Tasks */}
        <DashboardComponent
            title='Active Tasks'
            content={task.inprogress_Jobs || 0}
            detail='Currently in progress'
            bgcolor='#003049' // Light grey background
            fgcolor='white'   // Dark text color
        />

        {/* Completed Tasks */}
        <DashboardComponent
            title='Completed Tasks'
            content={task.completed_Jobs || 0}
            detail='Finished tasks'
            bgcolor='yellow' // Light green background
            fgcolor='black'   // Dark text color
        />

        {/* Open Tasks */}
        <DashboardComponent
            title='Open Tasks'
            content={task.open_Jobs || 0}
            detail='Tasks currently open for bidding'
            fgcolor='white' // Light red background
            bgcolor='#254441'   // Dark text color
        />

        {/* Closed Tasks */}
        <DashboardComponent
            title='Closed Tasks'
            content={task.cancelled_Jobs || 0}
            detail='Tasks that have been cancelled or closed'
            bgcolor='#F5B041' // Light orange background
            fgcolor='#351431'   // Dark text color
        />

        {/* Banned Users */}
        <DashboardComponent
            title='Banned Users'
            content={users.total_banned || 0}
            detail={`Total ${users.total_banned || 0} users are banned`}
            bgcolor='#F2F4F3' // Light lavender background
            fgcolor='#49111C'   // Dark text color
        />

        {/* Total Complaints */}
        <DashboardComponent
            title='Total Complaints'
            content={task.total_Complains || 0}
            detail='Complaints received from users'
            bgcolor='#FCF3CF' // Light cream background
            fgcolor='black'   // Dark text color
        />

        {/* Total Services */}
        <DashboardComponent
            title='Total Services'
            content={service.total_Services || 0}
            detail='Total services listed'
            bgcolor='#AED6F1' // Light sky blue background
            fgcolor='black'   // Dark text color
        />

        {/* Total Service Orders */}
        <DashboardComponent
            title='Total Service Orders'
            content={service.total_ServiceOrders || 0}
            detail='Total orders placed on services'
            bgcolor='#CEC3B8' // Light purple background
            fgcolor='black'   // Dark text color
        />
    </>
    );
}
