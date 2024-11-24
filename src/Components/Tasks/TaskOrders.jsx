// import React, { useState, useEffect } from 'react';
// import { Grid, CircularProgress, Typography } from '@mui/material';
// import OrderCard from './OrderCard';
// import CompleteOrderDialog from './CompleteOrderDialog'; // Import the dialog component
// import axios from 'axios';

// const TaskOrders = () => {
//     const [orders, setOrders] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [selectedOrderId, setSelectedOrderId] = useState(null);
//     const [dialogOpen, setDialogOpen] = useState(false);

//     useEffect(() => {
//         const fetchOrders = async () => {
//             try {
//                 const response = await axios.get('http://localhost:5000/fyp/getJobOrders', {
//                     headers: {
//                         Authorization: `Bearer ${localStorage.getItem('token')}`,
//                     },
//                 });
//                 setOrders(response.data.orders);
//                 setLoading(false);
//             } catch (err) {
//                 setError('Failed to fetch orders');
//                 setLoading(false);
//             }
//         };

//         fetchOrders();
//     }, []);

//     if (loading) {
//         return <CircularProgress />;
//     }

//     if (error) {
//         return <p>{error}</p>;
//     }

//     const handleCancel = async (orderId) => {
//         try {
//             const response = await axios.put(
//                 `http://localhost:5000/fyp/cancelJobOrder/${orderId}`,
//                 {},
//                 {
//                     headers: {
//                         Authorization: `Bearer ${localStorage.getItem('token')}`,
//                     },
//                 }
//             );
//             alert(response.data.message);

//             setOrders((prevOrders) =>
//                 prevOrders.map((order) =>
//                     order._id === orderId ? { ...order, status: 'cancel' } : order
//                 )
//             );
//         } catch (err) {
//             alert('Failed to cancel the order.');
//         }
//     };

//     const handleCompleteClick = (orderId) => {
//         setSelectedOrderId(orderId);
//         setDialogOpen(true);
//     };

//     const handleDialogClose = () => {
//         setDialogOpen(false);
//         setSelectedOrderId(null);
//     };

//     const handleCompleteSuccess = (orderId) => {
//         setOrders((prevOrders) =>
//             prevOrders.map((order) =>
//                 order._id === orderId ? { ...order, status: 'completed' } : order
//             )
//         );
//     };

//     return (
//         <>
//         {orders.length === 0 && <Typography variant="h6">No orders found.</Typography>}    
//             <Grid container spacing={2}>
//                 {orders.map((order) => (
//                     <Grid item xs={12} key={order._id}>
//                         <OrderCard
//                             orderId={order._id}
//                             price={order.price}
//                             status={order.status}
//                             sellerName={order.seller.username}
//                             buyerName={order.buyer.username}
//                             creationDate={order.createdAt}
//                             work={order.work} 
//                             image={order.image} 
//                             video={order.video} 
//                             onCancel={() => handleCancel(order._id)}
//                             onComplete={() => handleCompleteClick(order._id)}
//                         />
//                     </Grid>
//                 ))}
//             </Grid>
//             {selectedOrderId && (
//                 <CompleteOrderDialog
//                     open={dialogOpen}
//                     onClose={handleDialogClose}
//                     orderId={selectedOrderId}
//                     onCompleteSuccess={handleCompleteSuccess}
//                 />
//             )}
//         </>
//     );
// };

// export default TaskOrders;








import React, { useState, useEffect } from 'react';
import { Grid, CircularProgress, Typography } from '@mui/material';
import OrderCard from './OrderCard';
import CompleteOrderDialog from './CompleteOrderDialog'; // Import the dialog component
import axios from 'axios';

const TaskOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('http://localhost:5000/fyp/getJobOrders', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                // Ensure response has expected structure
                setOrders(response.data.orders || []); 
            } catch (err) {
                setError('Failed to fetch orders');
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) {
        return <CircularProgress />;
    }

    if (error) {
        return <Typography color="error">{error}</Typography>;
    }

    const handleCancel = async (orderId) => {
        try {
            const response = await axios.put(
                `http://localhost:5000/fyp/cancelJobOrder/${orderId}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );
            alert(response.data.message);

            setOrders((prevOrders) =>
                prevOrders.map((order) =>
                    order._id === orderId ? { ...order, status: 'cancel' } : order
                )
            );
        } catch (err) {
            alert('Failed to cancel the order.');
        }
    };

    const handleCompleteClick = (orderId) => {
        setSelectedOrderId(orderId);
        setDialogOpen(true);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
        setSelectedOrderId(null);
    };

    const handleCompleteSuccess = (orderId) => {
        setOrders((prevOrders) =>
            prevOrders.map((order) =>
                order._id === orderId ? { ...order, status: 'completed' } : order
            )
        );
    };

    return (
        <>
            {orders.length === 0 && <Typography variant="h6">No orders found.</Typography>}
            <Grid container spacing={2}>
                {orders.map((order) => (
                    <Grid item xs={12} key={order._id}>
                        <OrderCard
                            orderId={order._id}
                            price={order.price || 'N/A'} // Fallback for missing price
                            status={order.status || 'unknown'} // Fallback for missing status
                            sellerName={(order.seller && order.seller.username) || 'Unknown Seller'}
                            buyerName={(order.buyer && order.buyer.username) || 'Unknown Buyer'}
                            creationDate={order.createdAt || 'N/A'} // Fallback for missing date
                            work={order.work || 'No work details provided'} // Fallback for missing work
                            image={order.image || ''} // Handle missing image
                            video={order.video || ''} // Handle missing video
                            buyerId={order.buyer._id}
                            onCancel={() => handleCancel(order._id)}
                            onComplete={() => handleCompleteClick(order._id)}
                        />
                    </Grid>
                ))}
            </Grid>
            {selectedOrderId && (
                <CompleteOrderDialog
                    open={dialogOpen}
                    onClose={handleDialogClose}
                    orderId={selectedOrderId}
                    onCompleteSuccess={handleCompleteSuccess}
                />
            )}
        </>
    );
};

export default TaskOrders;
