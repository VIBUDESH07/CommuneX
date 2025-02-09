/* import React, { useState, useEffect } from 'react';
import { collection, addDoc, query, orderBy, onSnapshot, Timestamp } from 'firebase/firestore';
import { db } from './firebaseConfig'; // Replace with your Firebase config file
import { UserCircle } from 'lucide-react';

interface Message {
  id: string;
  user: string;
  text: string;
  createdAt: Timestamp;
}

const CommunityChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');
  const [username, setUsername] = useState<string>('Anonymous');

  useEffect(() => {
    const messagesRef = collection(db, 'communityChat');
    const q = query(messagesRef, orderBy('createdAt', 'asc'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedMessages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Message[];
      setMessages(fetchedMessages);
    });

    return () => unsubscribe();
  }, []);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newMessage.trim() === '') return;

    await addDoc(collection(db, 'communityChat'), {
      user: username,
      text: newMessage,
      createdAt: Timestamp.now(),
    });

    setNewMessage('');
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="flex items-center justify-between bg-blue-600 text-white p-4">
        <h1 className="text-xl font-bold">Community Chat</h1>
        <div>
          <label className="mr-2">Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="rounded px-2 py-1 text-black"
            placeholder="Enter your name"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((message) => (
          <div key={message.id} className="mb-4">
            <div className="flex items-center">
              <UserCircle className="w-6 h-6 text-gray-600 mr-2" />
              <span className="font-bold">{message.user}</span>
              <span className="ml-2 text-sm text-gray-500">
                {new Date(message.createdAt?.toDate()).toLocaleTimeString()}
              </span>
            </div>
            <p className="ml-8 text-gray-800">{message.text}</p>
          </div>
        ))}
      </div>

      <form onSubmit={handleSendMessage} className="flex p-4 bg-white border-t">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 rounded-l px-4 py-2 border"
          placeholder="Type your message..."
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-r">
          Send
        </button>
      </form>
    </div>
  );
};

export default CommunityChat;
 */