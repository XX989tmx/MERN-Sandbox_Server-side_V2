const path = require("path");
const aws = require("aws-sdk");
const fs = require("fs");

const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");
const mongoose = require("mongoose");

const HttpError = require("../models/http-error");
const getCoordsForAddress = require("../util/location");
const Article = require("../models/article");
const User = require("../models/user");
const mongooseUniqueValidator = require("mongoose-unique-validator");
const referenceSitesHandler = require("../modules/controllers-modules/reference-sites-handler");
const externalSitesHandler = require("../modules/controllers-modules/external-sites-handler");
const ArticleComment = require("../models/article-comment");

const allArticles = async (req, res, next) => {
  // const query = req.query.q;
  let articles;
  let query = {};
  let TagArray;
  let CategoryArray;
  if (req.query.q && req.query.and === "true") {
    try {
      query = {
        $and: [
          { title: { $regex: req.query.q, $options: "i" } },
          { content: { $regex: req.query.q, $options: "i" } },
        ],
      };
      articles = await Article.find(query)
        .populate({ path: "author", select: "-password" })
        .sort({ _id: -1 });
    } catch {}
  } else if (req.query.sort) {
    if (req.query.sort === "oldest") {
      try {
        query = {
          $or: [
            { title: { $regex: req.query.q, $options: "i" } },
            { content: { $regex: req.query.q, $options: "i" } },
          ],
        };
        articles = await Article.find(query)
          .populate({ path: "author", select: "-password" })
          .sort({ _id: 1 });
        // articles = await Article.find().sort({ date_created: -1 });
      } catch {}
    } else {
      try {
        articles = await Article.find()
          .populate({ path: "author", select: "-password" })
          .sort({ _id: -1 });
      } catch {}
    }
  } else if (req.query.categories) {
    articles = await Article.find({ categories: req.query.categories })
      .populate({ path: "author", select: "-password" })
      .sort({
        _id: -1,
      });
  } else if (req.query.tags) {
    articles = await Article.find({ tags: req.query.tags })
      .populate({ path: "author", select: "-password" })
      .sort({
        _id: -1,
      });
  } else if (req.query.price) {
    switch (req.query.price) {
      case "0~499":
        articles = await Article.find({ price: { $gt: 0, $lte: 499 } })
          .populate({ path: "author", select: "-password" })
          .sort({
            _id: -1,
          });
        break;
      case "500~999":
        articles = await Article.find({ price: { $gte: 500, $lte: 999 } })
          .populate({ path: "author", select: "-password" })
          .sort({
            _id: -1,
          });
        break;
      case "1000~1999":
        articles = await Article.find({
          price: { $gte: 1000, $lte: 1999 },
        })
          .populate({ path: "author", select: "-password" })
          .sort({
            _id: -1,
          });
        break;
      case "2000~4999":
        articles = await Article.find({
          price: { $gte: 2000, $lte: 4999 },
        })
          .populate({ path: "author", select: "-password" })
          .sort({
            _id: -1,
          });
        break;
      case "5000~9999":
        articles = await Article.find({
          price: { $gte: 5000, $lte: 9999 },
        })
          .populate({ path: "author", select: "-password" })
          .sort({
            _id: -1,
          });
        break;
      case "10000~":
        articles = await Article.find({
          price: { $gte: 10000 },
        })
          .populate({ path: "author", select: "-password" })
          .sort({
            _id: -1,
          });
        break;
      default:
        break;
    }
  } else if (!!req.query.q) {
    try {
      query = {
        $or: [
          { title: { $regex: req.query.q, $options: "i" } },
          { content: { $regex: req.query.q, $options: "i" } },
        ],
      };
      articles = await Article.find(query)
        .populate({ path: "author", select: "-password" })
        .sort({ _id: -1 });
    } catch (error) {}
  } else {
    try {
      articles = await Article.find()
        .populate({ path: "author", select: "-password -__v" })
        .sort({ _id: -1 });
      // console.log(articles);
      // console.log(articles[60].populated("author"));
      // console.log(articles[60].author.name);
    } catch (error) {}

    // //tagList
    // let articleTags = [];

    // for (let index = 0; index < articles.length; index++) {
    //   const element = articles[index];

    //   articleTags.push(element.tags[0]);

    //   console.log(articleTags);
    // }

    // // let myArray = ["a", "b", "a", "b", "c", "e", "e", "c", "d", "d", "d", "d"];

    // TagArray = articleTags.reduce(function (accumulator, currentValue) {
    //   if (accumulator.indexOf(currentValue) === -1) {
    //     accumulator.push(currentValue);
    //   }
    //   return accumulator;
    // }, []);
    // console.log(TagArray);

    // //categoryList
    // let articleCategories = [];

    // for (let index = 0; index < articles.length; index++) {
    //   const element = articles[index];

    //   articleCategories.push(element.categories[0]);

    //   console.log(articleCategories);
    // }

    // // let myArray = ["a", "b", "a", "b", "c", "e", "e", "c", "d", "d", "d", "d"];

    // CategoryArray = articleCategories.reduce(function (accumulator, currentValue) {
    //   if (accumulator.indexOf(currentValue) === -1) {
    //     accumulator.push(currentValue);
    //   }
    //   return accumulator;
    // }, []);
    // console.log(CategoryArray);

    try {
      count = await Article.count();
    } catch (error) {}
    // console.log(count);
  }

  res.json({
    articles: articles.map((a) => a.toObject({ getters: true })),
    // TagArray: TagArray,
    // CategoryArray: CategoryArray,
  });
};

