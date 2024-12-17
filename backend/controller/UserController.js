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

    console.log(username)
    if (!username || !district || !taluk || !area || !pincode || !localCommunity) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

  
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update user details
    user.state = state || user.state;
    user.district = district || user.district;
    user.taluk = taluk || user.taluk;
    user.area = area || user.area;
    user.pincode = pincode || user.pincode;
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