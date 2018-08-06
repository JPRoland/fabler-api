const router = require("express").Router();
const { tagController } = require("../controllers");

router.get("/tag", tagController.getTags);

module.exports = router;
