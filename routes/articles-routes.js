const express = require("express");

const articlesControllers = require('../controllers/articles-controller');

const router = express.Router();

router.get("/:articleId", articlesControllers.getArticleById);

router.get("/user/:userId", articlesControllers.getArticlesByUserId);

router.post("/", articlesControllers.createArticle);

router.patch("/:articleId", articlesControllers.updateArticle);

router.delete("/:articleId", articlesControllers.deleteArticle);

module.exports = router;
