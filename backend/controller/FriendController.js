const User = require('../schemas/User'); 

exports.getFriends = async (req, res) => {
  const username = req.query.username; 
  if (!username) {
    return res.status(400).json({ error: 'Username (email) is required' });
  }

  try {
    const user = await User.findOne({ email: username }).populate(
      'friends',
      'username email profilePicture'
    );

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user.friends);
  } catch (error) {
    console.error('Error fetching friends:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.addFriend = async (req, res) => {
  const { username, friendEmail } = req.body; 

  if (!username || !friendEmail) {
    return res.status(400).json({ error: 'Both username and friendEmail are required' });
  }

  try {
    const user = await User.findOne({ email: username });
    const friend = await User.findOne({ email: friendEmail });

    if (!user || !friend) {
      return res.status(404).json({ error: 'User or friend not found' });
    }

    if (user.friends.includes(friend._id)) {
      return res.status(400).json({ error: 'Friend already added' });
    }

    user.friends.push(friend._id);
    await user.save();

    res.json({ message: 'Friend added successfully' });
  } catch (error) {
    console.error('Error adding friend:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
