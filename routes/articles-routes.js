const express = require("express");
const { check } = require("express-validator");

const articlesControllers = require("../controllers/articles-controller");
const fileUpload = require("../middleware/file-upload");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.get("/all", articlesControllers.allArticles);
router.get("/price_sort", articlesControllers.sortArticleByPriceOrder)
//GET 'https:://localhost500/api/articles/all?q=query'

// OR search (k1 or k2)
//GET 'https:://localhost500/api/articles/all?k1=keyword1&k2=keyword2'
// AND search (k1 and k2)
//GET 'https:://localhost500/api/articles/all?k1=keyword1&k2=keyword2'

router.get("/:articleId", articlesControllers.getArticleById);

router.get("/user/:userId", articlesControllers.getArticlesByUserId);

router.get(
  "/push_article_to_wishlist/:articleId/:wishlistId",
  articlesControllers.pushArticleToWishlist
);

router.get("/get_article_by_tags/:tags", articlesControllers.getArticleByTag);
router.get(
  "/get_article_by_categories/:categories",
  articlesControllers.getArticleByCategory
);

router.get(
  "/count_article_by_category/:categories",
  articlesControllers.countArticlesByCategory
);
router.get(
  "/count_article_by_tag/:tags",
  articlesControllers.countArticlesByTag
);

router.get("/get_specific_article_by_id/:articleId", articlesControllers.getSpecificArticleById)

// ここより前はauth無しでアクセス可能
router.use(checkAuth);
// ここより下はauthentication必須

router.post(
  "/",
  fileUpload.single("image"),
  [
    check("title").not().isEmpty(),
    check("content").isLength({ min: 5 }),
    check("author").not().isEmpty(),
    check("categories").not().isEmpty(),
    check("tags").not().isEmpty(),
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
