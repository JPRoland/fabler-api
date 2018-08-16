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
      },
      favoriteCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      }
    },
    {}
  );

  SequelizeSlugify.slugifyModel(Article, {
    source: ["title"]
  });

  Article.prototype.buildResponse = async function(user) {
    const following = user ? await this.Author.hasFollower(user.id) : false;
    const favorited = user ? await this.hasFavoriter(user.id) : false;

    return {
      title: this.title,
      description: this.description,
      slug: this.slug,
      body: this.body,
      tags: this.Tags,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      favoriteCount: this.favoriteCount,
      favorited,
      author: {
        username: this.Author.username,
        bio: this.Author.bio,
        image: this.Author.image,
        following
      }
    };
  };

  Article.associate = function(models) {
    Article.belongsTo(models.User, { as: "Author" });
    Article.hasMany(models.Comment);
    Article.belongsToMany(models.Tag, { through: "ArticleTag" });
    Article.belongsToMany(models.User, {
      through: "Favorite",
      foreignKey: "ArticleId",
      as: "Favoriter"
    });
  };
  return Article;
};
