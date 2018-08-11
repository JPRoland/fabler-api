const { Article, User, Tag } = require("../models");

const getArticles = async (req, res, next) => {
  // TODO
};
const getFeedArticles = async (req, res, next) => {
  // TODO
};

const getArticleBySlug = async (req, res, next) => {
  const { slug } = req.params;

  try {
    // TODO -Add favorite status and count, Add following status
    const article = await Article.findOne({
      where: { slug },
      include: [
        { model: Tag, attributes: ["name"], through: { attributes: [] } },
        { model: User, as: "Author", attributes: ["username", "bio", "image"] }
      ],
      attributes: { exclude: ["id", "AuthorId"] }
    });

    return res.json({ article });
  } catch (error) {
    return next(error);
  }
};

const createArticle = async (req, res, next) => {
  const { article } = req.body;

  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.sendStatus(401);
    }

    let builtArticle = await Article.create({
      title: article.title,
      body: article.body,
      description: article.description
    });

    let tags = [];

    for (let tag of article.tags) {
      const tagInstance = await Tag.findCreateFind({
        where: { name: tag.name }
      });
      tags.push(tagInstance[0]);
    }

    builtArticle.addTags(tags);
    builtArticle.setAuthor(user);

    // builtArticle = await builtArticle.save();

    return res.json({ article: builtArticle });
  } catch (error) {
    return next(error);
  }
};

const updateArticle = async (req, res, next) => {
  // TODO
};
const deleteArticle = async (req, res, next) => {
  // TODO
};
const favoriteArticle = async (req, res, next) => {
  // TODO
};
const unfavoriteArticle = async (req, res, next) => {
  // TODO
};
const createArticleComment = async (req, res, next) => {
  // TODO
};
const getArticleComments = async (req, res, next) => {
  // TODO
};
const deleteArticleComment = async (req, res, next) => {
  // TODO
};

module.exports = {
  getArticles,
  getArticleBySlug,
  getArticleComments,
  createArticle,
  updateArticle,
  deleteArticle,
  createArticleComment,
  deleteArticleComment,
  favoriteArticle,
  unfavoriteArticle,
  getFeedArticles
};
