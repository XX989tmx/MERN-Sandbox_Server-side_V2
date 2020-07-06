const fs = require("fs");

const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");
const mongoose = require("mongoose");

const HttpError = require("../models/http-error");
const getCoordsForAddress = require("../util/location");
const Article = require("../models/article");
const User = require("../models/user");
const mongooseUniqueValidator = require("mongoose-unique-validator");

const getArticleById = async (req, res, next) => {
  const articleId = req.params.articleId;

  let article;
  try {
    article = await Article.findById(articleId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find a place.",
      500
    );
    return next(error);
  }

  if (!article) {
    const error = new HttpError(
      "Could not find a place for the provided id.",
      404
    );
    return next(error);
  }

  res.json({ article: article.toObject({ getters: true }) });
};

const getArticlesByUserId = async (req, res, next) => {
  const userId = req.params.userId;

  let userWithArticles;
  try {
    userWithArticles = await User.findById(userId).populate("articles");
  } catch (err) {
    const error = new HttpError(
      "Fetching articles failed, please try again later",
      500
    );
    return next(error);
  }

  // const articles = ARTICLES.filter((a) => {
  //   return a.author === userId;
  // });

  if (!userWithArticles || userWithArticles.length === 0) {
    return next(
      new HttpError("Could not find a articles for the provided user id.", 404)
    );
  }

  res.json({
    articles: userWithArticles.articles.map((article) =>
      article.toObject({ getters: true })
    ),
  });
};

const createArticle = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);

    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { title, content, author, address } = req.body;

  let coordinates;
  try {
    coordinates = await getCoordsForAddress(address);
  } catch (error) {
    return next(error);
  }

  const createdArticle = new Article({
    title: title,
    content: content,
    address: address,
    location: coordinates,
    image: req.file.path,
    author: author,
  });

  let user;

  try {
    user = await User.findById(author);
  } catch (err) {
    const error = new HttpError(
      "Creating article failed, please try again.",
      500
    );
    return next(error);
  }

  if (!user) {
    const error = new HttpError("Could not find user for provided id", 404);
    return next(error);
  }

  console.log(user);

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdArticle.save({ session: sess });
    user.articles.push(createdArticle);
    await user.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      "Creating article failed, please try again.",
      500
    );
    return next(error);
  }

  res.status(201).json({ article: createdArticle });
};

const updateArticle = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { title, content } = req.body;
  const articleId = req.params.articleId;

  let article;
  try {
    article = await Article.findById(articleId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update article.",
      500
    );
    return next(error);
  }

  if (article.author.toString() !== req.userData.userId) {
    const error = new HttpError(
      "You are not allowed to edit this article.",
      401
    );
    return next(error);
  }

  // const updatedArticle = { ...ARTICLES.find((a) => a.id === articleId) };
  // const articleIndex = ARTICLES.findIndex((a) => a.id === articleId);
  article.title = title;
  article.content = content;

  try {
    await article.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update article.",
      500
    );
    return next(error);
  }
  // ARTICLES[articleIndex] = updatedArticle;

  res.status(200).json({ article: article.toObject({ getters: true }) });
};

const deleteArticle = async (req, res, next) => {
  const articleId = req.params.articleId;

  let article;
  try {
    article = await Article.findById(articleId).populate("author");
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete article.",
      500
    );
    return next(error);
  }

  if (!article) {
    const error = new HttpError("Could not find article for this id.", 404);
    return next(error);
  }

  if (article.author.id !== req.userData.userId) {
    const error = new HttpError(
      "You are not allowed to delete this article.",
      401
    );
    return next(error);
  }

  const imagePath = article.image;

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await article.remove({ session: sess });
    article.author.articles.pull(article);
    await article.author.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete article.",
      500
    );
    return next(error);
  }

  fs.unlink(imagePath, (err) => {
    console.log(err);
  });

  res.status(200).json({ message: "Deleted place." });
};

exports.getArticleById = getArticleById;
exports.getArticlesByUserId = getArticlesByUserId;
exports.createArticle = createArticle;
exports.updateArticle = updateArticle;
exports.deleteArticle = deleteArticle;
