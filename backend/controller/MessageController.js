const Message = require('../schemas/Message');

// Fetch messages between a user and a friend
const fetchMessages = async (req, res) => {
  const { email, friendId } = req.query;

  if (!email || !friendId) {
    return res.status(400).json({ error: 'Email and friendId are required' });
  }

  try {
    const messages = await Message.find({
      $or: [
        { senderEmail: email, receiverId: friendId },
        { senderEmail: friendId, receiverId: email },
      ],
    }).sort({ timestamp: 1 });
    res.json({ messages });
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Send a new message
const sendMessage = async (req, res) => {
  const { senderEmail, receiverId, content } = req.body;

  if (!senderEmail || !receiverId || !content) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const message = new Message({ senderEmail, receiverId, content });
    await message.save();
    res.status(201).json({ message });
  } catch (error) {
    console.error('Error saving message:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  fetchMessages,
  sendMessage,
};
