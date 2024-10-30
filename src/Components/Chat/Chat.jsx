// components/Chat.js
// import React, { useState, useEffect } from 'react';
// import { io } from 'socket.io-client';
// import axios from 'axios';

// const socket = io('http://localhost:5000'); // Replace with your backend URL

// const Chat = ({ roomId, userId, token }) => {
//     const [message, setMessage] = useState('');
//     const [messages, setMessages] = useState([]);

//     // Fetch previous messages when roomId or token changes
//     useEffect(() => {
//         if (roomId && token) {
//             axios.get(`http://localhost:5000/fyp/getMessages/${roomId}`, {
//                 headers: { Authorization: `Bearer ${token}` }
//             })
//             .then((res) => setMessages(res.data.messages || [])) // Safely handle undefined data
//             .catch((error) => console.error("Failed to fetch messages:", error));
//         }
//     }, [roomId, token]);

//     // Listen for incoming messages and handle room joining
//     useEffect(() => {
//         if (roomId) {
//             socket.emit('joinRoom', roomId);
            
//             // Listen for new incoming messages
//             const receiveMessageHandler = (data) => {
//                 setMessages((prev) => [...prev, data]);
//             };
//             socket.on('receiveMessage', receiveMessageHandler);

//             // Clean up the listener on component unmount
//             return () => socket.off('receiveMessage', receiveMessageHandler);
//         }
//     }, [roomId]);

//     // Send a new message
//     const sendMessage = async () => {
//         if (message.trim()) {
//             const newMessage = { roomId, message, senderId: userId };
//             try {
//                 // Send message to backend
//                 await axios.post('http://localhost:5000/fyp/sendMessage', newMessage, {
//                     headers: { Authorization: `Bearer ${token}` }
//                 });
                
//                 // Emit message over Socket.IO
//                 socket.emit('sendMessage', newMessage);
                
//                 // Update local message list
//                 setMessages([...messages, newMessage]);
//                 setMessage('');
//             } catch (error) {
//                 console.error("Failed to send message:", error);
//             }
//         }
//     };

//     return (
//         <div className="chat-container">
//             <div className="messages">
//                 {messages.length > 0 ? (
//                     messages.map((msg, index) => (
//                         <div
//                             key={index}
//                             className={`message ${msg.senderId === userId ? 'sent' : 'received'}`}
//                         >
//                             {msg.message}
//                         </div>
//                     ))
//                 ) : (
//                     <p>No messages yet.</p>
//                 )}
//             </div>
//             <div className="input-container">
//                 <input
//                     type="text"
//                     value={message}
//                     onChange={(e) => setMessage(e.target.value)}
//                     placeholder="Type your message..."
//                 />
//                 <button onClick={sendMessage}>Send</button>
//             </div>
//         </div>
//     );
// };


const Chat = () => {
  return (<></>)
}
export default Chat;