const getArticleById = async (req, res, next) => {
  const articleId = req.params.articleId;

  let article;
  try {
    article = await Article.findById(articleId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find a place.",
      500
    );
    return next(error);
  }

  if (!article) {
    const error = new HttpError(
      "Could not find a place for the provided id.",
      404
    );
    return next(error);
  }

  res.json({ article: article.toObject({ getters: true }) });
};

const getArticlesByUserId = async (req, res, next) => {
  const userId = req.params.userId;

  // let userWithArticles; // = userPopulatedWithArticlesField
  let articlesFoundByUserId;
  try {
    //                     = Article.find({author: userId})
    articlesFoundByUserId = await Article.find({ author: userId }).populate({
      path: "author",
      select: "-password",
    });
  } catch (err) {
    const error = new HttpError(
      "Fetching articles failed, please try again later",
      500
    );
    return next(error);
  }

  // const articles = ARTICLES.filter((a) => {
  //   return a.author === userId;
  // });

  if (!articlesFoundByUserId || articlesFoundByUserId.length === 0) {
    return next(
      new HttpError("Could not find a articles for the provided user id.", 404)
    );
  }

  // console.log(articlesFoundByUserId[0].populated("author"));
  // console.log(articlesFoundByUserId);
  res.json({
    articles: articlesFoundByUserId.map((article) =>
      article.toObject({ getters: true })
    ),
  });
};

