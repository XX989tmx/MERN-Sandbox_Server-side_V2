const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

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

router.get("/sample.mov", async (req, res, next) => {
  try {
    await res.download("downloads/sample.mov");
    console.log("1 file was downloaded.. download was successful");
  } catch (error) {}
});

module.exports = router;