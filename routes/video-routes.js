const express = require("express");
const router = express.Router();

const { check } = require("express-validator");

const videoControllers = require("../controllers/video-controllers");
const video = require("../models/video");

router.get("/index", videoControllers.getAllVideos);

router.post(
  "/new",
  [
    check("title").not().isEmpty(),
    check("description").not().isEmpty(),
    check("persons").not().isEmpty(),
    check("src").not().isEmpty(),
    check("tags").not().isEmpty(),
    check("categories").not().isEmpty(),
    check("duration").not().isEmpty(),
  ],
  videoControllers.createNewVideo
);

router.get("/:videoId", videoControllers.getVideoById);

router.get("/user/:userId", videoControllers.getVideosByUserId);

router.get("/get_video_by_tags/:tags", videoControllers.getVideoByTags);

router.get(
  "/get_video_by_categories/:categories",
  videoControllers.getVideoByCategories
);

router.get(
  "/get_video_by_persons/:persons",
  videoControllers.getVideoByPersons
);

module.exports = router;
