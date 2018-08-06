const router = require("express").Router();
const { userController } = require("../controllers");

router.get("/user", userController.getUser);

router.put("/user", userController.updateUser);

router.post("/user", userController.createUser);

router.post("/user/login");

module.exports = router;
