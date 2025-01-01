const User = require('../schemas/User'); 

exports.getFriends = async (req, res) => {
        const { email } = req.query;
        console.log(email)
        if (!email) {
          return res.status(400).json({ error: 'Username is required.' });
        }
       
        try {
          const user = await User.findOne({ email });
          if (!user) {
            return res.status(404).json({ error: 'User not found.' });
          }
      
          // Fetch friend details (assuming friend IDs are stored in user.friends)
          const friends = await User.find({ _id: { $in: user.friends } });
      
          // Prepare the response with full details of both user and friends
          const response = {
            user: user.toObject(), // This will return all the user fields
            friends: friends.map(friend => friend.toObject()) // This will return all the fields of each friend
          };
      
          res.json(response);
        } catch (error) {
          console.error('Error fetching friends:', error);
          res.status(500).json({ error: 'Server error.' });
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
// In your friendController.js
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
    try {
      const users = await User.find({}, 'username email localCommunity skills'); // Include the desired fields
      res.status(200).json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ message: 'Failed to retrieve users.' });
    }
  };