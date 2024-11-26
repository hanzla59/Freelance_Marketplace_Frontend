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

