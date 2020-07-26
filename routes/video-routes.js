const express = require("express");
const router = express.Router();

const videoControllers = require('../controllers/video-controllers');

router.get("/index", videoControllers.getAllVideos);

router.post("/new", videoControllers.createNewVideo);

router.get('/:videoId', videoControllers.getVideoById);

router.get("/get_video_by_tags/:tags", videoControllers.getVideoByTags);

router.get("/get_video_by_categories/:categories", videoControllers.getVideoByCategories);

router.get("/get_video_by_persons/:persons", videoControllers.getVideoByPersons);

module.exports = router;