const router = require("express").Router();
const { profileController, authcontroller } = require("../controllers");

router.get(
  "/profiles/:username",
  authcontroller.authOptional,
  profileController.getProfile
);
router.post(
  "/profiles/:username/follow",
  authcontroller.requireAuth,
  profileController.follow
);
router.delete(
  "/profiles/:username/follow",
  authcontroller.requireAuth,
  profileController.unfollow
);

module.exports = router;
