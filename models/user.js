"use strict";
const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          isEmail: true
        }
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      image: DataTypes.STRING,
      bio: DataTypes.TEXT,
      password: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {}
  );

  User.beforeSave(async (user, options) => {
    if (user.changed("password")) {
      try {
        const hash = await bcrypt.hash(user.password, 11);
        user.password = hash;
      } catch (error) {
        throw new Error(error.message);
      }
    }
  });

  User.prototype.comparePassword = async function(pass) {
    try {
      const match = await bcrypt.compare(pass, this.password);
      return match;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  User.associate = function(models) {
    User.hasMany(models.Article, { as: "Author", foreignKey: "AuthorId" });
    User.hasMany(models.Comment);
    User.belongsToMany(models.User, {
      as: "Follower",
      through: "Followers",
      foreignKey: "FollowerId"
    });
    User.belongsToMany(models.User, {
      as: "Followed",
      through: "Followers",
      foreignKey: "FollowedId"
    });
    User.belongsToMany(models.Article, {
      through: { model: "Favorite", unique: false },
      as: "Favoriter"
    });
  };
  return User;
};
