const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

// Import routes
const userRoutes = require('./routes/UserRoutes'); 
const friendRoutes = require('./routes/FriendRoutes');
const messageRoutes = require('./routes/MessagesRoutes');

// Import User schema
const User = require('./schemas/User'); // Adjust the path

const app = express();
const server = http.createServer(app); // Create an HTTP server
const io = new Server(server, {
  cors: {
    origin: '*', // Allow all origins
    methods: ['GET', 'POST'],
  },
});

// Middleware
app.use(express.json());
app.use(cors());

// Register API routes
app.use('/api', userRoutes);
app.use('/fri', friendRoutes);
app.use('/message', messageRoutes); 

// MongoDB connection
mongoose
  .connect('mongodb://localhost:27017/community', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Socket.io setup
const userSocketMap = new Map(); // Map to store user email -> socket ID

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Register user with socket
  socket.on('register', ({ email }) => {
    if (email) {
      userSocketMap.set(email, socket.id);
      console.log(`User registered: ${email} -> Socket ID: ${socket.id}`);
    }
  });

  // Fetch messages
  socket.on('fetchMessages', async ({ email, friendId }) => {
    if (!email || !friendId) {
      return socket.emit('error', { error: 'Email and friendId are required.' });
    }

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return socket.emit('error', { error: 'User not found.' });
      }

      const friend = await User.findById(friendId);
      if (!friend) {
        return socket.emit('error', { error: 'Friend not found.' });
      }

      // Retrieve messages
      const userMessages =
        user.friends
          .find((f) => f.friend.toString() === friendId)
          ?.messages.map((msg) => ({
            ...msg,
            sender: email,
            receiver: friend.email,
          })) || [];

      const friendMessages =
        friend.friends
          .find((f) => f.friend.toString() === user._id.toString())
          ?.messages.map((msg) => ({
            ...msg,
            sender: friend.email,
            receiver: email,
          })) || [];

      const allMessages = [...userMessages, ...friendMessages].sort(
        (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
      );

      socket.emit('messagesFetched', { messages: allMessages });
    } catch (error) {
      console.error('Error fetching messages:', error);
      socket.emit('error', { error: 'Internal server error.' });
    }
  });

  // Send message
  socket.on('sendMessage', async ({ senderEmail, receiverId, content }) => {
    if (!senderEmail || !receiverId || !content) {
      return socket.emit('error', { error: 'All fields are required.' });
    }

    try {
      const user = await User.findOne({ email: senderEmail });
      if (!user) {
        return socket.emit('error', { error: 'User not found.' });
      }

      const friend = user.friends.find((f) => f.friend.toString() === receiverId);
      if (!friend) {
        return socket.emit('error', { error: 'Friend not found in the user\'s friend list.' });
      }

      // Create message
      const timestamp = new Date();
      const message = { content, timestamp };

      friend.messages.push(message);
      await user.save();

      // Notify sender and receiver
      socket.emit('messageSent', { message });
      const receiverSocketId = userSocketMap.get(receiverId);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit('newMessage', { message, senderEmail });
      }
    } catch (error) {
      console.error('Error sending message:', error);
      socket.emit('error', { error: 'Internal server error.' });
    }
  });

  // Handle user disconnection
  socket.on('disconnect', () => {
    for (const [email, socketId] of userSocketMap.entries()) {
      if (socketId === socket.id) {
        userSocketMap.delete(email);
        console.log(`User disconnected: ${email}`);
        break;
      }
    }
  });
});

// Start the server
const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
