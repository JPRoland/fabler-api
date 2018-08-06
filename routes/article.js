const router = require("express").Router();
const { articleController } = require("../controllers");

router.get("/articles", articleController.getArticles);
router.get("/articles/feed", articleController.getFeedArticles);
router.get("/articles/:slug", articleController.getArticleBySlug);

router.post("/articles", articleController.createArticle);
router.put("/articles/:slug", articleController.updateArticle);
router.delete("/articles/:slug", articleController.deleteArticle);
router.post("/articles/:slug/comments", articleController.createArticleComment);
router.get("/articles/:slug/comments", articleController.getArticleComments);
router.delete(
  "/articles/:slug/comments",
  articleController.deleteArticleComment
);
router.post("/articles/:slug/favorite", articleController.favoriteArticle);
router.delete("/articles/:slug/favorite", articleController.unfavoriteArticle);

module.exports = router;
