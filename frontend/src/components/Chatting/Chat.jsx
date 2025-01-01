import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const { state } = useLocation();
  const { user, friendId } = state;  // Get user and friend info from state

  const email = user.email;  // Use user's email for fetching messages

  useEffect(() => {
    // Fetch previous messages between the user and the selected friend
    const fetchMessages = async () => {
      try {
        console.log(email,friendId)
        const response = await axios.get(
          `http://localhost:5000/message/getmessage?email=${email}&friendId=${friendId}` 
        );
        setMessages(response.data.messages);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, [email, friendId]);

  const handleSendMessage = async () => {
    if (newMessage.trim() === '') return;

    try {
      const response = await axios.post(
        'http://localhost:5000/message/send',
        {
          senderEmail: email,  
          receiverId: friendId,  
          content: newMessage,
        }
      );
      setMessages([...messages, response.data.message]);
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="chat">
      <h2>Chat with {friendId}</h2>
      <div className="messages">
        {messages.map((message) => (
          <div key={message.id} className={`message ${message.senderEmail === email ? 'sent' : 'received'}`}>
            <p>{message.content}</p>
          </div>
        ))}
      </div>
      <div className="message-input">
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
