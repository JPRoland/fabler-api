"use strict";
const SequelizeSlugify = require("sequelize-slugify");

module.exports = (sequelize, DataTypes) => {
  var Story = sequelize.define(
    "Story",
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

  SequelizeSlugify.slugifyModel(Story, {
    source: ["title"]
  });

  Story.prototype.buildResponse = async function(user) {
    const following = user ? await this.Author.hasFollower(user.id) : false;
    const favorited = user ? await this.hasFavorited(user.id) : false;

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

  Story.associate = function(models) {
    Story.belongsTo(models.User, { as: "Author" });
    Story.hasMany(models.Comment);
    Story.belongsToMany(models.Tag, { through: "StoryTag" });
    Story.belongsToMany(models.User, {
      through: { model: "Favorite", unique: false },
      as: "Favorited"
    });
  };
  return Story;
};
