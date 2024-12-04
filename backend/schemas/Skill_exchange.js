const skillSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    skillsOffered: {
      type: [String],
      required: true,
    },
    skillsNeeded: {
      type: [String],
      required: true,
    },
    matchRequests: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Users who requested skill exchanges
    }],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });
  
  module.exports = mongoose.model('Skill', skillSchema);
  