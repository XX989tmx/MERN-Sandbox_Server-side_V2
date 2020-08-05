const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

router.get("/pdf");
router.get("/xlsx");
router.get("/images");
router.get("/txt");
router.get("/zip");
router.get("/mp4");

router.get("/pdf/report/years/1950_60");
router.get("/pdf/report/years/1990_2000");
router.get("/pdf/report/user_generated/");


router.get('/pdf/sample.pdf', async (req, res, next) => {
    try {
        // await res.download("downloads/pdfFiles/sample.pdf");
        res.download(path.join("downloads", "pdffiles", "sample.pdf"))
        console.log("1 file was downloaded.. download was successful");
        
    } catch (error) {
        
    };
});

router.get("/xlsx/sample.xlsx", async (req, res, next) => {
  try {
    await res.download(path.join("downloads", "excelFiles", "sample.xlsx"));
    console.log("1 file was downloaded.. download was successful");
  } catch (error) {}
});

router.get("/images/sample.jpg", async (req, res, next) => {
  try {
    await res.download(path.join("downloads", "images", "sample.jpg"));
    console.log("1 file was downloaded.. download was successful");
  } catch (error) {}
});

router.get("/txt/sample.txt", async (req, res, next) => {
  try {
    await res.download(path.join("downloads", "txtFiles", "sample.txt"));
    console.log("1 file was downloaded.. download was successful");
  } catch (error) {}
});

router.get("/zip/sampleFolder.zip", async (req, res, next) => {
  try {
    await res.download(path.join("downloads", "zipfiles", "sampleFolder.zip"));
    console.log("1 file was downloaded.. download was successful");
  } catch (error) {}
});

router.get("/mp4/sample-mp4-file.mp4", async (req, res, next) => {
  try {
    await res.download(
      path.join("downloads", "mp4Files", "sample-mp4-file.mp4")
    );
    console.log("1 file was downloaded.. download was successful");
  } catch (error) {}
});

router.get("/csv/digital_currency_list.csv", async (req, res, next) => {
  try {
    await res.download(
      path.join("downloads", "csvFiles", "digital_currency_list.csv")
    );
    console.log("1 file was downloaded.. download was successful");
  } catch (error) {}
});



// router.get("/mp4/sample-mp4-file.mp4", async (req, res, next) => {
//   try {
//     await res.download("downloads/sample.mov");
//     console.log("1 file was downloaded.. download was successful");
//   } catch (error) {}
// });

module.exports = router;