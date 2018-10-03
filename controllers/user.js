const User = require("../models").User;
const assignDefined = require("../helpers/assignDefined");

const createUser = async (req, res, next) => {
  const { email, password, username } = req.body;

  try {
    const user = await User.create({ email, password, username });
    return res.json({ created: true });
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  const updatedFields = assignDefined({}, req.body);

  try {
    const user = User.update(updatedFields, {
      where: { id: req.user.id },
      returning: true
    });
    return res.json({ user });
  } catch (error) {
    next(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    return res.json({ user });
  } catch (error) {
    next(error);
  }
};

module.exports = { createUser, updateUser, getUser };
