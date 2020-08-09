const fs = require("fs");
const path = require("path");

const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");
const mongoose = require("mongoose");

const HttpError = require("../models/http-error");
const getCoordsForAddress = require("../util/location");
const Article = require("../models/article");
const User = require("../models/user");
const mongooseUniqueValidator = require("mongoose-unique-validator");

const allArticles = async (req, res, next) => {
  // const query = req.query.q;
  let articles;
  let query = {};
  if (req.query.q && req.query.and === "true") {
    try {
      query = {
        $and: [
          { title: { $regex: req.query.q, $options: "i" } },
          { content: { $regex: req.query.q, $options: "i" } },
        ],
      };
      articles = await Article.find(query).sort({ _id: -1 });
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
        articles = await Article.find(query).sort({ _id: 1 });
        // articles = await Article.find().sort({ date_created: -1 });
      } catch {}
    } else {
      try {
        articles = await Article.find().sort({ _id: -1 });
      } catch {}
    }
  } else if (req.query.categories) {
    articles = await Article.find({ categories: req.query.categories }).sort({
      _id: -1,
    });
  } else if (req.query.tags) {
    articles = await Article.find({ tags: req.query.tags }).sort({
      _id: -1,
    });
  } else if (req.query.price) {
    switch (req.query.price) {
      case "0~499":
        articles = await Article.find({ price: { $gt: 0, $lte: 499 } }).sort({
          _id: -1,
        });
        break;
      case "500~999":
        articles = await Article.find({ price: { $gte: 500, $lte: 999 } }).sort(
          {
            _id: -1,
          }
        );
        break;
      case "1000~1999":
        articles = await Article.find({
          price: { $gte: 1000, $lte: 1999 },
        }).sort({
          _id: -1,
        });
        break;
      case "2000~4999":
        articles = await Article.find({
          price: { $gte: 2000, $lte: 4999 },
        }).sort({
          _id: -1,
        });
        break;
      case "5000~9999":
        articles = await Article.find({
          price: { $gte: 5000, $lte: 9999 },
        }).sort({
          _id: -1,
        });
        break;
      case "10000~":
        articles = await Article.find({
          price: { $gte: 10000 },
        }).sort({
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
      articles = await Article.find(query).sort({ _id: -1 });
    } catch (error) {}
  } else {
    try {
      articles = await Article.find().sort({ _id: -1 });
    } catch (error) {}

    try {
      count = await Article.count();
    } catch (error) {}
    console.log(count);
  }

  res.json({
    articles: articles.map((a) => a.toObject({ getters: true })),
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

  let userWithArticles;
  try {
    userWithArticles = await User.findById(userId).populate("articles");
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

  if (!userWithArticles || userWithArticles.length === 0) {
    return next(
      new HttpError("Could not find a articles for the provided user id.", 404)
    );
  }

  res.json({
    articles: userWithArticles.articles.map((article) =>
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

  const { title, content, author, address, categories, tags, price } = req.body;

  fs.appendFileSync(path.join("downloads", "txtFiles", "sample.txt"), title);
  console.log('The "article title" was appended to file!');
  fs.appendFileSync(path.join("downloads", "txtFiles", "sample.txt"), content);
  console.log('The "article content" was appended to file!');

  let coordinates;
  try {
    coordinates = await getCoordsForAddress(address);
  } catch (error) {
    return next(error);
  }

  const createdArticle = new Article({
    title: title,
    content: content,
    address: address,
    location: coordinates,
    image: req.file.path,
    author: author,
    wishlists: [],
    categories: categories,
    date_created: new Date(Date.now()).toString(),
    tags: tags,
    price: price,
  });

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

  console.log(user);

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
    }).sort({ _id: -1 });
  } catch (error) {}
  console.log(categoryMatchedArticles);
  console.log("category based sorting done.");

  let countByCategory;
  try {
    countByCategory = await Article.count({ categories: categories });
  } catch (error) {}
  console.log(countByCategory);

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
    tagMatchedArticles = await Article.find({ tags: tags }).sort({ _id: -1 });
  } catch (error) {}
  console.log(tagMatchedArticles);
  console.log("tag based sorting done");

  let countByTag;
  try {
    countByTag = await Article.count({ tags: tags });
  } catch (error) {}
  console.log(countByTag);

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
  console.log(countByCategory);
  console.log("extracting data was succsessfull");

  res.json({ countByCategory: countByCategory });
};

const countArticlesByTag = async (req, res, next) => {
  const tags = req.params.tags;

  let countByTag;
  try {
    countByTag = await Article.count({ tags: tags });
  } catch (error) {}
  console.log(countByTag);
  console.log("extracting data was succsessfull");

  res.json({ countByTag: countByTag });
};

const sortArticleByTimestamp = (req, res, next) => {};

const getSpecificArticleById = async (req, res, next) => {
  const articleId = req.params.articleId;

  let article;
  try {
    article = await Article.findById(articleId);
  } catch (error) {}
  console.log(article);

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
      formCheapestToHighestPrice = await Article.find({}).sort({ price: 1 });
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
      formHighestToCheapestPrice = await Article.find({}).sort({ price: -1 });
      
      console.log(formHighestToCheapestPrice);
      results = formHighestToCheapestPrice;
    } catch (error) {}
  }

  res.json({ results: results.map(r => r.toObject({getters:true})) });
};

const sortByDate = async(req, res, next) => {
  let results;
  let FromLatestSortedArticle;
  let FromOldestSortedArticle;
  if (req.query.date === "FromLatest") {
    try {
      FromLatestSortedArticle = await Article.find({}).sort({ _id: -1});
      console.log(FromLatestSortedArticle);
      results = FromLatestSortedArticle;
    } catch (error) {
      
    }
  } else if (req.query.date === "FromOldest") {
    try {
      FromOldestSortedArticle = await Article.find({}).sort({ _id: 1 });
      console.log(FromOldestSortedArticle);
      results = FromOldestSortedArticle;
    } catch (error) {
      
    }
  }

  res.json({results: results.map(r => r.toObject({getters: true}))})
}

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