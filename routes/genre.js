const router = require("express").Router();
const { genreController } = require("../controllers");

router.get("/genre", genreController.getGenres);

module.exports = router;
