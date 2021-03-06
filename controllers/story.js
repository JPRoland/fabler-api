const { Story, User, Tag, Comment, Favorite, Genre } = require("../models");
const assignDefined = require("../helpers/assignDefined");

const getStories = async (req, res, next) => {
  const { tag, author, favorited, genre, offset = 0, limit = 20 } = req.query;

  try {
    let tagWhere, authorWhere, favoritedWhere, genreWhere;
    if (tag) {
      tagWhere = { name: tag };
    }
    if (author) {
      authorWhere = { username: author };
    }
    if (favorited) {
      favoritedWhere = { username: favorited };
    }

    if (genre) {
      genreWhere = { name: genre };
    }

    const stories = await Story.findAll({
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
        },
        {
          model: User,
          as: "Favorited",
          where: favoritedWhere,
          through: { attributes: [] }
        },
        {
          model: Genre,
          attributes: ["name"],
          where: genreWhere,
          through: { attributes: [] }
        }
      ],
      limit,
      offset,
      order: [["createdAt", "DESC"]]
    });

    const response = [];
    for (let story of stories) {
      response.push(await story.buildResponse(req.user));
    }

    return res.json({ stories: response, storiesCount: response.length });
  } catch (error) {
    return next(error);
  }
};

const getFeedStories = async (req, res, next) => {
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

    const stories = await Story.findAll({
      where: { AuthorId: followedIds },
      include: { model: User, as: "Author" },
      limit,
      offset
    });

    const response = [];
    for (let story of stories) {
      response.push(await story.buildResponse(req.user));
    }

    res.json({ stories: response, storiesCount: response.length });
  } catch (error) {
    return next(error);
  }
};

const getStoryBySlug = async (req, res, next) => {
  const { slug } = req.params;

  try {
    const story = await Story.findOne({
      where: { slug },
      include: [
        { model: Tag, attributes: ["name"], through: { attributes: [] } },
        { model: User, as: "Author" },
        { model: Genre, attributes: ["name"], through: { attributes: [] } }
      ]
    });

    let response = await story.buildResponse(req.user);

    return res.json({ story: response });
  } catch (error) {
    return next(error);
  }
};

const createStory = async (req, res, next) => {
  const { story } = req.body;

  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.sendStatus(401);
    }

    let builtStory = await Story.create({
      title: story.title,
      body: story.body,
      description: story.description
    });

    let tags = [];

    for (let tag of story.tags) {
      const tagInstance = await Tag.findCreateFind({
        where: { name: tag.name.toLowerCase() }
      });
      tags.push(tagInstance[0]);
    }

    let genres = [];
    for (let genre of story.genres) {
      const genreInstance = await Genre.findCreateFind({
        where: { name: genre.name }
      });
      genres.push(genreInstance[0]);
    }

    await builtStory.addGenres(genres);
    await builtStory.addTags(tags);
    await builtStory.setAuthor(user);

    return res.json({ story: builtStory });
  } catch (error) {
    return next(error);
  }
};

const updateStory = async (req, res, next) => {
  const { slug } = req.params;
  const updates = assignDefined({}, req.body);

  try {
    const story = await Story.findOne({ where: { slug } });
    if (story.AuthorId !== req.user.id) {
      return res.sendStatus(403);
    }

    await story.update(updates, { returning: true });

    return res.json({ story });
  } catch (error) {
    return next(error);
  }
};

const deleteStory = async (req, res, next) => {
  const { slug } = req.params;

  try {
    const story = await Story.findOne({ where: { slug } });

    if (story.AuthorId !== req.user.id) {
      return res.sendStatus(403);
    }

    await story.destroy();

    return res.sendStatus(204);
  } catch (error) {
    return next(error);
  }
};

const favoriteStory = async (req, res, next) => {
  const { slug } = req.params;

  try {
    const story = await Story.findOne({
      where: { slug },
      include: [{ model: User, as: "Author" }]
    });
    const user = await User.findById(req.user.id);

    await Favorite.create({
      UserId: user.id,
      StoryId: story.id
    });

    await story.increment("favoriteCount");

    let response = await story.buildResponse(req.user.id);

    return res.json({ story: response });
  } catch (error) {
    return next(error);
  }
};

const unfavoriteStory = async (req, res, next) => {
  const { slug } = req.params;

  try {
    const story = await Story.findOne({
      where: { slug },
      include: [{ model: User, as: "Author" }]
    });
    const user = await User.findById(req.user.id);

    await Favorite.destroy({
      where: { UserId: user.id, StoryId: story.id }
    });
    await story.decrement("favoriteCount");

    let response = await story.buildResponse(req.user.id);

    return res.json({ story: response });
  } catch (error) {
    return next(error);
  }
};

const createStoryComment = async (req, res, next) => {
  const { slug } = req.params;
  const { comment } = req.body;

  try {
    const story = await Story.findOne({ where: { slug } });
    const createdComment = await Comment.create({
      body: comment.body,
      UserId: req.user.id,
      StoryId: story.id
    });

    await createdComment.reload({ include: "User" });
    const responseBody = await createdComment.buildResponse(req.user);
    return res.json({ comment: responseBody });
  } catch (error) {
    return next(error);
  }
};

const getStoryComments = async (req, res, next) => {
  const { slug } = req.params;

  try {
    const story = await Story.findOne({
      where: { slug }
    });
    const comments = await story.getComments({ include: "User" });

    const response = [];

    for (let comment of comments) {
      response.push(await comment.buildResponse(req.user));
    }

    return res.json({ comments: response });
  } catch (error) {
    return next(error);
  }
};

const deleteStoryComment = async (req, res, next) => {
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
  getStories,
  getStoryBySlug,
  getStoryComments,
  createStory,
  updateStory,
  deleteStory,
  createStoryComment,
  deleteStoryComment,
  favoriteStory,
  unfavoriteStory,
  getFeedStories
};
