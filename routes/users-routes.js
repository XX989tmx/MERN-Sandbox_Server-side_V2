const express = require("express");
const { check } = require("express-validator");

const usersControllers = require("../controllers/users-controller");
const fileUpload = require("../middleware/file-upload");

const router = express.Router();

router.get("/", usersControllers.getUsers);

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
    check("phone_number").not().isEmpty()
  ],
  usersControllers.createUserDetailInfo
);

router.get("/:userId/user_detail_info/show", usersControllers.showUserDetailInfo);

module.exports = router;
