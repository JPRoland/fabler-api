const User = require("../models").User;

const getProfile = async (req, res, next) => {
  const { username } = req.params;

  try {
    const profile = await User.findOne({
      where: { username }
    });

    const following = req.user.id
      ? await profile.hasFollower(req.user.id)
      : false;

    return res.json({
      profile: {
        username: profile.username,
        bio: profile.bio,
        image: profile.image,
        following
      }
    });
  } catch (error) {
    return next(error);
  }
};

const follow = async (req, res, next) => {
  const { username } = req.params;

  try {
    const userToFollow = await User.findOne({ where: { username } });
    userToFollow.addFollower(req.user.id);

    const follower = await User.findById(req.user.id);
    follower.addFollowed(userToFollow);

    return res.json({
      profile: {
        username: userToFollow.username,
        bio: userToFollow.bio,
        image: userToFollow.image,
        following: true
      }
    });
  } catch (error) {
    return next(error);
  }
};

const unfollow = async (req, res, next) => {
  const { username } = req.params;

  try {
    const user = await User.findById(req.user.id);
    const followedUser = await User.findOne({ where: { username } });

    user.removeFollowed(followedUser);

    return res.json({
      profile: {
        username: followedUser.username,
        bio: followedUser.bio,
        image: followedUser.image,
        following: false
      }
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = { getProfile, follow, unfollow };
