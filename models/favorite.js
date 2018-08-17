"use strict";
module.exports = (sequelize, DataTypes) => {
  var Favorite = sequelize.define(
    "Favorite",
    {
      UserId: DataTypes.INTEGER,
      ArticleId: DataTypes.INTEGER
    },
    {}
  );

  return Favorite;
};
