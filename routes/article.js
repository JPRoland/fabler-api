const router = require("express").Router();
const { articleController, authcontroller } = require("../controllers");

router.get(
  "/articles",
  authcontroller.authOptional,
  articleController.getArticles
);
router.get(
  "/articles/feed",
  authcontroller.requireAuth,
  articleController.getFeedArticles
);
router.get(
  "/articles/:slug",
  authcontroller.authOptional,
  articleController.getArticleBySlug
);

router.post(
  "/articles",
  authcontroller.requireAuth,
  articleController.createArticle
);
router.put(
  "/articles/:slug",
  authcontroller.requireAuth,
  articleController.updateArticle
);
router.delete(
  "/articles/:slug",
  authcontroller.requireAuth,
  articleController.deleteArticle
);
router.post(
  "/articles/:slug/comments",
  authcontroller.requireAuth,
  articleController.createArticleComment
);
router.get(
  "/articles/:slug/comments",
  authcontroller.authOptional,
  articleController.getArticleComments
);
router.delete(
  "/articles/:slug/comments",
  authcontroller.requireAuth,
  articleController.deleteArticleComment
);
router.post(
  "/articles/:slug/favorite",
  authcontroller.requireAuth,
  articleController.favoriteArticle
);
router.delete(
  "/articles/:slug/favorite",
  authcontroller.requireAuth,
  articleController.unfavoriteArticle
);

module.exports = router;
