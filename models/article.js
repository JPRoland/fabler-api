"use strict";
const SequelizeSlugify = require("sequelize-slugify");

module.exports = (sequelize, DataTypes) => {
  var Article = sequelize.define(
    "Article",
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      slug: {
        type: DataTypes.STRING,
        unique: true
      },
      body: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {}
  );

  SequelizeSlugify.slugifyModel(Article, {
    source: ["title"]
  });

  Article.associate = function(models) {
    Article.belongsTo(models.User);
    Article.hasMany(models.Comment);
    Article.belongsToMany(models.Tag, { through: "ArticleTag" });
    Article.belongsToMany(models.User, {
      through: "Favorite",
      foreignKey: "articleId"
    });
  };
  return Article;
};
