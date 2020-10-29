const express = require("express");
const { check } = require("express-validator");

const articlesControllers = require("../controllers/articles-controller");
const fileUpload = require("../middleware/file-upload");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.get(
  "/addArticleToStaredList/:userId/:articleId",
  articlesControllers.addArticleToStaredList
);
router.get("/getStaredArticles/:userId", articlesControllers.getStaredArticles);

router.delete(
  "/deleteArticleFromStaredList/:userId/:articleId",
  articlesControllers.removeArticleFromStaredList
);

router.get(
  "/getArticlesOfUsersYouAreFollowing/:userId",
  articlesControllers.getArticlesOfUsersYouAreFollowing
);

router.get(
  "/getStaredArticlesOfPeopleYouAreFollowing/:userId",
  articlesControllers.getStaredArticlesOfPeopleYouAreFollowing
);

router.get("/all", articlesControllers.allArticles);
router.get("/price_sort", articlesControllers.sortArticleByPriceOrder);
router.get("/date_sort", articlesControllers.sortByDate);
router.get("/downloadable", articlesControllers.DownloadableOrNot);
router.get("/popularitySort", articlesControllers.popularitySort);

router.post(
  "/addCommentsToArticle/:userId/:articleId",
  [check("comment").not().isEmpty()],
  articlesControllers.addCommentsToArticle
);
//GET 'https:://localhost500/api/articles/all?q=query'

// OR search (k1 or k2)
//GET 'https:://localhost500/api/articles/all?k1=keyword1&k2=keyword2'
// AND search (k1 and k2)
//GET 'https:://localhost500/api/articles/all?k1=keyword1&k2=keyword2'

router.get(
  "/getByWhomArticleWasVisited/:articleId",
  articlesControllers.getByWhomArticleWasVisited
);

router.get(
  "/top5MostViewedArticles",
  articlesControllers.getTop5MostViewedArticles
);

router.get("/tagIndex", articlesControllers.TagCountIndex);

router.get("/categoryIndex", articlesControllers.categoryCountIndex);

router.get("/:articleId", articlesControllers.getArticleById);

router.get("/user/:userId", articlesControllers.getArticlesByUserId);

router.get(
  "/averagePriceOfThisUsersArticles/:userId",
  articlesControllers.averagePriceOfThisUsersArticles
);

router.get(
  "/getAllImagesOfUsersArticles/:userId",
  articlesControllers.getAllImagesOfUsersArticles
);

router.get(
  "/get_same_authors_articles/:articleId/:authorId",
  articlesControllers.articlesBySameAuthorExceptTheCurrentOne
);

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

router.get(
  "/get_specific_article_by_id/:articleId",
  articlesControllers.getSpecificArticleById
);

router.get(
  "/:articleId/addViewCount",
  articlesControllers.addViewCountToArticle
);

// ここより前はauth無しでアクセス可能
router.use(checkAuth);
// ここより下はauthentication必須

router.post(
  "/",
  fileUpload.array("images"),
  [
    check("title").not().isEmpty(),
    // check("content").isLength({ min: 5 }),
    check("author").not().isEmpty(),
    check("categories1").not().isEmpty(),
    check("tags1").not().isEmpty(),
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
