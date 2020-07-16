const fs = require('fs');
const path = require('path');

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const HttpError = require("./models/http-error");

const articlesRoutes = require("./routes/articles-routes");
const usersRoutes = require("./routes/users-routes");
const wishlistsRoutes = require('./routes/wishlists-routes');
const downloadRoutes = require('./routes/download-routes');
const zipfileUploadRoutes = require('./routes/zipfile-upload-routes');
const getExternalApiRoutes = require('./routes/external-api-routes');

const zipUpload = require('./middleware/zip-file-upload');


const app = express();

app.use(bodyParser.json());

app.use('/uploads/images', express.static(path.join('uploads', 'images')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  next();
})



app.use("/api/articles", articlesRoutes);

app.use("/api/users", usersRoutes);

app.use("/api/wishlists", wishlistsRoutes);

app.use("/api/download", downloadRoutes);

app.use("/api/upload", zipfileUploadRoutes);

app.use("/api/get_external_api", getExternalApiRoutes);

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, err => {
      console.log(err);
      
    });
  } 
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0-7slh6.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(process.env.PORT || 5000);
  })
  .catch((err) => {
    console.log(err);
  });
