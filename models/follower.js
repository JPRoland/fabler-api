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
    // associations can be defined here
  };
  return Follower;
};