const createArticle = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);

    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const {
    title,
    heading,
    content,
    heading2,
    content2,
    heading3,
    content3,
    heading4,
    content4,
    heading5,
    content5,
    heading6,
    content6,
    heading7,
    content7,
    heading8,
    content8,
    heading9,
    content9,
    heading10,
    content10,
    author,
    address,
    categories1,
    categories2,
    categories3,
    categories4,
    categories5,
    tags1,
    tags2,
    tags3,
    tags4,
    tags5,
    price,
    downloadable,
    referenceSiteName1,
    referenceSiteName2,
    referenceSiteName3,
    referenceSiteLink1,
    referenceSiteLink2,
    referenceSiteLink3,
    externalSitesName1,
    externalSitesName2,
    externalSitesName3,
    externalSitesName4,
    externalSitesName5,
    externalSitesLink1,
    externalSitesLink2,
    externalSitesLink3,
    externalSitesLink4,
    externalSitesLink5,
  } = req.body;

  const externalSitesArray = externalSitesHandler(
    externalSitesName1,
    externalSitesName2,
    externalSitesName3,
    externalSitesName4,
    externalSitesName5,
    externalSitesLink1,
    externalSitesLink2,
    externalSitesLink3,
    externalSitesLink4,
    externalSitesLink5
  );

  // console.log(externalSitesArray);

  const referenceSiteArray = referenceSitesHandler(
    referenceSiteName1,
    referenceSiteName2,
    referenceSiteName3,
    referenceSiteLink1,
    referenceSiteLink2,
    referenceSiteLink3
  );

  // console.log(referenceSiteArray);

  let tagsArray = [];

  if (tags1) {
    tagsArray.push(tags1);
  }
  if (tags2) {
    tagsArray.push(tags2);
  }
  if (tags3) {
    tagsArray.push(tags3);
  }
  if (tags4) {
    tagsArray.push(tags4);
  }
  if (tags5) {
    tagsArray.push(tags5);
  }

  let categoriesArray = [];
  if (categories1) {
    categoriesArray.push(categories1);
  }
  if (categories2) {
    categoriesArray.push(categories2);
  }
  if (categories3) {
    categoriesArray.push(categories3);
  }
  if (categories4) {
    categoriesArray.push(categories4);
  }
  if (categories5) {
    categoriesArray.push(categories5);
  }

  let contentsArray = [];
  if (heading && content) {
    const c1 = {
      heading: heading,
      content: content,
    };

    contentsArray.push(c1);
  }

  if (heading2 && content2) {
    const c2 = {
      heading: heading2,
      content: content2,
    };
    contentsArray.push(c2);
  }

  if (heading3 && content3) {
    const c3 = {
      heading: heading3,
      content: content3,
    };
    contentsArray.push(c3);
  }

  if (heading4 && content4) {
    const c4 = {
      heading: heading4,
      content: content4,
    };
    contentsArray.push(c4);
  }

  if (heading5 && content5) {
    const c5 = {
      heading: heading5,
      content: content5,
    };
    contentsArray.push(c5);
  }

  if (heading6 && content6) {
    const c6 = {
      heading: heading6,
      content: content6,
    };
    contentsArray.push(c6);
  }

  if (heading7 && content7) {
    const c7 = {
      heading: heading7,
      content: content7,
    };
    contentsArray.push(c7);
  }

  if (heading8 && content8) {
    const c8 = {
      heading: heading8,
      content: content8,
    };
    contentsArray.push(c8);
  }

  if (heading9 && content9) {
    const c9 = {
      heading: heading9,
      content: content9,
    };
    contentsArray.push(c9);
  }

  if (heading10 && content10) {
    const c10 = {
      heading: heading10,
      content: content10,
    };
    contentsArray.push(c10);
  }

  // fs.appendFileSync(path.join("downloads", "txtFiles", "sample.txt"), title);
  // console.log('The "article title" was appended to file!');
  // fs.appendFileSync(path.join("downloads", "txtFiles", "sample.txt"), content);
  // console.log('The "article content" was appended to file!');
  const file = req.files;
  // console.log(file);

  aws.config.setPromisesDependency();
  aws.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
  });

  const s3 = new aws.S3();
  let imageUrlArray = [];
  for (let index = 0; index < file.length; index++) {
    const element = file[index];
    let params = {
      ACL: "public-read",
      Bucket: process.env.AWS_BUCKET_NAME,
      Body: fs.createReadStream(element.path),
      Key: element.filename,
    };

    let url = `https://${
      process.env.AWS_BUCKET_NAME
    }.s3.amazonaws.com/${encodeURIComponent(params.Key)}`;
    imageUrlArray.push(url);
    // console.log(url);
    // console.log(imageUrlArray);

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
  }

  // console.log(params.KEY);
  // console.log(imageUrlArray);
  // let locationUrl;

  let coordinates;
  try {
    coordinates = await getCoordsForAddress(address);
  } catch (error) {
    return next(error);
  }

  let RandomizedInitialViewCounts = Math.floor(Math.random() * 100000 + 1);

  const createdArticle = new Article({
    title: title,
    contents: [],
    // heading: heading,
    // content: content,
    // heading2: heading2,
    // content2: content2,
    // heading3: heading3,
    // content3: content3,
    // heading4: heading4,
    // content4: content4,
    address: address,
    location: coordinates,
    referenceSites: [],
    externalSites: [],
    images: [],
    author: author,
    wishlists: [],
    categories: categoriesArray,
    date_created: new Date(Date.now()).toString(),
    tags: tagsArray,
    price: price,
    downloadable,
    viewCount: RandomizedInitialViewCounts,
  });
  // for (let i = 0; i < tagsArray.length; i++) {
  //   const element = tagsArray[i];
  //   createdArticle.tags.push(element);
  // }

  for (let index = 0; index < referenceSiteArray.length; index++) {
    const site = referenceSiteArray[index];
    createdArticle.referenceSites.push({ name: site.name, link: site.link });
  }

  for (let index = 0; index < contentsArray.length; index++) {
    const element = contentsArray[index];
    createdArticle.contents.push({
      heading: element.heading,
      content: element.content,
    });
  }

  for (let index = 0; index < externalSitesArray.length; index++) {
    const element = externalSitesArray[index];
    createdArticle.externalSites.push({
      name: element.name,
      link: element.link,
    });
  }
  for (let index = 0; index < imageUrlArray.length; index++) {
    const element = imageUrlArray[index];
    createdArticle.images.push(element);
  }

  const articleContents = createdArticle.contents;

  function calculateWordCountAndEstimatedReadingTimeOfContent(contents) {
    //////// purpose of function == takes Article.contents array, and return object consisted from 1 wordCount property and 2 estimatedReadingTime property
    /// params: contents [];
    /// return value: {};

    // function calculate estimated time to take for this reading
    const estimatedReadingTime = (value) => {
      let wordCount = value.split(/\W+/).length;

      let wordPerSeconds = 2;

      let amountOfSecondsToRead = wordCount / wordPerSeconds;
      let amountOfMinutesToRead = amountOfSecondsToRead / 60;
      // console.log(amountOfSecondsToRead);
      // console.log(amountOfMinutesToRead);
      return amountOfMinutesToRead;
    };

    // initialize response object
    const wordCountAndEstimatedReadingTime = {
      wordCount: "",
      estimatedReadingTime: "",
    };

    //
    let contentArray = [];
    let joinedContentString;
    for (let index = 0; index < contents.length; index++) {
      const element = contents[index];
      contentArray.push(element.content);
      joinedContentString = contentArray.join(" ");
    }

    const countWord = (joinedContentString) => {
      const wordCount = joinedContentString.split(/\W+/).length;
      return wordCount;
    };
    const wordCount = countWord(joinedContentString);

    wordCountAndEstimatedReadingTime.wordCount = wordCount;

    const ReadingTime = estimatedReadingTime(joinedContentString);
    const fixedEstimatedReadingTime = ReadingTime.toFixed(1);

    wordCountAndEstimatedReadingTime.estimatedReadingTime = fixedEstimatedReadingTime;

    return wordCountAndEstimatedReadingTime;
  }
  const wordCountAndEstimatedReadingTime = calculateWordCountAndEstimatedReadingTimeOfContent(
    articleContents
  );
  console.log(wordCountAndEstimatedReadingTime);

  createdArticle.wordCount = Number(wordCountAndEstimatedReadingTime.wordCount);
  createdArticle.estimatedReadingTime = Number(
    wordCountAndEstimatedReadingTime.estimatedReadingTime
  );
  // console.log(createdArticle.images);
  // console.log(createdArticle.referenceSites[0].name);
  // console.log(createdArticle.referenceSites[0].link);
  // console.log(createdArticle.referenceSites[1].link);

  console.log(createdArticle);

  let user;

  try {
    user = await User.findById(author);
  } catch (err) {
    const error = new HttpError(
      "Creating article failed, please try again.",
      500
    );
    return next(error);
  }

  if (!user) {
    const error = new HttpError("Could not find user for provided id", 404);
    return next(error);
  }

  // console.log(user);

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdArticle.save({ session: sess });
    user.articles.push(createdArticle);
    await user.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      "Creating article failed, please try again.",
      500
    );
    return next(error);
  }

  res.status(201).json({ article: createdArticle });
};

