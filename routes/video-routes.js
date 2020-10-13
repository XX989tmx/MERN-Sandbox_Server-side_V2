const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const { check } = require("express-validator");

const videoControllers = require("../controllers/video-controllers");
const video = require("../models/video");
const fileUpload = require("../middleware/file-upload");

router.get("/index", videoControllers.getAllVideos);

router.get("/get_related_videos/:videoId", videoControllers.getRelatedVideo);

router.post("/:videoId/addComment", videoControllers.addCommentToVideo);

router.get(
  "/getVideosOfPeopleYouAreFollowing/:userId",
  videoControllers.getVideosOfPeopleYouAreFollowing
);

router.post(
  "/new",
  fileUpload.single("image"),
  [
    check("title").not().isEmpty(),
    check("description").not().isEmpty(),
    check("persons").not().isEmpty(),
    check("src").not().isEmpty(),
    check("tags").not().isEmpty(),
    check("categories").not().isEmpty(),
    check("duration").not().isEmpty(),
    check("hd").not().isEmpty(),
    check("is4k").not().isEmpty(),
  ],
  videoControllers.createNewVideo
);

router.get("/:videoId/addViewCount", videoControllers.addViewCount);

router.get("/:videoId/addLikeToVideo", videoControllers.addLikeToVideo);

router.get("/:videoId/addDislikeToVideo", videoControllers.addDislikeToVideo);

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

// ここより前はauth無しでアクセス可能
router.use(checkAuth);
// ここより下はauthentication必須
router.patch(
  "/:videoId",
  [
    check("title").not().isEmpty(),
    check("description").isLength({ min: 5 }),
    check("persons").not().isEmpty(),
    check("src").not().isEmpty(),
    check("tags").not().isEmpty(),
    check("categories").not().isEmpty(),
    check("duration").not().isEmpty(),
    check("hd").not().isEmpty(),
    check("is4k").not().isEmpty(),
  ],
  videoControllers.updateVideo
);

router.delete("/:videoId", videoControllers.deleteVideo);

module.exports = router;
