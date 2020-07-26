const mongoose = require("mongoose");

const Video = require('../models/video');

const getAllVideos = async (req, res, next) => {
    let videos;
    try {
        videos = await Video.find();
    } catch (error) {
        
    }
    console.log(videos);

    let count;
    try {
        count = await Video.count();
    } catch (error) {
        
    }
    console.log(count);

    res.json({ videos: videos.map(video => video.toObject({getters:true})),count });
};

const getVideoById = async (req, res, next) => {
    const videoId = req.params.videoId;

    let video;
    try {
        video = await Video.findById(videoId);
    } catch (error) {
        
    }
    console.log(video);

    res.json({ video: video.toObject({getters:true}) });
};

const createNewVideo = async (req, res, next) => {
  const {
    title,
    description,
    persons,
    src,
    tags,
    categories
  } = req.body;

  const createdVideo = new Video({
    title,
    description,
    persons,
    src,
    tags,
    categories,
    date_created: new Date(Date.now()).toString(),
  });
  console.log(createdVideo);

  try {
      const sess = await mongoose.startSession();
      sess.startTransaction();
      await createdVideo.save({ session: sess });
      await sess.commitTransaction();
  } catch (error) {
      
  }

  res.json({ createdVideo });
};

const getVideoByTags = async(req, res, next) => {
    const tags = req.params.tags;

    let tagMatchedVideos;
    try {
        tagMatchedVideos = await Video.find({ tags: tags });
    } catch (error) {
        
    }
    console.log(tagMatchedVideos);

    let countByTag;
    try {
        countByTag = await Video.count({ tags: tags });
    } catch (error) {
        
    }
    console.log(countByTag);

    res.json({
      tagMatchedVideos: tagMatchedVideos.map((video) =>
        video.toObject({ getters: true })
      ),
      countByTag: countByTag,
    });
};

const getVideoByCategories = async(req, res, next) => {
    const categories = req.params.categories;

    let categoryMatchedVideos;
    try {
        categoryMatchedVideos = await Video.find({ categories: categories });
    } catch (error) {
        
    }
    console.log(categoryMatchedVideos);

    let countByCategory;
    try {
        countByCategory = await Video.count({ categories: categories });
    } catch (error) {
        
    }
    console.log(countByCategory);

    res.json({
      categoryMatchedVideos: categoryMatchedVideos.map((video) =>
        video.toObject({ getters: true })
      ),
      countByCategory: countByCategory,
    });
};

const getVideoByPersons = async(req, res, next) => {
    
}

exports.getAllVideos = getAllVideos;
exports.getVideoById = getVideoById;
exports.createNewVideo = createNewVideo;
exports.getVideoByTags = getVideoByTags;
exports.getVideoByCategories = getVideoByCategories;
exports.getVideoByPersons = getVideoByPersons;


