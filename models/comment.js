'use strict';
module.exports = (sequelize, DataTypes) => {
  var Comment = sequelize.define('Comment', {
    body: DataTypes.TEXT
  }, {});
  Comment.associate = function(models) {
    // associations can be defined here
  };
  return Comment;
};