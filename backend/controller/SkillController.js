const User = require('../schemas/User'); // Assuming the schema is in models/User.js

exports.getSkillsByCommunityAndArea = async (req, res) => {
    const { email, skill, community, area } = req.body;

    try {
        // Check if the user exists by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Find users with matching skills, community, and area
        const matchingUsers = await User.find({
            skills: skill, // Assuming `skills` is an array in the schema
            community: community,
            area: area,
        });

        // Return the list of matching users
        if (matchingUsers.length > 0) {
            return res.status(200).json({
                message: 'Matching users found',
                data: matchingUsers,
            });
        } else {
            return res.status(404).json({
                message: 'No matching users found',
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};
