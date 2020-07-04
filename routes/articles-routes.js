const express = require("express");
const { check } = require("express-validator");

const articlesControllers = require("../controllers/articles-controller");
const fileUpload = require("../middleware/file-upload");

const router = express.Router();

router.get("/:articleId", articlesControllers.getArticleById);

router.get("/user/:userId", articlesControllers.getArticlesByUserId);

router.post(
  "/",
  fileUpload.single("image"),
  [
    check("title").not().isEmpty(),
    check("content").isLength({ min: 5 }),
    check("author").not().isEmpty(),
  ],
  articlesControllers.createArticle
);

router.patch(
  "/:articleId",
  [check("title").not().isEmpty(), check("content").isLength({ min: 5 })],
  articlesControllers.updateArticle
);

router.delete("/:articleId", articlesControllers.deleteArticle);

module.exports = router;
