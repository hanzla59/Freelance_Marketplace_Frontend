// import React, { useState, useEffect, useRef } from 'react';
// import axios from 'axios';
// import io from 'socket.io-client';

// const Chat = () => {
//   const [rooms, setRooms] = useState([]); // Store rooms
//   const [messages, setMessages] = useState([]); // Store messages of the selected room
//   const [newMessage, setNewMessage] = useState(""); // Message to be sent
//   const [selectedRoom, setSelectedRoom] = useState(null); // Currently selected room
//   const socketRef = useRef(null); // To hold the socket connection
//   const messagesEndRef = useRef(null); // To scroll to the latest message

//   // Fetch rooms when component mounts
//   useEffect(() => {
//     const userId = localStorage.getItem('userId');
//     if (userId) {
//       // Fetch rooms for the current user from backend
//       axios.get(`http://localhost:5000/fyp/rooms/${userId}`)
//         .then((response) => {
//           setRooms(response.data); // Store rooms in state
//         })
//         .catch((error) => {
//           console.error('Error fetching rooms:', error);
//         });
//     }
//   }, []);

//   // Connect to socket.io and handle events
//   useEffect(() => {
//     socketRef.current = io('http://localhost:5000'); // Connect to the backend socket

//     socketRef.current.on('receiveMessage', (message) => {
//       if (selectedRoom && message.roomId === selectedRoom) {
//         setMessages((prevMessages) => [...prevMessages, message]); // Append received message
//       }
//     });

//     return () => {
//       if (socketRef.current) {
//         socketRef.current.disconnect();
//       }
//     };
//   }, [selectedRoom]);

//   // Scroll to the latest message when messages are updated
//   useEffect(() => {
//     if (messagesEndRef.current) {
//       messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
//     }
//   }, [messages]); // Trigger when messages state changes

//   // Handle room selection
//   const selectRoom = (roomId, receiverName) => {
//     setSelectedRoom(roomId);

//     // Fetch messages of the selected room
//     axios.get(`http://localhost:5000/fyp/messages/${roomId}`)
//       .then((response) => {
//         setMessages(response.data.messages || []); // Ensure messages is always an array
//       })
//       .catch((error) => {
//         console.error('Error fetching messages:', error);
//       });

//     // Join the selected room in socket
//     socketRef.current.emit('joinRoom', { roomId, userId: localStorage.getItem('userId') });
//   };

//   // Handle sending message
//   const sendMessage = () => {
//     if (!newMessage.trim()) return; // Prevent sending empty messages

//     const message = {
//       senderId: localStorage.getItem('userId'),
//       message: newMessage,
//       roomId: selectedRoom,
//     };

//     // Emit the message to the socket
//     socketRef.current.emit('sendMessage', message);

//     // Save the message in the database by sending it to the backend
//     axios.post('http://localhost:5000/fyp/sendMessage', message, {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem('token')}`,
//       },
//     })
//       .then((response) => {
//         setMessages((prevMessages) => [...prevMessages, response.data.message]); // Update local messages
//         setNewMessage(''); // Clear the input field
//       })
//       .catch((error) => {
//         console.error('Error sending message:', error);
//       });
//   };

//   return (
//     <div style={{ display: 'flex', height: '100vh' }}>
//       {/* Room List on the left (20% of the screen) */}
//       <div style={{ width: '20%', backgroundColor: '#f0f0f0', padding: '10px' }}>
//         <h3>Rooms</h3>
//         <ul style={{ listStyleType: 'none', padding: 0 }}>
//           {rooms.map((room) => {
//             // Assuming room object has user1 and user2 as properties
//             const userId = localStorage.getItem('userId');
//             const otherUser = userId === room.user1._id ? room.user2.username : room.user1.username; // Get the other user

//             return (
//               <li
//                 key={room._id}
//                 style={{
//                   padding: '10px',
//                   backgroundColor: selectedRoom === room._id ? '#ccc' : '#fff',
//                   cursor: 'pointer',
//                   marginBottom: '5px',
//                 }}
//                 onClick={() => selectRoom(room._id, otherUser.username)}
//               >
//                 {otherUser}
//               </li>
//             );
//           })}
//         </ul>
//       </div>


