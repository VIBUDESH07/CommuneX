const User = require('../schemas/User'); 
exports.getFriends = async (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ error: 'Email is required.' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    const friends = await User.find({ _id: { $in: user.friends.map(f => f.friend) } });

    const response = {
      user: user.toObject(),
      friends: friends.map(friend => friend.toObject()),
    };

    res.json(response);
  } catch (error) {
    console.error('Error fetching friends:', error);
    res.status(500).json({ error: 'Server error.' });
  }
};

exports.addFriend = async (req, res) => {
  const { username, friendEmail, tag } = req.body;

  if (!username || !friendEmail) {
    return res.status(400).json({ error: 'Both username and friendEmail are required' });
  }

  try {
    const user = await User.findOne({ email: username });
    const friend = await User.findOne({ email: friendEmail });

    if (!user || !friend) {
      return res.status(404).json({ error: 'User or friend not found' });
    }

    const isAlreadyFriend = user.friends.some(f => f.friend.toString() === friend._id.toString());
    if (isAlreadyFriend) {
      return res.status(400).json({ error: 'Friend already added' });
    }

    const isAlreadyInverseFriend = friend.friends.some(f => f.friend.toString() === user._id.toString());
    if (isAlreadyInverseFriend) {
      return res.status(400).json({ error: 'Friend already added in reverse relationship' });
    }

    user.friends.push({
      friend: friend._id,
      messages: [],
      tag: tag || '',
    });
    friend.friends.push({
      friend: user._id,
      messages: [],
      tag: '', 
    });
    await user.save();
    await friend.save();

    res.json({ message: 'Friend added successfully', friend: { id: friend._id, tag } });
  } catch (error) {
    console.error('Error adding friend:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getCommunityUsers = async (req, res) => {
    try {
      const { username } = req.query;
  
      // Find the current user
      const currentUser = await User.findOne({ email: username });
      if (!currentUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const users = await User.find({
        localCommunity: currentUser.localCommunity,
        _id: { $ne: currentUser._id, $nin: currentUser.friends },
      }).select('username email');
  
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching community users', error });
    }
  };
  exports.getAllUsers = async (req, res) => {
    const { username } = req.query; // Assuming username is passed as a query parameter
  
    if (!username) {
      return res.status(400).json({ error: 'Username is required.' });
    }
  
    try {
      const currentUser = await User.findOne({ email: username });
  
      if (!currentUser) {
        return res.status(404).json({ error: 'User not found.' });
      }
  
      const friendIds = currentUser.friends.map(friend => friend.friend);
  
      const users = await User.find(
        { 
          _id: { $nin: [currentUser._id, ...friendIds] } 
        }, 
        'username email localCommunity skills'
      );
  
      res.status(200).json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ message: 'Failed to retrieve users.' });
    }
  };
  