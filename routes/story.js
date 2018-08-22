const router = require("express").Router();
const { storyController, authcontroller } = require("../controllers");

router.get(
  "/stories",
  authcontroller.authOptional,
  storyController.getStories
);
router.get(
  "/stories/feed",
  authcontroller.requireAuth,
  storyController.getFeedStories
);
router.get(
  "/stories/:slug",
  authcontroller.authOptional,
  storyController.getStoryBySlug
);

router.post(
  "/stories",
  authcontroller.requireAuth,
  storyController.createStory
);
router.put(
  "/stories/:slug",
  authcontroller.requireAuth,
  storyController.updateStory
);
router.delete(
  "/stories/:slug",
  authcontroller.requireAuth,
  storyController.deleteStory
);
router.post(
  "/stories/:slug/comments",
  authcontroller.requireAuth,
  storyController.createStoryComment
);
router.get(
  "/stories/:slug/comments",
  authcontroller.authOptional,
  storyController.getStoryComments
);
router.delete(
  "/stories/:slug/comments/:id",
  authcontroller.requireAuth,
  storyController.deleteStoryComment
);
router.post(
  "/stories/:slug/favorite",
  authcontroller.requireAuth,
  storyController.favoriteStory
);
router.delete(
  "/stories/:slug/favorite",
  authcontroller.requireAuth,
  storyController.unfavoriteStory
);

module.exports = router;