//       <div style={{ width: '80%', padding: '20px', display: 'flex', flexDirection: 'column' }}>
//         {selectedRoom ? (
//           <>
//             <div style={{ flexGrow: 1, overflowY: 'scroll', marginBottom: '20px' }}>
//               <h3>Messages</h3>
//               <div style={{ maxHeight: '400px', overflowY: 'scroll' }}>
//                 {Array.isArray(messages) && messages.length > 0 ? (
//                   messages.map((msg, index) => (
//                     <div
//                       key={index}
//                       style={{
//                         display: 'flex',
//                         justifyContent: msg.sender === localStorage.getItem('userId') ? 'flex-end' : 'flex-start', 
//                         marginBottom: '10px',
//                       }}
//                     >
//                       <div
//                         style={{
//                           padding: '10px',
//                           borderRadius: '10px',
//                           backgroundColor: msg.sender === localStorage.getItem('userId') ? '#0078D4' : '#D3D3D3',
//                           color: msg.sender === localStorage.getItem('userId') ? '#fff' : '#000',
//                           maxWidth: '60%',
//                         }}
//                       >
//                         <strong>{msg.sender === localStorage.getItem('userId') ? 'You' : 'Other User'}:</strong>
//                         <p>{msg.message}</p>
//                         <small>{new Date(msg.timestamp).toLocaleTimeString()}</small>
//                       </div>
//                     </div>
//                   ))
//                 ) : (
//                   <p>No messages yet</p>
//                 )}
//               </div>
//             </div>

//             <div style={{ display: 'flex', alignItems: 'center' }}>
//               <input
//                 type="text"
//                 value={newMessage}
//                 onChange={(e) => setNewMessage(e.target.value)}
//                 style={{ flex: 1, padding: '10px', marginRight: '10px' }}
//                 placeholder="Type a message"
//               />
//               <button onClick={sendMessage} style={{ padding: '10px 20px' }}>Send</button>
//             </div>
//             {/* Scroll to the bottom of the messages */}
//             <div ref={messagesEndRef} />
//           </>
//         ) : (
//           <h3>Select a room to start chatting</h3>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Chat;













// import React, { useState, useEffect, useRef } from 'react';
// import { Box, Typography, Button, InputBase, Paper, Divider, List, ListItem, ListItemText } from '@mui/material';
// import axios from 'axios';
// import io from 'socket.io-client';

// const Chat = () => {
//   const [rooms, setRooms] = useState([]);
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState('');
//   const [selectedRoom, setSelectedRoom] = useState(null);
//   const [receiverName, setReceiverName] = useState('');
//   const socketRef = useRef(null);
//   const messagesEndRef = useRef(null);

//   useEffect(() => {
//     const userId = localStorage.getItem('userId');
//     if (userId) {
//       axios.get(`http://localhost:5000/fyp/rooms/${userId}`)
//         .then((response) => {
//           setRooms(response.data);
//         })
//         .catch((error) => console.error('Error fetching rooms:', error));
//     }
//   }, []);

//   useEffect(() => {
//     socketRef.current = io('http://localhost:5000');

//     socketRef.current.on('receiveMessage', (message) => {
//       if (selectedRoom && message.roomId === selectedRoom) {
//         setMessages((prevMessages) => [...prevMessages, message]);
//       }
//     });

//     return () => {
//       if (socketRef.current) socketRef.current.disconnect();
//     };
//   }, [selectedRoom]);

//   useEffect(() => {
//     if (messagesEndRef.current) {
//       messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
//     }
//   }, [messages]);

//   const selectRoom = (roomId, receiverName) => {
//     setSelectedRoom(roomId);
//     setReceiverName(receiverName);

//     axios.get(`http://localhost:5000/fyp/messages/${roomId}`)
//       .then((response) => setMessages(response.data.messages || []))
//       .catch((error) => console.error('Error fetching messages:', error));

//     socketRef.current.emit('joinRoom', { roomId, userId: localStorage.getItem('userId') });
//   };

//   const sendMessage = () => {
//     if (!newMessage.trim()) return;

//     const message = {
//       senderId: localStorage.getItem('userId'),
//       message: newMessage,
//       roomId: selectedRoom,
//     };

//     socketRef.current.emit('sendMessage', message);

//     axios.post('http://localhost:5000/fyp/sendMessage', message, {
//       headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
//     })
//       .then((response) => {
//         setMessages((prevMessages) => [...prevMessages, response.data.message]);
//         setNewMessage('');
//       })
//       .catch((error) => console.error('Error sending message:', error));
//   };

