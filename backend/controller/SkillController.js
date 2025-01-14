const User = require('../schemas/User'); // Assuming the schema is in models/User.js

exports.getSkillsByCommunityAndArea = async (req, res) => {
    const { email, skill } = req.body;

    try {
        // Step 1: Fetch the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const { localCommunity, address } = user; // Extract localCommunity and address from the user

        if (!localCommunity || !address) {
            return res.status(400).json({ message: 'User does not have sufficient details for filtering' });
        }

        // Step 2: Fetch all users with matching skills
        const matchingUsers = await User.find({ skills: skill })
            .sort({ localCommunity: 1, "address": 1 }); // Sort by community and address

        console.log(matchingUsers);

        // Step 3: Return the list of matching users
        if (matchingUsers.length > 0) {
            return res.status(200).json({
                message: 'Matching users found',
                data: matchingUsers,
            });
        } else {
            return res.status(404).json({ message: 'No matching users found' });
        }
    } catch (error) {
        console.error('Error fetching users:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};
