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
  Favorite.associate = function(models) {
    Favorite.belongsTo(models.User);
    Favorite.belongsTo(models.Article);
  };
  return Favorite;
};
