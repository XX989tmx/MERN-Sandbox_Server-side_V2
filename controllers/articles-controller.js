const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");
const mongoose = require('mongoose');

const HttpError = require("../models/http-error");
const getCoordsForAddress = require('../util/location');
const Article = require('../models/article');
const User = require('../models/user');
const mongooseUniqueValidator = require("mongoose-unique-validator");

let ARTICLES = [
  {
    id: "a1",
    title: "BIOS",
    content:
      "BIOS (pronounced: /ˈbaɪɒs/, BY-oss; an acronym for Basic Input/Output System and also known as the System BIOS, ROM BIOS or PC BIOS) is firmware used to perform hardware initialization during the booting process (power-on startup), and to provide runtime services for operating systems and programs.[1] The BIOS firmware comes pre-installed on a personal computer's system board, and it is the first software to run when powered on. The name originates from the Basic Input/Output System used in the CP/M operating system in 1975.[2][3] The BIOS originally proprietary to the IBM PC has been reverse engineered by companies looking to create compatible systems. The interface of that original system serves as a de facto standard.The BIOS in modern PCs initializes and tests the system hardware components, and loads a boot loader from a mass memory device which then initializes an operating system. In the era of DOS, the BIOS provided a hardware abstraction layer for the keyboard, display, and other input/output (I/O) devices that standardized an interface to application programs and the operating system. More recent operating systems do not use the BIOS after loading, instead accessing the hardware components directly.Most BIOS implementations are specifically designed to work with a particular computer or motherboard model, by interfacing with various devices that make up the complementary system chipset. Originally, BIOS firmware was stored in a ROM chip on the PC motherboard. In modern computer systems, the BIOS contents are stored on flash memory so it can be rewritten without removing the chip from the motherboard. This allows easy, end-user updates to the BIOS firmware so new features can be added or bugs can be fixed, but it also creates a possibility for the computer to become infected with BIOS rootkits. Furthermore, a BIOS upgrade that fails can brick the motherboard permanently, unless the system includes some form of backup for this case.Unified Extensible Firmware Interface (UEFI) is a successor to the legacy PC BIOS, aiming to address its technical shortcomings.[4]",
    author: "u1",
    category: "computer",
    location: {
      lat: 40.7484474,
      lng: -73.9871516,
    },
    address: "11 Wall St, New York, NY 10005",
  },
  {
    id: "a2",
    title: "Memory address",
    content:
      "In computing, a memory address is a reference to a specific memory location used at various levels by software and hardware. Memory addresses are fixed-length sequences of digits conventionally displayed and manipulated as unsigned integers.[1] Such numerical semantic bases itself upon features of CPU (such as the instruction pointer and incremental address registers), as well upon use of the memory like an array endorsed by various programming languages.",
    author: "u3",
    category: "computer",
    location: {
      lat: 40.7487836,
      lng: -73.98615769999999,
    },
    address: "20 W 34th St, New York, NY 10001",
  },
  {
    id: "a3",
    title: "3",
    content: "a",
    author: "u3",
    category: "computer",
    location: {
      lat: 51.757988,
      lng: -1.2621596,
    },
    address: "Oxford OX1 2JD, United Kingdom",
  },
];

const getArticleById = async (req, res, next) => {
  const articleId = req.params.articleId;

  let article;
  try {
    article = await Article.findById(articleId);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not find a place.', 500
    );
    return next(error);
  }
  
  if (!article) {
    const error = new HttpError("Could not find a place for the provided id.", 404);
    return next(error);
  }

  res.json({ article: article.toObject({getters: true}) });
};

const getArticlesByUserId = async (req, res, next) => {
  const userId = req.params.userId;

  let articles;
  try {
    articles = await Article.find({author: userId});
  } catch (err) {
    const error = new HttpError(
      'Fetching articles failed, please try again later', 500
    );
    return next(error);
  }
  
  // const articles = ARTICLES.filter((a) => {
  //   return a.author === userId;
  // });

  if (!articles || articles.length === 0) {
    return next(
      new HttpError("Could not find a articles for the provided user id.", 404)
    );
  }

  res.json({ article: articles.map(article => article.toObject({getters: true})) });
};

const createArticle = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);

    return next(new HttpError("Invalid inputs passed, please check your data.", 422));
  }

  const { title, content, author, address } = req.body;

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
    image: "imageurl",
    author: author
  });

  let user;

  try {
    user = await User.findById(author);
  } catch (err) {
    const error = new HttpError(
      'Creating article failed, please try again.',
      500
    );
    return next(error)
  }

  if (!user) {
    const error = new HttpError(
      'Could not find user for provided id', 404
    );
    return next(error);
  }

  console.log(user);
  

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdArticle.save({session: sess});
    user.articles.push(createdArticle);
    await user.save({session: sess});
    await sess.commitTransaction();

  } catch (err) {
    const error = new HttpError(
      'Creating article failed, please try again.', 500
    )
    return next(error)
  }
  

  res.status(201).json({ article: createdArticle });
};

const updateArticle = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid inputs passed, please check your data.", 422));
  }

  const { title, content } = req.body;
  const articleId = req.params.articleId;

  let article;
  try {
    article = await Article.findById(articleId);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update article.',500 
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

  res.status(200).json({ article: article.toObject({getters: true}) });
};

const deleteArticle = async (req, res, next) => {
  const articleId = req.params.articleId;
  
  let article;
  try {
    article = await Article.findById(articleId);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete article.', 500
    );
    return next(error);
  }

  try {
    await article.remove();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete article.",
      500
    );
    return next(error);
  }

  res.status(200).json({ message: "Deleted place." });
};

exports.getArticleById = getArticleById;
exports.getArticlesByUserId = getArticlesByUserId;
exports.createArticle = createArticle;
exports.updateArticle = updateArticle;
exports.deleteArticle = deleteArticle;