const pushArticleToWishlist = async (req, res, next) => {
  const articleId = req.params.articleId;
  const wishlistId = req.params.wishlistId;

  let wishlist;
  try {
    wishlist = await Wishlist.findById(wishlistId);
  } catch (err) {}

  let article;
  try {
    article = await Article.findById(articleId);
  } catch (err) {}

  let wishlistOnArticle;
  try {
    wishlistOnArticle = await Wishlist.findById(wishlistId).populate(
      "wishlist"
    );
  } catch (err) {}

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    wishlist.articles.push(article);
    await wishlist.save({ session: sess });
    wishlistOnArticle.article.wishlists.push(wishlist);
    await wishlistOnArticle.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {}

  res.json({ wishlistState: wishlist });
};

const updateArticle = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { title, content } = req.body;
  const articleId = req.params.articleId;

  let article;
  try {
    article = await Article.findById(articleId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update article.",
      500
    );
    return next(error);
  }

  if (article.author.toString() !== req.userData.userId) {
    const error = new HttpError(
      "You are not allowed to edit this article.",
      401
    );
    return next(error);
  }

  // const updatedArticle = { ...ARTICLES.find((a) => a.id === articleId) };
  // const articleIndex = ARTICLES.findIndex((a) => a.id === articleId);
  article.title = title;
  article.content = content;

  try {
    await article.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update article.",
      500
    );
    return next(error);
  }
  // ARTICLES[articleIndex] = updatedArticle;

  res.status(200).json({ article: article.toObject({ getters: true }) });
};

const deleteArticle = async (req, res, next) => {
  const articleId = req.params.articleId;

  let article;
  try {
    article = await Article.findById(articleId).populate("author");
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete article.",
      500
    );
    return next(error);
  }

  if (!article) {
    const error = new HttpError("Could not find article for this id.", 404);
    return next(error);
  }

  if (article.author.id !== req.userData.userId) {
    const error = new HttpError(
      "You are not allowed to delete this article.",
      401
    );
    return next(error);
  }

  const imagePath = article.image;

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await article.remove({ session: sess });
    article.author.articles.pull(article);
    await article.author.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete article.",
      500
    );
    return next(error);
  }

  fs.unlink(imagePath, (err) => {
    console.log(err);
  });

  res.status(200).json({ message: "Deleted place." });
};

const getArticleByCategory = async (req, res, next) => {
  const categories = req.params.categories;

  let categoryMatchedArticles;
  try {
    categoryMatchedArticles = await Article.find({
      categories: categories,
    })
      .populate({ path: "author", select: "-password" })
      .sort({ _id: -1 });
  } catch (error) {}
  // console.log(categoryMatchedArticles);
  // console.log("category based sorting done.");

  let countByCategory;
  try {
    countByCategory = await Article.count({ categories: categories });
  } catch (error) {}
  // console.log(countByCategory);
  // console.log(categoryMatchedArticles[0].author.name);
  // console.log(categoryMatchedArticles[0].populated("author"));

  res.json({
    categoryMatchedArticles: categoryMatchedArticles.map((article) =>
      article.toObject({ getters: true })
    ),
    countByCategory: countByCategory,
  });
};

const getArticleByTag = async (req, res, next) => {
  const tags = req.params.tags;
  console.log(tags);
  const userId = req.params.userId;

  let tagMatchedArticles;
  try {
    tagMatchedArticles = await Article.find({ tags: tags })
      .populate({ path: "author", select: "-password" })
      .sort({ _id: -1 });
    console.log(tagMatchedArticles[1].populated("author"));
  } catch (error) {}
  // console.log(tagMatchedArticles);
  // console.log("tag based sorting done");

  let countByTag;
  try {
    countByTag = await Article.count({ tags: tags });
  } catch (error) {}
  // console.log(countByTag);

  res.json({
    tagMatchedArticles: tagMatchedArticles.map((article) =>
      article.toObject({ getters: true })
    ),
    countByTag: countByTag,
  });
};

const countArticlesByCategory = async (req, res, next) => {
  const categories = req.params.categories;

  let countByCategory;
  try {
    countByCategory = await Article.count({ categories: categories });
  } catch (error) {}
  // console.log(countByCategory);
  // console.log("extracting data was succsessfull");

  res.json({ countByCategory: countByCategory });
};

const countArticlesByTag = async (req, res, next) => {
  const tags = req.params.tags;

  let countByTag;
  try {
    countByTag = await Article.count({ tags: tags });
  } catch (error) {}
  // console.log(countByTag);
  // console.log("extracting data was succsessfull");

  res.json({ countByTag: countByTag });
};

const sortArticleByTimestamp = (req, res, next) => {};

const getSpecificArticleById = async (req, res, next) => {
  const articleId = req.params.articleId;

  let article;
  try {
    article = await Article.findById(articleId)
      .populate({
        path: "author",
        select: "-password",
      })
      .populate({
        path: "comments",
        populate: { path: "user", select: "-password" },
      });
  } catch (error) {}
  console.log(article);
  // console.log(article.populated("author"));

  res.json({ article: article.toObject({ getters: true }) });
};

