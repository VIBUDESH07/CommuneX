import React, { useState } from 'react';

const FriendChat = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hey! How are you?', sender: 'Friend' },
    { id: 2, text: 'I\'m doing great! How about you?', sender: 'You' },
  ]);
  const [newMessage, setNewMessage] = useState('');

  // Function to handle sending new message
  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        { id: messages.length + 1, text: newMessage, sender: 'You' },
      ]);
      setNewMessage('');
    }
  };

  return (
    <div className="chat-container">
      <h2>Friend's Chat</h2>

      {/* Display chat messages */}
      <div className="messages">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`message ${message.sender === 'You' ? 'sent' : 'received'}`}
          >
            <span className="sender">{message.sender}: </span>
            <span className="text">{message.text}</span>
          </div>
        ))}
      </div>

      {/* Message input and send button */}
      <div className="message-input">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default FriendChat;
