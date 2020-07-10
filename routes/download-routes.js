const express = require("express");
const router = express.Router();

router.get('/pdf/sample.pdf', async (req, res, next) => {
    try {
        await res.download("downloads/pdfFiles/sample.pdf");
        console.log("1 file was downloaded.. download was successful");
        
    } catch (error) {
        
    };
})

module.exports = router;