const sortArticleByPriceOrder = async (req, res, next) => {
  let results;
  let formCheapestToHighestPrice;
  let formHighestToCheapestPrice;
  if (req.query.q === "CheapestToHighest") {
    try {
      // formCheapestToHighestPrice = await Article.aggregate([
      //   {
      //     $sort: { price: 1 },
      //   },
      // ]);
      formCheapestToHighestPrice = await Article.find({})
        .populate({ path: "author", select: "-password" })
        .sort({ price: 1 });
      console.log(formCheapestToHighestPrice);
      results = formCheapestToHighestPrice;
    } catch (error) {}
  } else if (req.query.q === "HighestToCheapest") {
    try {
      // formHighestToCheapestPrice = await Article.aggregate([
      //   {
      //     $sort: { price: -1 },
      //   },
      // ]);
      formHighestToCheapestPrice = await Article.find({})
        .populate({ path: "author", select: "-password" })
        .sort({ price: -1 });

      console.log(formHighestToCheapestPrice);
      results = formHighestToCheapestPrice;
    } catch (error) {}
  }

  res.json({ results: results.map((r) => r.toObject({ getters: true })) });
};

const sortByDate = async (req, res, next) => {
  let results;
  let FromLatestSortedArticle;
  let FromOldestSortedArticle;
  if (req.query.date === "FromLatest") {
    try {
      FromLatestSortedArticle = await Article.find({})
        .populate({ path: "author", select: "-password" })
        .sort({ _id: -1 });
      console.log(FromLatestSortedArticle);
      results = FromLatestSortedArticle;
    } catch (error) {}
  } else if (req.query.date === "FromOldest") {
    try {
      FromOldestSortedArticle = await Article.find({})
        .populate({ path: "author", select: "-password" })
        .sort({ _id: 1 });
      console.log(FromOldestSortedArticle);
      results = FromOldestSortedArticle;
    } catch (error) {}
  }

  res.json({ results: results.map((r) => r.toObject({ getters: true })) });
};

const TagCountIndex = async (req, res, next) => {
  let responseArray = [];

  // get element(tag) form Article.tag field, and push it to array. = making tagName list.
  let articles;
  try {
    articles = await Article.find();
  } catch (error) {}
  // console.log(article[60].tags[0]);

  //list all tag of article documents
  let t = [];
  articles.forEach((v) => {
    for (let i = 0; i < v.tags.length; i++) {
      const element = v.tags[i];
      t.push(element);
    }
  });
  console.log(t);

  /// remove deplicate from t array
  let noDeplicateTagArray = t.reduce(function (accumulator, currentValue) {
    if (accumulator.indexOf(currentValue) === -1) {
      accumulator.push(currentValue);
    }
    return accumulator;
  }, []);
  console.log(noDeplicateTagArray);

  tagIndexArray = [];

  for (let i = 0; i < noDeplicateTagArray.length; i++) {
    const targetTag = noDeplicateTagArray[i];
    const r = articles.filter((v, i) => {
      return v.tags.includes(targetTag);
    });
    const countOfDocumentIncludeThisTag = r.length;
    const tagIndex = {
      tagName: targetTag,
      count: countOfDocumentIncludeThisTag,
    };
    responseArray.push(tagIndex);
  }

  console.log(responseArray);

  responseArray.sort((a, b) => {
    return b.count - a.count;
  });

  res.json({ responseArray });
};

const categoryCountIndex = async (req, res, next) => {
  let responseArray = [];
  ///

  let articles;
  try {
    articles = await Article.find();
  } catch (error) {}
  // console.log(article[60].tags[0]);

  //list all tag of article documents
  let c = [];
  articles.forEach((v) => {
    for (let i = 0; i < v.categories.length; i++) {
      const element = v.categories[i];
      c.push(element);
    }
  });
  console.log(c);

  /// remove deplicate from c array
  let noDeplicateCategoriesArray = c.reduce(function (
    accumulator,
    currentValue
  ) {
    if (accumulator.indexOf(currentValue) === -1) {
      accumulator.push(currentValue);
    }
    return accumulator;
  },
  []);
  console.log(noDeplicateCategoriesArray);

  // tagIndexArray = [];

  for (let i = 0; i < noDeplicateCategoriesArray.length; i++) {
    const targetCategory = noDeplicateCategoriesArray[i];
    const r = articles.filter((v, i) => {
      return v.categories.includes(targetCategory);
    });
    const countOfDocumentIncludeThisCategory = r.length;
    const categoryIndex = {
      categoryName: targetCategory,
      count: countOfDocumentIncludeThisCategory,
    };
    responseArray.push(categoryIndex);
  }

  console.log(responseArray);

  ///

  // let article;
  // try {
  //   article = await Article.find();
  // } catch (error) {}

  // let articleCategories = [];

  // for (let index = 0; index < article.length; index++) {
  //   const element = article[index];

  //   articleCategories.push(element.categories[0]);

  //   // console.log(articleCategories);
  // }

  // let noDeplicateCategoriesArray = articleCategories.reduce(function (
  //   accumulator,
  //   currentValue
  // ) {
  //   if (accumulator.indexOf(currentValue) === -1) {
  //     accumulator.push(currentValue);
  //   }
  //   return accumulator;
  // },
  // []);
  // // console.log(noDeplicateCategoriesArray);

  // for (let index = 0; index < noDeplicateCategoriesArray.length; index++) {
  //   const articleCategoriesName = noDeplicateCategoriesArray[index];
  //   // let articleTagsName = articleTags[i];
  //   let CategoryCount;
  //   try {
  //     CategoryCount = await Article.find({
  //       categories: articleCategoriesName,
  //     }).countDocuments();
  //     // console.log(CategoryCount);
  //   } catch (error) {}

  //   const CategoryIndex = {
  //     categoryName: articleCategoriesName,
  //     count: CategoryCount,
  //   };
  //   // console.log(CategoryIndex);

  //   responseArray.push(CategoryIndex);
  //   // console.log(responseArray);
  // }

  //des sort
  responseArray.sort((a, b) => {
    return b.count - a.count;
  });
  // console.log(responseArray);

  res.json({
    responseArray,
  });
};