//   return (
//     <Box display="flex" height="100vh" sx={{ flexDirection: { xs: 'column', md: 'row' } }}>
//       <Box width={{ xs: '100%', md: '25%' }} bgcolor="#f5f5f5" p={2} sx={{ borderRight: { md: '1px solid #ddd' } }}>
//         <Typography variant="h6" gutterBottom>Rooms</Typography>
//         <List>
//           {rooms.map((room) => {
//             const userId = localStorage.getItem('userId');
//             const otherUser = userId === room.user1._id ? room.user2 : room.user1;

//             return (
//               <ListItem 
//                 button ={true} 
//                 key={room._id}
//                 onClick={() => selectRoom(room._id, otherUser.username)}
//                 selected={selectedRoom === room._id}
//                 sx={{ cursor: 'pointer', borderRadius: 2, mb: 1,  boxShadow: 3 }}
//               >
//                 <ListItemText primary={otherUser.username} />
//               </ListItem>
//             );
//           })}
//         </List>
//       </Box>

//       <Box width={{ xs: '100%', md: '75%' }} display="flex" flexDirection="column" p={2}>
//         {selectedRoom ? (
//           <>
//             <Typography variant="h6" gutterBottom>Chat with {receiverName}</Typography>
//             <Paper variant="outlined" sx={{ flexGrow: 1, overflowY: 'auto', p: 2, mb: 2, border: '1px solid black' }}>
//               {Array.isArray(messages) && messages.length > 0 ? (
//                 messages.map((msg, index) => (
//                   <Box
//                     key={index}
//                     display="flex"
//                     justifyContent={msg.sender === localStorage.getItem('userId') ? 'flex-end' : 'flex-start'}
//                     mb={2}
//                   >
//                     <Box
//                       px={2}
//                       py={1}
//                       borderRadius={2}
//                       bgcolor={msg.sender === localStorage.getItem('userId') ? 'green' : 'white'}
//                       color={msg.sender === localStorage.getItem('userId') ? '#fff' : '#000'}
//                       maxWidth="75%"
//                       boxShadow={4}
//                     >
//                       <Typography variant="body2" fontWeight="bold">
//                         {msg.sender === localStorage.getItem('userId') ? 'You' : receiverName}
//                       </Typography>
//                       <Typography variant="body2">{msg.message}</Typography>
//                       <Typography variant="caption" display="block" align="right">
//                         {new Date(msg.timestamp).toLocaleTimeString()}
//                       </Typography>
//                     </Box>
//                   </Box>
//                 ))
//               ) : (
//                 <Typography>No messages yet</Typography>
//               )}
//               <div ref={messagesEndRef} />
//             </Paper>

//             <Divider />

//             <Box display="flex" alignItems="center" mt={2}>
//               <InputBase
//                 fullWidth
//                 value={newMessage}
//                 onChange={(e) => setNewMessage(e.target.value)}
//                 placeholder="Type a message"
//                 sx={{ p: 1, borderRadius: 1, bgcolor: '#f5f5f5', boxShadow: 3, border: '1px solid black' }}
//               />
//               <Button variant="contained" color="primary" onClick={sendMessage} sx={{ ml: 1, backgroundColor: 'black', color: 'white', ":hover": { backgroundColor: 'green', color: 'white' }, boxShadow: 3 }}>
//                 Send
//               </Button>
//             </Box>
//           </>
//         ) : (
//           <Typography variant="h6" color="textSecondary" align="center">
//             Select a room to start chatting
//           </Typography>
//         )}
//       </Box>
//     </Box>
//   );
// };

// export default Chat;




import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, Button, InputBase, Paper, Divider, List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';
import io from 'socket.io-client';

