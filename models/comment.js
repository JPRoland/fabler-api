"use strict";
module.exports = (sequelize, DataTypes) => {
  var Comment = sequelize.define(
    "Comment",
    {
      body: DataTypes.TEXT
    },
    {}
  );

  Comment.prototype.buildResponse = async function(user) {
    const following = user ? await this.User.hasFollower(user.id) : false;

    return {
      body: this.body,
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      author: {
        username: this.User.username,
        bio: this.User.bio,
        image: this.User.image,
        following
      }
    };
  };

  Comment.associate = function(models) {
    Comment.belongsTo(models.User);
    Comment.belongsTo(models.Article);
  };
  return Comment;
};
