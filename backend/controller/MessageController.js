const User = require('../schemas/User');
const fetchMessages = async (req, res) => {
  const { email, friendId } = req.query;

  if (!email || !friendId) {
    return res.status(400).json({ error: 'Email and friendId are required' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    const friend = await User.findById(friendId);
    if (!friend) {
      return res.status(404).json({ error: 'Friend not found.' });
    }

    const userMessages = user.friends.find(f => f.friend.toString() === friendId)?.messages.map(msg => ({
      ...msg,
      sender: email,
      receiver: friend.email,
    })) || [];

    const friendMessages = friend.friends.find(f => f.friend.toString() === user._id.toString())?.messages.map(msg => ({
      ...msg,
      sender: friend.email,
      receiver: email,
    })) || [];

    const allMessages = [...userMessages, ...friendMessages].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

    res.json({ messages: allMessages });
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};


const sendMessage = async (req, res) => {
  const { senderEmail,   receiverId, content } = req.body;
  console.log(senderEmail,  receiverId)
 const friendId=  receiverId
  if (!senderEmail || !friendId || !content) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    const user = await User.findOne({ email: senderEmail });
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    const friend = user.friends.find(f => f.friend.toString() === friendId);
    if (!friend) {
      return res.status(404).json({ error: 'Friend not found in the user\'s friend list.' });
    }

    const timestamp = new Date();
    const message = { content, timestamp };

    friend.messages.push(message);
    await user.save();

    res.status(201).json({ message: 'Message sent successfully.', data: message });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

module.exports = {
  fetchMessages,
  sendMessage,
};
