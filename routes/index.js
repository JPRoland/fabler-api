const router = require("express").Router();

router.use("/api", require("./user"));
router.use("/api", require("./story"));
router.use("/api", require("./tag"));
router.use("/api", require("./profile"));
router.use("/api", require("./genre"));

router.use((err, req, res, next) => {
  if (err.name === "ValidationError") {
    return res.status(422).json({
      errors: Object.keys(err.errors).reduce((errors, key) => {
        errors[key] = err.errors[key].message;

        return errors;
      }, {})
    });
  }

  return next(err);
});

module.exports = router;
