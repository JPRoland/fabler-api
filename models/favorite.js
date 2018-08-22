"use strict";
module.exports = (sequelize, DataTypes) => {
  var Favorite = sequelize.define(
    "Favorite",
    {
      UserId: DataTypes.INTEGER,
      StoryId: DataTypes.INTEGER
    },
    {}
  );

  return Favorite;
};
