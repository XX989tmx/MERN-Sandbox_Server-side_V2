const express = require("express");
const { check } = require('express-validator');

const articlesControllers = require('../controllers/articles-controller');

const router = express.Router();

router.get("/:articleId", articlesControllers.getArticleById);

router.get("/user/:userId", articlesControllers.getArticlesByUserId);

router.post("/",[check('title').not().isEmpty(), check('content').isLength({min: 5}), check('author').not().isEmpty()], articlesControllers.createArticle);

router.patch("/:articleId",check(), articlesControllers.updateArticle);

router.delete("/:articleId", articlesControllers.deleteArticle);

module.exports = router;
