const router = require("express").Router();
const { profileController } = require("../controllers");

router.get("/profiles/:username", profileController.getProfile);
router.post("/profiles/:username/follow", profileController.follow);
router.delete("/profiles/:username/follow", profileController.unfollow);

module.exports = router;
