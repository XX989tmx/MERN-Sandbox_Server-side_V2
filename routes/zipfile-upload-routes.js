const express = require("express");
const router = express.Router();
const zipFileUpload = require("../middleware/zip-file-upload");
const zipfileUploadControllers = require('../controllers/zipfile-upload-controllers');

router.post(
  "/zip", 
  zipFileUpload.single("zipfile"),
  zipfileUploadControllers.zipfileUpload
);

module.exports = router;