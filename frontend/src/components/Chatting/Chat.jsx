import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000'); // Replace with your server's address

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const { state } = useLocation();
  const { user, friendId } = state;
  const email = user.email;
  const receiveremail=friendId

  useEffect(() => {
    // Fetch messages immediately when the component mounts
    const fetchMessages = () => {
      socket.emit('fetchMessages', { email, friendId });
    };

    socket.on('connect', () => {
      console.log('Connected to socket server');
      fetchMessages();
    });

    // Listen for fetched messages from the server
    socket.on('messagesFetched', (data) => {
      const processedMessages = data.messages.map((msg) => {
        const { sender, receiver } = msg;
        const { content, timestamp } = msg._doc || {};
        return {
          sender,
          receiver,
          content,
          timestamp,
        };
      });

      const sortedMessages = processedMessages.sort((a, b) => {
        const timeA = new Date(a.timestamp || 0);
        const timeB = new Date(b.timestamp || 0);
        return timeA - timeB;
      });

      setMessages(sortedMessages);
    });

    // Listen for incoming new messages
    socket.on('newMessage', (message) => {
      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages, message].sort((a, b) => new Date(a.timestamp || 0) - new Date(b.timestamp || 0));
        return updatedMessages;
      });
    });

    // Cleanup on unmount
    return () => {
      socket.off('messagesFetched');
      socket.off('newMessage');
    };
  }, [email, friendId]);

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;

    const messageData = {
      senderEmail: email,
      receiverId: friendId,
      content: newMessage,
    };

    // Emit message to server
    socket.emit('sendMessage', messageData);

    // Add the message locally to the chat immediately
    const messageToAdd = {
      sender: email,
      receiver: friendId,
      content: newMessage,
      timestamp: new Date().toISOString(),
    };

    setMessages((prevMessages) => {
      const updatedMessages = [...prevMessages, messageToAdd].sort((a, b) => new Date(a.timestamp || 0) - new Date(b.timestamp || 0));
      return updatedMessages;
    });

    // Clear input after sending
    setNewMessage('');
  };

  return (
    <div className="chat-container">
      <h2>Chat with {friendId}</h2>
      <div className="messages-container">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.sender === email ? 'message-sent' : 'message-received'}`}
          >
            <p>{message.content}</p>
            <span className="timestamp">{new Date(message.timestamp).toLocaleTimeString()}</span>
          </div>
        ))}
      </div>
      <div className="message-input-container">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message"
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
