const router = require("express").Router();
const { userController, authcontroller } = require("../controllers");

router.get("/user", authcontroller.requireAuth, userController.getUser);

router.put("/user", authcontroller.requireAuth, userController.updateUser);

router.post("/user", userController.createUser);

router.post("/user/login", authcontroller.requireSignIn, authcontroller.signIn);

module.exports = router;
