const Genre = require("../models").Genre;

const getGenres = async (req, res, next) => {
  try {
    const genres = await Genre.findAll({ attributes: ["name"] });
    return res.json({ genres });
  } catch (error) {
    return next(error);
  }
};

module.exports = { getGenres };