const DownloadableOrNot = async (req, res, next) => {
  if (!!req.query.downloadable) {
    if (req.query.downloadable === "Downloadable") {
      try {
        articles = await Article.find({ downloadable: true })
          .populate({ path: "author", select: "-password" })
          .sort({ _id: -1 });
      } catch (error) {}
    } else if (req.query.downloadable === "WebOnly") {
      try {
        articles = await Article.find({ downloadable: false })
          .populate({ path: "author", select: "-password" })
          .sort({ _id: -1 });
      } catch (error) {}
    }
  }

  res.json({ articles: articles.map((a) => a.toObject({ getters: true })) });
};

const articlesBySameAuthorExceptTheCurrentOne = async (req, res, next) => {
  const articleId = req.params.articleId;
  const authorId = req.params.authorId;

  //same authors all of the other articles.
  let usersAllArticle;
  usersAllArticle = await Article.find({ author: authorId });

  //the current article which is being rendered now and want to exclude from 'same author's articles' recommendation.
  let articleToExclude;
  articleToExclude = await Article.findById(articleId);

  const articlesExceptTheCurrentOne = usersAllArticle.filter((a) => {
    return a.id !== articleToExclude.id;
  });
  console.log(articlesExceptTheCurrentOne);

  res.json({
    //これをspecificArticleの下のエリアに表示すればいい。必要なら最大数を10とかにLimitかける
    articlesExceptTheCurrentOne: articlesExceptTheCurrentOne.map((a) =>
      a.toObject({ getters: true })
    ),
  });
};

const averagePriceOfThisUsersArticles = async (req, res, next) => {
  const userId = req.params.userId;

  let sumOfPrice;
  let averagePriceOfThisUsersArticles;

  let articles;
  try {
    articles = await Article.find({ author: userId });
  } catch (error) {}

  let count = articles.length;
  console.log(count);

  if (Array.isArray(articles)) {
    sumOfPrice = articles
      .map(function (elm, index) {
        console.log(elm.price);
        return elm.price;
      })
      .reduce(function (previousValue, currentValue) {
        return previousValue + currentValue;
      }, 0);
    function getAverage(sum, count) {
      return sum / count;
    }
    console.log(sumOfPrice);
    averagePriceOfThisUsersArticles = getAverage(sumOfPrice, count);
  } else {
    return;
  }
  console.log(averagePriceOfThisUsersArticles);

  res.json({ averagePriceOfThisUsersArticles, sumOfPrice, count });
};
const getAllImagesOfUsersArticles = async (req, res, next) => {
  const userId = req.params.userId;

  let articles;
  try {
    articles = await Article.find({ author: userId });
  } catch (error) {}

  let array = [];
  // function concatImageArray(images) {
  //   return array.concat(images)
  // }
  let imagesArray;
  let imagesCount;

  // if (Array.isArray(articles)) {
  imagesArray = articles
    .map(function (elm, index) {
      console.log(elm.images);
      return elm.images;
    })
    .reduce(function (prev, current) {
      return prev + current;
    }, [])
    .split(",");
  console.log(imagesArray);
  imagesCount = imagesArray.length;
  // console.log(imagesCount);
  // }

  res.json({ imagesArray, imagesCount });
};

const addViewCountToArticle = async (req, res, next) => {
  const articleId = req.params.articleId;
  let existingArticle;
  try {
    existingArticle = await Article.findById(articleId);
  } catch (error) {
    console.log(error);
  }

  const currentViewCount = existingArticle.viewCount;
  const updatedViewCount = currentViewCount + 1;

  try {
    await Article.findByIdAndUpdate(
      { _id: articleId },
      { viewCount: updatedViewCount }
    );
  } catch (error) {
    console.log(error);
  }

  res.json({ message: "add views count + 1" });
};

const getTop5MostViewedArticles = async (req, res, next) => {
  let articles;
  try {
    // top 5 most viewed articles
    articles = await Article.find(
      {},
      "-contents -location -referenceSites -externalSites"
    )
      .populate({
        path: "author",
        select: "-password",
      })
      .sort({ viewCount: -1 })
      .limit(5);
  } catch (error) {
    console.log(error);
  }
  for (let index = 0; index < articles.length; index++) {
    const element = articles[index];
    console.log(element.viewCount);
  }
  console.log(articles.length);

  res.json({ articles: articles.map((a) => a.toObject({ getters: true })) });
};

