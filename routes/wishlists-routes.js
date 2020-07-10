const express = require("express");
const { check } = require("express-validator");

const wishlistsControllers = require('../controllers/wishlists-controller');

const router = express.Router();



router.get("/:wishlistId", wishlistsControllers.getWishlistById);

router.post("/", [check("name").not().isEmpty()], wishlistsControllers.createNewWishlist);

router.post('/add_to_wishlist/articleId', wishlistsControllers.pushNewArticleToWishlist);

router.patch(
  "/:wishlistsId",
  [check("name").not().isEmpty()],
  wishlistsControllers.updateExistingWishlist
);

router.delete("/:wishlistId", wishlistsControllers.deleteExistingWishlist);

module.exports = router;