const express = require("express");
const router = express.Router();

const readingListControllers = require('../controllers/readingList-controller');

router.post("/new", readingListControllers.createReadingList);

router.get("/user/:userId", readingListControllers.getReadingListsByUserId)

router.get("/creator_info/:readingListId", readingListControllers.getCreatorsInformationOfReadingLists)

module.exports = router;