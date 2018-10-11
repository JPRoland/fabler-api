const router = require("express").Router();
const { tagController } = require("../controllers");

router.get("/tags", tagController.getTags);

module.exports = router;
