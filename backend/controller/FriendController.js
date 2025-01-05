const User = require('../schemas/User');
const FriendRequest = require('../schemas/Friend');
const mongoose=require('mongoose')
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

exports.sendFriendRequest = async (req, res) => {
  const { fromEmail, toEmail } = req.body;

  if (!fromEmail || !toEmail) {
    return res.status(400).json({ error: 'Both sender and recipient emails are required' });
  }

  try {
    const fromUser = await User.findOne({ email: fromEmail });
    const toUser = await User.findOne({ email: toEmail });

    if (!fromUser || !toUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    const existingRequest = await FriendRequest.findOne({
      from: fromUser._id,
      to: toUser._id,
      status: 'pending',
    });

    if (existingRequest) {
      return res.status(400).json({ error: 'Friend request already sent' });
    }

    const friendRequest = new FriendRequest({
      from: fromUser._id,
      to: toUser._id,
    });
    await friendRequest.save();

    res.json({ message: 'Friend request sent successfully' });
  } catch (error) {
    console.error('Error sending friend request:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.respondToFriendRequest = async (req, res) => {
  const { requestId, responsed } = req.body;
  const response=responsed
  if (!requestId) {
    return res.status(400).json({ error: 'Invalid request or response' });
  }

  try {console.log(requestId,response)
    const friendRequest = await FriendRequest.findById(requestId).populate('from to');
    console.log(friendRequest)
    if (!friendRequest || friendRequest.status !== 'pending') {
      return res.status(404).json({ error: 'Friend request not found or already responded' });
    }

    friendRequest.status = response;
    await friendRequest.save();

    if (response === 'accept') {
      const { from, to } = friendRequest;

      from.friends.push({ friend: to._id, messages: [], tag: '' });
      to.friends.push({ friend: from._id, messages: [], tag: '' });

      await from.save();
      await to.save();

      return res.json({ message: 'Friend request accepted' });
    }

    res.json({ message: 'Friend request rejected' });
  } catch (error) {
    console.error('Error responding to friend request:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Fetch all pending requests for a user based on email

exports.getPendingRequests = async (req, res) => {
  const { email } = req.query;  // Get the email from the query parameters
  console.log(email);

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    // Fetch the user ID using the email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const userId = user._id;
    console.log(userId);
    const objectIdUserId = new mongoose.Types.ObjectId(userId);

    // Get all pending friend requests where the user is the receiver
    const pendingRequests = await FriendRequest.find({
      to: objectIdUserId,
      status: 'pending',
    });
    console.log(pendingRequests)
    // Fetch the sender details for each pending request
    const requestsWithSenderDetails = await Promise.all(
      pendingRequests.map(async (request) => {
        // Fetch sender details based on sender ID
        const sender = await User.findById(request.from);
        
        // Return the pending request along with sender details
        return {
          ...request.toObject(),
          sender: {
            username: sender.username,
            email: sender.email,
            skills:sender.skills,
            local:sender.localCommunity
          },
        };
      })
    );

    console.log(requestsWithSenderDetails);

    res.status(200).json({ requests: requestsWithSenderDetails });
  } catch (error) {
    console.error(error);
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
  