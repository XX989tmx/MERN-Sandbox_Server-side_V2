const express = require("express");

const articlesControllers = require('../controllers/articles-controller');

const router = express.Router();

router.get("/:articleId", articlesControllers.getArticleById);

router.get("/user/:userId", articlesControllers.getArticleByUserId);

router.post("/", articlesControllers.createArticle);

module.exports = router;