const addArticleToStaredList = async (req, res, next) => {
  const userId = req.params.userId;
  const articleId = req.params.articleId;

  let user;
  let article;
  try {
    article = await Article.findById(articleId);
  } catch (error) {
    console.log(error);
  }

  await article.staredBy.push(userId);
  await article.save();

  // try {
  //   await (await User.findByIdAndUpdate(userId, { staredArticles: articleId })).save();
  // } catch (error) {
  //   console.log(error);
  // }

  try {
    user = await User.findById(userId);
  } catch (error) {}

  user.staredArticles.push(articleId);
  await user.save();
  let updatedUser;
  try {
    updatedUser = await User.findById(userId).populate("staredArticles");
  } catch (error) {}

  const message = "successfully stared this article";

  res.json({ updatedUser, message });
};

const getStaredArticles = async (req, res, next) => {
  const userId = req.params.userId;
  const query = req.query.q;
  const tag = req.query.tag;
  const category = req.query.category;
  let user;
  try {
    user = await User.findById(userId).populate({
      path: "staredArticles",
      populate: { path: "author", select: "-password" },
    });
  } catch (error) {}
  let staredArticles;

  switch (query) {
    case "most-viewed":
      const mostViewedFilter = (user) => {
        const a = user.staredArticles;
        const staredArticles = a.sort((a, b) => {
          return b.viewCount - a.viewCount;
        });
        return staredArticles;
      };
      staredArticles = mostViewedFilter(user);

      break;

    case "least-viewed":
      const leastViewedFilter = (user) => {
        const a = user.staredArticles;
        const staredArticles = a.sort((a, b) => {
          return a.viewCount - b.viewCount;
        });
        return staredArticles;
      };
      staredArticles = leastViewedFilter(user);

      break;

    case "downloadable":
      const downloadableFilter = (user) => {
        const a = user.staredArticles;
        const staredArticles = a.filter((v, i) => {
          return v.downloadable === true;
        });
        return staredArticles;
      };
      staredArticles = downloadableFilter(user);

      break;

    case "web-only":
      const webOnlyFilter = (user) => {
        const a = user.staredArticles;
        const staredArticles = a.filter((v, i) => {
          return v.downloadable === false;
        });
        return staredArticles;
      };
      staredArticles = webOnlyFilter(user);
      break;

    case "from-highest-price":
      const FromHighestPriceFilter = (user) => {
        const a = user.staredArticles;
        const staredArticles = a.sort((a, b) => {
          return b.price - a.price;
        });
        return staredArticles;
      };
      staredArticles = FromHighestPriceFilter(user);
      break;

    case "from-lowest-price":
      const FromLowestPriceFilter = (user) => {
        const a = user.staredArticles;
        const staredArticles = a.sort((a, b) => {
          return a.price - b.price;
        });
        return staredArticles;
      };
      staredArticles = FromLowestPriceFilter(user);
      break;

    case "from-highest-comment-count":
      const fromHighestCommentCount = (user) => {
        const a = user.staredArticles;
        const staredArticles = a.sort((a, b) => {
          return b.comments.length - a.comments.length;
        });
        return staredArticles;
      };
      staredArticles = fromHighestCommentCount(user);
      break;

    case "from-lowest-comment-count":
      const fromLowestCommentCount = (user) => {
        const a = user.staredArticles;
        const staredArticles = a.sort((a, b) => {
          return a.comments.length - b.comments.length;
        });
        return staredArticles;
      };
      staredArticles = fromLowestCommentCount(user);
      break;

    case "from-highest-star-count":
      const fromHighestStarCount = (user) => {
        const a = user.staredArticles;
        const staredArticles = a.sort((a, b) => {
          return b.staredBy.length - a.staredBy.length;
        });
        return staredArticles;
      };
      staredArticles = fromHighestStarCount(user);
      break;

    case "from-lowest-star-count":
      const fromLowestStarCount = (user) => {
        const a = user.staredArticles;
        const staredArticles = a.sort((a, b) => {
          return a.staredBy.length - b.staredBy.length;
        });
        return staredArticles;
      };
      staredArticles = fromLowestStarCount(user);
      break;

    case "tag-search":
      const tagSearch = (user) => {
        const a = user.staredArticles;

        const staredArticles = a.filter((v, i) => {
          return v.tags.some((v, i) => v === tag);
        });
        // or a.filter((v, i) => {
        //return v.tags.includes(tag);
        ///});

        return staredArticles;
      };
      staredArticles = tagSearch(user);

      break;

    case "category-search":
      const categorySearch = (user) => {
        const a = user.staredArticles;
        const staredArticles = a.filter((v, i) => {
          return v.categories.includes(category);
        });
        return staredArticles;
      };
      staredArticles = categorySearch(user);
      break;

    default:
      staredArticles = user.staredArticles;
      break;
  }

  console.log(user);
  staredArticles.map((v) => {
    console.log(v);
  });

  // console.log(user.staredArticles[0].title);
  // console.log(staredArticles.length);
  // console.log(staredArticles[0].tags);

  res.json({
    staredArticles: staredArticles.map((v, i) => v.toObject({ getters: true })),
  });
};

const getArticlesOfUsersYouAreFollowing = async (req, res, next) => {
  const userId = req.params.userId;

  let user;
  try {
    user = await User.findById(userId).populate({
      path: "following",
      populate: { path: "articles" },
    });
  } catch (error) {
    console.log(error);
  }

  console.log(user);

  // r = user.following.articles
  const r = user.following.map((v) => {
    return v.articles;
  });

  console.log(r.length);

  // response array
  const result = [];

  //accessing articles array
  for (let index = 0; index < r.length; index++) {
    const element = r[index];
    //mapping each article document in articles array and pushing it into result array
    element.forEach((v) => {
      result.push(v);
    });
  }
  console.log(result);

  res.status(200).json({ result });
};

