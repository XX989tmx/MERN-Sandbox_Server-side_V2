const express = require("express");
const { check } = require("express-validator");

const usersControllers = require("../controllers/users-controller");
const fileUpload = require("../middleware/file-upload");

const router = express.Router();

router.get("/", usersControllers.getUsers);

router.get(
  "/followOtherUser/:userId/:followingCandidateId",
  usersControllers.followOtherUser
);

router.get(
  "/getUsersYouAreFollowing/:userId",
  usersControllers.getUsersYouAreFollowing
);
router.get(
  "/getUsersFollowingYou/:userId",
  usersControllers.getUsersFollowingYou
);

router.get(
  "/getFollowingOfFollowingOfYou/:userId",
  usersControllers.getFollowingOfFollowingOfYou
);

router.get(
  "/getFollowedByOfFollowingOfYou/:userId",
  usersControllers.getFollowedByOfFollowingOfYou
);

router.get(
  "/getFollowedByOfFollowedByOfYou/:userId",
  usersControllers.getFollowedByOfFollowedByOfYou
);

router.get(
  "/getFollowingOfFollowedByOfYou/:userId",
  usersControllers.getFollowingOfFollowedByOfYou
);

router.post(
  "/signup",
  fileUpload.single("image"),
  [
    check("name").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 6 }),
  ],
  usersControllers.signup
);

router.post("/login", usersControllers.login);

router.post(
  "/:userId/user_detail_info/create",
  [
    check("country").not().isEmpty(),
    check("zip_code").not().isEmpty(),
    check("todoufuken").not().isEmpty(),
    check("shichousonku").not().isEmpty(),
    check("banchi").not().isEmpty(),
    check("name_of_residence").not().isEmpty(),
    check("phone_number").not().isEmpty(),
  ],
  usersControllers.createUserDetailInfo
);

router.get(
  "/:userId/user_detail_info/show",
  usersControllers.showUserDetailInfo
);
router.patch(
  "/:userId/user_detail_info/update",
  usersControllers.updateUserDetailInfo
);

module.exports = router;
