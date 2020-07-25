const express = require("express");
const router = express.Router();

const videoControllers = require('../controllers/video-controllers');

router.get("/index", videoControllers.getAllVideos);

router.get("/new", videoControllers.createNewVideo);

router.get('/:videoId', videoControllers.getVideoById);

module.exports = router;