const Chat = () => {
  const [rooms, setRooms] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [receiverName, setReceiverName] = useState('');
  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      axios.get(`http://localhost:5000/fyp/rooms/${userId}`)
        .then((response) => {
          setRooms(response.data || []); // Set empty array if no data
        })
        .catch((error) => console.error('Error fetching rooms:', error));
    }
  }, []);

  useEffect(() => {
    socketRef.current = io('http://localhost:5000');

    socketRef.current.on('receiveMessage', (message) => {
      if (selectedRoom && message.roomId === selectedRoom) {
        setMessages((prevMessages) => [...prevMessages, message]);
      }
    });

    return () => {
      if (socketRef.current) socketRef.current.disconnect();
    };
  }, [selectedRoom]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const selectRoom = (roomId, receiverName) => {
    setSelectedRoom(roomId);
    setReceiverName(receiverName || 'Unknown'); // Set default name if no receiverName

    axios.get(`http://localhost:5000/fyp/messages/${roomId}`)
      .then((response) => setMessages(response.data.messages || [])) // Ensure messages is an array
      .catch((error) => console.error('Error fetching messages:', error));

    socketRef.current.emit('joinRoom', { roomId, userId: localStorage.getItem('userId') });
  };

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const message = {
      senderId: localStorage.getItem('userId'),
      message: newMessage,
      roomId: selectedRoom,
    };

    socketRef.current.emit('sendMessage', message);

    axios.post('http://localhost:5000/fyp/sendMessage', message, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then((response) => {
        setMessages((prevMessages) => [...prevMessages, response.data.message]);
        setNewMessage('');
      })
      .catch((error) => console.error('Error sending message:', error));
  };

  return (
    <Box display="flex" height="100vh" sx={{ flexDirection: { xs: 'column', md: 'row' } }}>
      <Box width={{ xs: '100%', md: '25%' }} bgcolor="#f5f5f5" p={2} sx={{ borderRight: { md: '1px solid #ddd' } }}>
        <Typography variant="h6" gutterBottom>Rooms</Typography>
        <List>
          {rooms.map((room) => {
            const userId = localStorage.getItem('userId');
            const otherUser = room && (userId === room.user1?._id ? room.user2 : room.user1);
            const otherUserName = otherUser?.username || 'Unknown User'; // Fallback if username missing

            return (
              <ListItem 
                button 
                key={room._id}
                onClick={() => selectRoom(room._id, otherUserName)}
                selected={selectedRoom === room._id}
                sx={{ cursor: 'pointer', borderRadius: 2, mb: 1, boxShadow: 3 }}
              >
                <ListItemText primary={otherUserName} />
              </ListItem>
            );
          })}
        </List>
      </Box>

      <Box width={{ xs: '100%', md: '75%' }} display="flex" flexDirection="column" p={2}>
        {selectedRoom ? (
          <>
            <Typography variant="h6" gutterBottom>Chat with {receiverName}</Typography>
            <Paper variant="outlined" sx={{ flexGrow: 1, overflowY: 'auto', p: 2, mb: 2, border: '1px solid black' }}>
              {Array.isArray(messages) && messages.length > 0 ? (
                messages.map((msg, index) => (
                  <Box
                    key={index}
                    display="flex"
                    justifyContent={msg.sender === localStorage.getItem('userId') ? 'flex-end' : 'flex-start'}
                    mb={2}
                  >
                    <Box
                      px={2}
                      py={1}
                      borderRadius={2}
                      bgcolor={msg.sender === localStorage.getItem('userId') ? 'green' : 'white'}
                      color={msg.sender === localStorage.getItem('userId') ? '#fff' : '#000'}
                      maxWidth="75%"
                      boxShadow={4}
                    >
                      <Typography variant="body2" fontWeight="bold">
                        {msg.sender === localStorage.getItem('userId') ? 'You' : receiverName}
                      </Typography>
                      <Typography variant="body2">{msg.message || 'No message content'}</Typography>
                      <Typography variant="caption" display="block" align="right">
                        {msg.timestamp ? new Date(msg.timestamp).toLocaleTimeString() : 'Unknown time'}
                      </Typography>
                    </Box>
                  </Box>
                ))
              ) : (
                <Typography>No messages yet</Typography>
              )}
              <div ref={messagesEndRef} />
            </Paper>

            <Divider />

            <Box display="flex" alignItems="center" mt={2}>
              <InputBase
                fullWidth
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message"
                sx={{ p: 1, borderRadius: 1, bgcolor: '#f5f5f5', boxShadow: 3, border: '1px solid black' }}
              />
              <Button variant="contained" color="primary" onClick={sendMessage} sx={{ ml: 1, backgroundColor: 'black', color: 'white', ":hover": { backgroundColor: 'green', color: 'white' }, boxShadow: 3 }}>
                Send
              </Button>
            </Box>
          </>
        ) : (
          <Typography variant="h6" color="textSecondary" align="center">
            Select a room to start chatting
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default Chat;

