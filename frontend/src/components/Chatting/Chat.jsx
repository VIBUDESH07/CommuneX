import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const { state } = useLocation();
  const { user, friendId } = state;

  const email = user.email;

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/message/getmessage?email=${email}&friendId=${friendId}`
        );

        // Process and merge the sender, receiver, content, and timestamp
        const processedMessages = response.data.messages.map((msg) => {
          const { sender, receiver } = msg;
          const { content, timestamp } = msg._doc || {};
          return {
            sender,
            receiver,
            content,
            timestamp,
          };
        });

        // Sort messages by timestamp
        const sortedMessages = processedMessages.sort((a, b) => {
          const timeA = new Date(a.timestamp || 0);
          const timeB = new Date(b.timestamp || 0);
          return timeA - timeB;
        });

        setMessages(sortedMessages);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, [email, friendId]);

  const handleSendMessage = async () => {
    if (newMessage.trim() === '') return;

    try {
      const response = await axios.post('http://localhost:5000/message/send', {
        senderEmail: email,
        receiverId: friendId,
        content: newMessage,
      });

      const newMsg = response.data.message._doc || response.data.message;
      setMessages((prevMessages) =>
        [...prevMessages, { ...newMsg, sender: email, receiver: friendId }].sort(
          (a, b) => new Date(a.timestamp || 0) - new Date(b.timestamp || 0)
        )
      );

      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="chat-container">
      <h2>Chat with {friendId}</h2>
      <div className="messages-container">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${
              message.sender === email ? 'message-sent' : 'message-received'
            }`}
          >
            <p>{message.content}</p>
            <span className="timestamp">
              {new Date(message.timestamp).toLocaleTimeString()}
            </span>
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
