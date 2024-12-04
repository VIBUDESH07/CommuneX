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
