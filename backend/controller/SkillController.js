const SkillRequest = require("../schemas/Skill_Request");
const User = require("../schemas/User")
// ✅ API: Update Skill Request Status (Accept/Reject)
exports.updateSkillRequestStatus = async (req, res) => {
    const { requestId, newStatus } = req.body;

    try {
        const skillRequest = await SkillRequest.findById(requestId);

        if (!skillRequest) {
            return res.status(404).json({ message: "Skill request not found" });
        }

        // Update the status field
        skillRequest.status = newStatus;
        await skillRequest.save();

        return res.status(200).json({ message: `Skill request ${newStatus}`, data: skillRequest });

    } catch (error) {
        console.error("Error updating skill request status:", error);
        return res.status(500).json({ message: "Server error" });
    }
};

// ✅ API: Fetch Skill Requests where the receiver's skills match the skillName & status is pending/rejected
exports.getFilteredSkillRequests = async (req, res) => {
    const { email } = req.body;
    console.log(email)
    try {
        // Find the user based on the email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Get the skills of the user
        const userSkills = user.skills; // Assuming skills are stored as an array
        console.log(userSkills)
        // Find skill requests where skillName is in the user's skills and status is pending or rejected
        const skillRequests = await SkillRequest.find({
            skillName: { $in: userSkills },
            status: { $in: ["pending", "rejected"] },
        });

        if (skillRequests.length === 0) {
            return res.status(404).json({ message: "No matching skill requests found" });
        }

        // Fetch details of users who made the requests
        const skillRequestsWithUserDetails = await Promise.all(
            skillRequests.map(async (request) => {
                const requester = await User.findOne({ email: request.email }, "email name address localCommunity");
                return {
                    ...request.toObject(),
                    requesterDetails: requester || null, // Add user details (if found)
                };
            })
        );

        return res.status(200).json({ message: "Filtered skill requests found", data: skillRequestsWithUserDetails });

    } catch (error) {
        console.error("Error fetching filtered skill requests:", error);
        return res.status(500).json({ message: "Server error" });
    }
};

exports.postSkillRequest = async (req, res) => {
    try {
        const { email, problemDetails, neededDate, skillName } = req.body;
        console.log(email,problemDetails,neededDate,skillName)
        // Validate input
        if (!email || !problemDetails || !neededDate || !skillName) {
            return res.status(400).json({ message: "All fields are required!" });
        }

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found!" });
        }

        // Create a new skill request
        const newSkillRequest = new SkillRequest({
            email,
            problemDetails,
            neededDate,
            skillName,
            status: "pending", // Default status
            receiver: null // No receiver initially
        });

        // Save the request to the database
        await newSkillRequest.save();

        return res.status(201).json({
            message: "Skill request posted successfully!",
            skillRequest: newSkillRequest
        });
    } catch (error) {
        console.error("Error posting skill request:", error);
        return res.status(500).json({ message: "Server error" });
    }
};

exports.getSkillsByCommunityAndArea = async (req, res) => {
    const { email, skill } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const { localCommunity, address } = user; // Extract localCommunity and address from the user

        if (!localCommunity || !address) {
            return res.status(400).json({ message: 'User does not have sufficient details for filtering' });
        }

        const matchingUsers = await User.find({ skills: skill })
            .sort({ localCommunity: 1, "address": 1 }); // Sort by community and address
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
