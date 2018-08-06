"use strict";
module.exports = (sequelize, DataTypes) => {
  var Follower = sequelize.define(
    "Follower",
    {
      userId: DataTypes.INTEGER,
      followerId: DataTypes.INTEGER
    },
    {}
  );
  Follower.associate = function(models) {
    Follower.belongsTo(models.User, { as: "user" });
    Follower.belongsTo(models.User, { as: "follower" });
  };
  return Follower;
};
