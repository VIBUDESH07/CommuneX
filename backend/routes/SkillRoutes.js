const express=require('express');
const Skill=require('../controller/SkillController');
const router=express.Router();
router.post('/fetch-skill',Skill.getSkillsByCommunityAndArea);
module.exports = router;