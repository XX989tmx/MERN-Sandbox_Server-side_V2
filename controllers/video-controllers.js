const mongoose = require("mongoose");
const multer = require("multer");
const Video = require("../models/video");
const User = require("../models/user");
const aws = require("aws-sdk");
const fs = require("fs");
const HttpError = require("../models/http-error");
const jwt = require("jsonwebtoken");

const getAllVideos = async (req, res, next) => {
  let videos;
  try {
    videos = await Video.find().sort({ _id: -1 });
  } catch (error) {}
  console.log(videos);

  let count;
  try {
    count = await Video.count();
  } catch (error) {}
  console.log(count);

  res.json({
    videos: videos.map((video) => video.toObject({ getters: true })),
    count,
  });
};

const getVideoById = async (req, res, next) => {
  const videoId = req.params.videoId;

  let video;
  try {
    video = await Video.findById(videoId);
  } catch (error) {}
  console.log(video);

  res.json({ video: video.toObject({ getters: true }) });
};

const getVideosByUserId = async (req, res, next) => {
  const userId = req.params.userId;

  //my videos = user.videos
  let userWithVideos = await User.findById(userId).populate("videos");
  console.log(userWithVideos.videos);
  console.log(userWithVideos.videos[0]);
  console.log(userWithVideos.videos[0].title);
  console.log(userWithVideos.videos[0].src);

  res.json({
    userWithVideos: userWithVideos.videos.map((v) =>
      v.toObject({ getters: true })
    ),
  });
};

const createNewVideo = async (req, res, next) => {
  const {
    title,
    description,
    persons,
    src,
    tags,
    categories,
    userId,
    duration,
    hd,
    is4k,
  } = req.body;
  console.log(duration);

  aws.config.setPromisesDependency();
  aws.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
  });

  const s3 = new aws.S3();
  let params = {
    ACL: "public-read",
    Bucket: process.env.AWS_BUCKET_NAME,
    Body: fs.createReadStream(req.file.path),
    Key: req.file.originalname,
  };
  console.log(params.KEY);
  let url = `https://${
    process.env.AWS_BUCKET_NAME
  }.s3.amazonaws.com/${encodeURIComponent(params.Key)}`;
  // let locationUrl;

  s3.upload(params, (err, data) => {
    if (err) {
      console.log("Error occured while trying to upload to S3 bucket", err);
    }

    if (data) {
      // fs.unlinkSync(req.file.path); // Empty temp folder
      // console.log(data);
      // console.log(data.Location);
      console.log(data.Location);

      // let newUser = new Users({ ...req.body, avatar: locationUrl });
      // newUser
      //   .save()
      //   .then((user) => {
      //     res.json({ message: "User created successfully", user });
      //   })
      //   .catch((err) => {
      //     console.log("Error occured while trying to save to DB");
      //   });
    }
  });

  const createdVideo = new Video({
    title,
    description,
    persons,
    src,
    tags,
    categories,
    date_created: new Date(Date.now()).toString(),
    creator: userId, // => user._id
    duration,
    hd,
    is4k,
    image: url,
  });

  let user;

  user = await User.findById(userId);

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdVideo.save({ session: sess });
    user.videos.push(createdVideo);
    await user.save({ session: sess });
    await sess.commitTransaction();
  } catch (error) {
    console.log(error);
  }
  res.json({ createdVideo });
};

const updateVideo = async (req, res, next) => {
  const { title, description, persons } = req.body;
  const videoId = req.params.videoId;

  let video;
  try {
    video = await Video.findById(videoId);
  } catch (error) {
    console.log(error);
  }

  if (video.creator.toString() !== req.userData.userId) {
    const error = new HttpError(
      "You are not allowed to edit this article.",
      401
    );
    return next(error);
  }

  video.title = title;
  video.description = description;
  video.persons = persons;

  try {
    await video.save();
  } catch (error) {
    console.log(error);
    // const error = new HttpError(
    //   "Something went wrong, could not update article.",
    //   500
    // );
    // return next(error);
  }

  res.status(200).json({ video: video.toObject({ getters: true }) });
};

const deleteVideo = async (req, res, next) => {
  const videoId = req.params.videoId;

  let video;
  try {
    video = await Video.findById(videoId).populate("creator");
  } catch (error) {
    console.log(error);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await video.remove({ session: sess });
    video.creator.videos.pull(video);
    await video.creator.save({ session: sess });
    await sess.commitTransaction();
  } catch (error) {}
};

const getVideoByTags = async (req, res, next) => {
  const tags = req.params.tags;

  let tagMatchedVideos;
  try {
    tagMatchedVideos = await Video.find({ tags: tags }).sort({ _id: -1 });
  } catch (error) {}
  console.log(tagMatchedVideos);

  let countByTag;
  try {
    countByTag = await Video.count({ tags: tags });
  } catch (error) {}
  console.log(countByTag);

  res.json({
    tagMatchedVideos: tagMatchedVideos.map((video) =>
      video.toObject({ getters: true })
    ),
    countByTag: countByTag,
  });
};

const getVideoByCategories = async (req, res, next) => {
  const categories = req.params.categories;

  let categoryMatchedVideos;
  try {
    categoryMatchedVideos = await Video.find({
      categories: categories,
    }).sort({ _id: -1 });
  } catch (error) {}
  console.log(categoryMatchedVideos);

  let countByCategory;
  try {
    countByCategory = await Video.count({ categories: categories });
  } catch (error) {}
  console.log(countByCategory);

  res.json({
    categoryMatchedVideos: categoryMatchedVideos.map((video) =>
      video.toObject({ getters: true })
    ),
    countByCategory: countByCategory,
  });
};

const getVideoByPersons = async (req, res, next) => {};

exports.getAllVideos = getAllVideos;
exports.getVideoById = getVideoById;
exports.createNewVideo = createNewVideo;
exports.getVideoByTags = getVideoByTags;
exports.getVideoByCategories = getVideoByCategories;
exports.getVideoByPersons = getVideoByPersons;
exports.getVideosByUserId = getVideosByUserId;
exports.updateVideo = updateVideo;
exports.deleteVideo = deleteVideo;