const getStaredArticlesOfPeopleYouAreFollowing = async (req, res, next) => {
  // get list of articles which are 'stared' by someone you are following. = user.following.staredArticles;
  const userId = req.params.userId;

  let user;
  try {
    user = await User.findById(userId).populate({
      path: "following",
      populate: "staredArticles",
    });
  } catch (error) {
    console.log(error);
  }

  console.log(user);

  // user.following.staredArticles
  const staredArticlesOfFollowing = user.following.map((v) => {
    return v.staredArticles;
  });

  //response array
  const result = [];

  //accessing staredArticles
  for (let index = 0; index < staredArticlesOfFollowing.length; index++) {
    const element = staredArticlesOfFollowing[index];
    // mapping each article document in staredArticles array of following and pushing it into result array
    element.forEach((v) => {
      result.push(v);
    });
  }

  console.log(result);

  res.json({ result });
};

const addCommentsToArticle = async (req, res, next) => {
  const userId = req.params.userId;
  const articleId = req.params.articleId;
  const { comment } = req.body;

  const createdArticleComment = new ArticleComment({
    user: userId,
    article: articleId,
    comment: comment,
    createdAt: new Date(Date.now()).toString(),
  });

  await createdArticleComment.save();

  console.log(createdArticleComment);

  let user;
  let article;

  try {
    user = await User.findById(userId);
  } catch (error) {
    console.log(user);
  }

  console.log(user);

  await user.article_comments.push(createdArticleComment);
  await user.save();

  try {
    article = await Article.findById(articleId);
  } catch (error) {
    console.log(error);
  }
  await article.comments.push(createdArticleComment);
  await article.save();
  console.log(article);

  res.json({ user });
};

const getByWhomArticleWasVisited = async (req, res, next) => {
  // foot print functionality. get by whom article was visited. reverse side of user.articleHistories.

  const articleId = req.params.articleId;
  let article;
  try {
    article = await Article.findById(articleId).populate({
      path: "historiedBy",
      select: "-password",
    });
  } catch (error) {
    console.log(error);
  }

  res.json({ article });
};

// const searchQuery = async(req, res, next) => {
//   let results;
//   try {
//     results = await Article.aggregate([
//     {
//       $search: {
//         queryString: {
//           defaultPath: "content",
//           query: "a",
//         },
//       },
//     },
//     {
//       $limit: 3,
//     },
//     {
//       $project: {
//         _id: 0,
//         title: 1,
//         content: 1,
//         image: 0,
//         address: 0,
//         location: 0,
//         author: 0
//       },
//     },
//   ]);
//   } catch (error) {

//   }
//   res.json({results: results.map(r => r.toObject({getters: true}))})
// }

// const searchQuery = (params) => {
//   const querystring = require("querystring");

//   const query = Article.find({ title: "Jean-Luc Picard" });
//   const searchQuery = query.getFilter();
//   const queryURLByTitle = querystring.stringify(searchQuery);
//   const finalURL = `http://localhost500/api/articles/search?${queryURLByTitle}`;
//   // => searchURL for querying Article document by title property
//   // client でクリックにfinalURLへのPOSTリクエストを割り当てる？？

//   const query = req.query.q;
//   const searchResult = Article.find({ title: query });
//   res.json({ searchResult });

// }

exports.getArticleById = getArticleById;
exports.getArticlesByUserId = getArticlesByUserId;
exports.createArticle = createArticle;
exports.updateArticle = updateArticle;
exports.deleteArticle = deleteArticle;
exports.pushArticleToWishlist = pushArticleToWishlist;
exports.getArticleByCategory = getArticleByCategory;
exports.getArticleByTag = getArticleByTag;
exports.countArticlesByCategory = countArticlesByCategory;
exports.countArticlesByTag = countArticlesByTag;
exports.allArticles = allArticles;
exports.getSpecificArticleById = getSpecificArticleById;
exports.sortArticleByPriceOrder = sortArticleByPriceOrder;
exports.sortByDate = sortByDate;

exports.TagCountIndex = TagCountIndex;
exports.categoryCountIndex = categoryCountIndex;
exports.DownloadableOrNot = DownloadableOrNot;
exports.articlesBySameAuthorExceptTheCurrentOne = articlesBySameAuthorExceptTheCurrentOne;

exports.averagePriceOfThisUsersArticles = averagePriceOfThisUsersArticles;

exports.getAllImagesOfUsersArticles = getAllImagesOfUsersArticles;
exports.addViewCountToArticle = addViewCountToArticle;

exports.getTop5MostViewedArticles = getTop5MostViewedArticles;
exports.addArticleToStaredList = addArticleToStaredList;
exports.getStaredArticles = getStaredArticles;
exports.getArticlesOfUsersYouAreFollowing = getArticlesOfUsersYouAreFollowing;
exports.getStaredArticlesOfPeopleYouAreFollowing = getStaredArticlesOfPeopleYouAreFollowing;
exports.addCommentsToArticle = addCommentsToArticle;
exports.getByWhomArticleWasVisited = getByWhomArticleWasVisited;
