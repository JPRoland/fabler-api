const { Article, User, Tag, Comment } = require("../models");
const assignDefined = require("../helpers/assignDefined");

const getArticles = async (req, res, next) => {
  // TODO get articles favorited by user
  const { tag, author, favorited, offset = 0, limit = 20 } = req.query;

  try {
    let tagWhere, authorWhere, favoritedWhere;
    if (tag) {
      tagWhere = { name: tag };
    }
    if (author) {
      authorWhere = { username: author };
    }

    const articles = await Article.findAll({
      include: [
        {
          model: Tag,
          attributes: ["name"],
          where: tagWhere,
          through: { attributes: [] }
        },
        {
          model: User,
          as: "Author",
          where: authorWhere
        }
      ],
      limit,
      offset,
      order: [["createdAt", "DESC"]]
    });

    const response = [];
    for (let article of articles) {
      result.push(await article.buildResponse(req.user));
    }

    return res.json({ articles: response, articlesCount: result.length });
  } catch (error) {
    return next(error);
  }
};

const getFeedArticles = async (req, res, next) => {
  const { limit = 20, offset = 0 } = req.query;

  try {
    const user = await User.findById(req.user.id, {
      include: [
        {
          model: User,
          as: "Followed"
        }
      ]
    });

    const followedIds = user.Followed.map(f => f.id);

    const articles = await Article.findAll({
      where: { AuthorId: followedIds },
      include: { model: User, as: "Author" },
      limit,
      offset
    });

    const response = [];
    for (let article of articles) {
      result.push(await article.buildResponse(req.user));
    }

    res.json({ articles: response, articlesCount: result.length });
  } catch (error) {
    return next(error);
  }
};

const getArticleBySlug = async (req, res, next) => {
  const { slug } = req.params;

  try {
    const article = await Article.findOne({
      where: { slug },
      include: [
        { model: Tag, attributes: ["name"], through: { attributes: [] } },
        { model: User, as: "Author" }
      ]
    });

    let response = await article.buildResponse(req.user);

    return res.json({ article: response });
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

    await builtArticle.addTags(tags);
    await builtArticle.setAuthor(user);

    return res.json({ article: builtArticle });
  } catch (error) {
    return next(error);
  }
};

const updateArticle = async (req, res, next) => {
  const { slug } = req.params;
  const updates = assignDefined({}, req.body);

  try {
    const article = await Article.findOne({ where: { slug } });
    if (article.AuthorId !== req.user.id) {
      return res.sendStatus(403);
    }

    await article.update(updates, { returning: true });

    return res.json({ article });
  } catch (error) {
    return next(error);
  }
};

const deleteArticle = async (req, res, next) => {
  const { slug } = req.params;

  try {
    const article = await Article.findOne({ where: { slug } });

    if (article.AuthorId !== req.user.id) {
      return res.sendStatus(403);
    }

    await article.destroy();

    return res.sendStatus(204);
  } catch (error) {
    return next(error);
  }
};

const favoriteArticle = async (req, res, next) => {
  const { slug } = req.params;

  try {
    const article = await Article.findOne({
      where: { slug },
      include: [{ model: User, as: "Author" }]
    });
    const user = await User.findById(req.user.id);

    await user.setFavorited(article);
    await article.setFavoriter(user);
    await article.increment("favoriteCount");

    let response = await article.buildResponse(req.user.id);

    return res.json({ article: response });
  } catch (error) {
    return next(error);
  }
};

const unfavoriteArticle = async (req, res, next) => {
  const { slug } = req.params;

  try {
    const article = await Article.findOne({
      where: { slug },
      include: [{ model: User, as: "Author" }]
    });
    const user = await User.findById(req.user.id);

    await user.removeFavorited(article);
    await article.removeFavoriter(user);
    await article.decrement("favoriteCount");

    let response = await article.buildResponse(req.user.id);

    return res.json({ article: response });
  } catch (error) {
    return next(error);
  }
};

const createArticleComment = async (req, res, next) => {
  const { slug } = req.params;
  const { comment } = req.body;

  try {
    const article = await Article.findOne({ where: { slug } });
    const createdComment = await Comment.create({
      body: comment.body,
      UserId: req.user.id,
      ArticleId: article.id
    });

    await createdComment.reload({ include: "User" });
    const responseBody = await createdComment.buildResponse(req.user);
    return res.json({ comment: responseBody });
  } catch (error) {
    return next(error);
  }
};

const getArticleComments = async (req, res, next) => {
  const { slug } = req.params;

  try {
    const article = await Article.findOne({
      where: { slug }
    });
    const comments = await article.getComments({ include: "User" });

    const response = [];

    for (let comment of comments) {
      response.push(await comment.buildResponse(req.user));
    }

    return res.json({ comments: response });
  } catch (error) {
    return next(error);
  }
};

const deleteArticleComment = async (req, res, next) => {
  const { id } = req.params;

  try {
    const comment = await Comment.findById(id);

    if (comment.UserId !== req.user.id) {
      return res.sendStatus(403);
    }

    await comment.destroy();

    return res.sendStatus(204);
  } catch (error) {
    return next(error);
  }
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
