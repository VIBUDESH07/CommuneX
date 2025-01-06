const user = require('../schemas/User'); // Assuming the schema is in models/skillModel.js


exports.getskills = async(req,res) => {
    const {email,skill}= req.body;
    try{
        const user = await user.findOne({email});
         
    }
}