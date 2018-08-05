"use strict";
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
  User.associate = function(models) {
    User.hasMany(models.Article);
    User.hasMany(models.Favorite, { foreignKey: "userId" });
    User.hasMany(models.Comment);
    User.belongsToMany(models.User, {
      as: "follower",
      through: "Follower",
      foreignKey: "follwerId"
    });
    User.belongsToMany(models.User, {
      as: "user",
      through: "Follower",
      foreignKey: "userId"
    });
    User.belongsToMany(models.Article, {
      through: "Favorite",
      foreignKey: "userId"
    });
  };
  return User;
};
