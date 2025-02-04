const express=require('express');
const Skill=require('../controller/SkillController');
const router=express.Router();
router.post('/fetch-skill',Skill.getSkillsByCommunityAndArea);
router.post('/post-skill',Skill.postSkillRequest);
router.post('/fetch-pending-skills',Skill.getFilteredSkillRequests)
router.post("/update-status", Skill.updateSkillRequestStatus);
module.exports = router;