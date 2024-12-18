const bcrypt = require('bcrypt');
const User = require('../schemas/User'); 

exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password ) {
      return res.status(400).json({ message: 'Username, email, password, and confirmPassword are required' });
    }

  
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error in signup:', error);
    res.status(500).json({ message: 'Server error, please try again later' });
  }
};


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;


    if (!email || !password) {
      return res.status(200).json({ message: 'Email and password are required' });
    }


    const user = await User.findOne({ email });


    if (!user) {
      return res.status(200).json({ message: 'User does not exist' });
    }


    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {

      res.status(200).json({ message: 'Welcome Back!' });
    } else {

      res.status(200).json({ message: 'Password Mismatched' });
    }
  } catch (error) {
    console.error('Error in login:', error);
    res.status(500).json({ message: 'Server Error, Please try again later' });
  }
};
exports.complete=async(req,res)=>{
  try {
    const {
      username,
      state,
      district,
      taluk,
      area,
      pincode,
      address,
      localCommunity,
      contactNumber,
      skills,
      profilePicture,
    } = req.body;
   const email=username;
    console.log(username)
    if (!username || !district || !taluk || !area || !pincode || !localCommunity) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

  
    const user = await User.findOne({ email});
    console.log(user)
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update user details
    user.address = address || user.address;
    user.localCommunity = localCommunity || user.localCommunity;
    user.contactNumber = contactNumber || user.contactNumber;
    user.skills = skills || user.skills;
    user.profilePicture = profilePicture || user.profilePicture;

    // Save the updated user document
    await user.save();

    res.status(200).json({ message: 'User details updated successfully', user });
  } catch (error) {
    console.error('Error during update:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

exports.check=async(req,res)=>{
  const { email } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const fieldsToCheck = [
      'localCommunity',
      'address',
      'contactNumber',
      'profilePicture',
      'skills',
    ];

    const incompleteFields = fieldsToCheck.filter((field) => {
      if (field === 'skills') {
        return !user[field] || user[field].length === 0;
      }
      return !user[field];
    });

    if (incompleteFields.length > 0) {
      return res.status(200).json({
        isComplete: false,
        message: 'Profile is incomplete',
        incompleteFields, 
      });
    }

    res.status(200).json({ isComplete: true, message: 'Profile is complete' });
  } catch (error) {
    console.error('Error checking profile completion:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}