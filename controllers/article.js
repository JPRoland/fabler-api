const Article = require("../models").Article;

const getArticles = async (req, res) => {
  // TODO
};
const getFeedArticles = async (req, res) => {
  // TODO
};
const getArticleBySlug = async (req, res) => {
  // TODO
};
const createArticle = async (req, res) => {
  // TODO
};
const updateArticle = async (req, res) => {
  // TODO
};
const deleteArticle = async (req, res) => {
  // TODO
};
const favoriteArticle = async (req, res) => {
  // TODO
};
const unfavoriteArticle = async (req, res) => {
  // TODO
};
const createArticleComment = async (req, res) => {
  // TODO
};
const getArticleComments = async (req, res) => {
  // TODO
};
const deleteArticleComment = async (req, res) => {
  // TODO
};

module.exports = {
  getArticles,
  getArticleBySlug,
  getArticleComments,
  createArticle,
  updateArticle,
  deleteArticle,
  createArticleComment,
  deleteArticleComment,
  favoriteArticle,
  unfavoriteArticle,
  getFeedArticles
};
