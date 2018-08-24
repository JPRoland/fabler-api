"use strict";
module.exports = (sequelize, DataTypes) => {
  var Genre = sequelize.define(
    "Genre",
    {
      name: DataTypes.STRING
    },
    {}
  );

  Genre.associate = function(models) {
    Genre.belongsToMany(models.Story, { through: "StoryGenre" });
  };
  return Genre;
};
