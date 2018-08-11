const Tag = require("../models").Tag;

const getTags = async (req, res, next) => {
  try {
    const tags = await Tag.findAll({ attributes: ["name"] });
    return res.json({ tags });
  } catch (error) {
    return next(error);
  }
};

module.exports = { getTags };
