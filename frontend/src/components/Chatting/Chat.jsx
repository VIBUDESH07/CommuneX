import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { io } from 'socket.io-client';
import NavChat from './NavChat';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const socketRef = useRef(null);
  const { state } = useLocation();
  const { user, friendId } = state;
  const email = user.email;

  const formatTimestamp = (timestamp) => {
    const messageDate = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    if (messageDate.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (messageDate.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
       return `${messageDate.getDate().toString().padStart(2, '0')}/${(messageDate.getMonth() + 1)
        .toString()
        .padStart(2, '0')}/${messageDate.getFullYear()}`;
    }
  };


   const isNewDate = (prevDate, currentDate) => {
    if (!prevDate) return true;
    return new Date(prevDate).toDateString() !== new Date(currentDate).toDateString();
  };

  useEffect(() => {
    socketRef.current = io('http://localhost:5000'); // Replace with your server's address

    socketRef.current.on('connect', () => {
      console.log('Connected to socket server');
    socketRef.current.emit('register', { email ,friendId});

       socketRef.current.emit('fetchMessages', { email, friendId });
    });

    socketRef.current.on('messagesFetched', (data) => {
      const processedMessages = data.messages.map((msg) => {
        const { content, timestamp } = msg._doc || msg;
        const { sender, receiver } = msg;
        return {
          sender,
          receiver,
          content,
          timestamp: timestamp || new Date().toISOString(),
        };
      });

      const sortedMessages = processedMessages.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
      setMessages(sortedMessages);
    });

      socketRef.current.on('newMessage', (message) => {
      const { content, timestamp } = message._doc || message;
      const { sender, receiver } = message;

      const newMessage = {
        sender,
        receiver,
        content,
        timestamp: timestamp || new Date().toISOString(),
      };

      setMessages((prevMessages) =>
        [...prevMessages, newMessage].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
      );
    });

    return () => {
      socketRef.current.disconnect();
      socketRef.current = null;
    };
  }, [email, friendId]);

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;

    const messageData = {
      senderEmail: email,
      receiverId: friendId,
      content: newMessage,
    };

    // Emit the message to the server
    socketRef.current.emit('sendMessage', messageData);

    // Add the message locally to the chat
    const messageToAdd = {
      sender: email,
      receiver: friendId,
      content: newMessage,
      timestamp: new Date().toISOString(),
    };

    setMessages((prevMessages) =>
      [...prevMessages, messageToAdd].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
    );
    setNewMessage(''); // Clear the input
  };

  return (
    <>
    <NavChat/>
    <div className="chat-container">
      <h2></h2>
      <div className="messages-container">
        {messages.map((message, index) => {
          const showDateHeader = isNewDate(
            messages[index - 1]?.timestamp,
            message.timestamp
          );

          return (
            <React.Fragment key={index}>
              {showDateHeader && (
                <div className="date-header">
                  {formatTimestamp(message.timestamp)}
                </div>
              )}
              <div
                className={`message ${message.sender === email ? 'message-sent' : 'message-received'}`}
              >
                <p>{message.content}</p>
                <span className="timestamp">
                  {new Date(message.timestamp).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
            </React.Fragment>
          );
        })}
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
    </>
  );
};

export default Chat;
