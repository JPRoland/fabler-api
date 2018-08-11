"use strict";
module.exports = (sequelize, DataTypes) => {
  var Tag = sequelize.define(
    "Tag",
    {
      name: {
        type: DataTypes.STRING,
        unique: true
      }
    },
    {}
  );
  Tag.associate = function(models) {
    Tag.belongsToMany(models.Article, {
      through: "ArticleTag"
    });
  };
  return Tag;
};
