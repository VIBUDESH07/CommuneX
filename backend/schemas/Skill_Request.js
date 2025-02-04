const mongoose = require("mongoose");

const SkillRequestSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  skillName: {
    type: String,
    required: true
  },
  problemDetails: {
    type: String,
    required: true
  },
  neededDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending"
  },
  receiver: {
    type: String, // Email of the person accepting the request
    default: null
  }
}, { timestamps: true });

module.exports = mongoose.model("SkillRequest", SkillRequestSchema);
