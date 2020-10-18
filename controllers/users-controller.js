// const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const HttpError = require("../models/http-error");
const User = require("../models/user");
const UserDetailInfo = require("../models/user-detail-info");
const aws = require("aws-sdk");
const fs = require("fs");
const path = require("path");
const user = require("../models/user");
const Profile = require("../models/profile");

// const USERS = [
//   {
//     id: "u1",
//     name: "tom",
//     email: "test@test.com",
//     password: "testers",
//   }
// ];

const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, "-password");
  } catch (err) {
    const error = new HttpError(
      "Fetching users failed, please try again later.",
      500
    );
    return next(error);
  }
  console.log(users);
  res.json({ users: users.map((user) => user.toObject({ getters: true })) });
};

const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);

    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { name, email, password } = req.body;

  // fs.appendFileSync(path.join("downloads", "txtFiles", "sample.txt"), name);
  // console.log('The "User Name" was appended to file!');
  // fs.appendFileSync(path.join("downloads", "excelFiles", "username.xlsx"), name);
  // console.log('The "User Name" was appended to file!');
  // fs.appendFileSync(path.join("downloads", "txtFiles", "sample.txt"), email);
  // console.log('The "User Email" was appended to file!');

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = HttpError("Signing up failed, please try again later.", 500);
    return next(error);
  }

  if (existingUser) {
    const error = new HttpError(
      "User exists already, please login instead.",
      422
    );
    return next(error);
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    const error = new HttpError(
      "Could not create user, please try again.",
      500
    );
    return next(error);
  }

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
    Key: req.file.filename,
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

  const createdUser = new User({
    name: name,
    email: email,
    image: url,
    password: hashedPassword,
    articles: [],
  });

  try {
    await createdUser.save();
    // ARTICLES.push(createdArticle);
  } catch (err) {
    const error = new HttpError("Signing up failed, please try again.", 500);
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      { userId: createdUser.id, email: createdUser.email },
      process.env.JWT_KEY,
      { expiresIn: "1h" }
    );
  } catch (err) {
    const error = new HttpError("Signing up failed, please try again.", 500);
    return next(error);
  }

  res
    .status(201)
    .json({ userId: createdUser.id, email: createdUser.email, token: token });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = HttpError("Logging in failed, please try again later.", 500);
    return next(error);
  }

  if (!existingUser) {
    const error = new HttpError(
      "Invalid credentials, could not log you in.",
      403
    );
    return next(error);
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    const error = new HttpError(
      "Could not log you in, please check your credentials and try again.",
      500
    );
    return next(error);
  }

  if (!isValidPassword) {
    const error = new HttpError(
      "Invalid credentials, could not log you in.",
      403
    );
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      { userId: existingUser.id, email: existingUser.email },
      process.env.JWT_KEY,
      { expiresIn: "1h" }
    );
  } catch (err) {
    const error = new HttpError("Logging in failed, please try again.", 500);
    return next(error);
  }

  res.json({
    userId: existingUser.id,
    email: existingUser.email,
    token: token,
  });
};

const createUserDetailInfo = async (req, res, next) => {
  const user_id = req.params.userId;
  console.log(user_id);

  const {
    country,
    zip_code,
    todoufuken,
    shichousonku,
    banchi,
    name_of_residence,
    phone_number,
  } = req.body;
  console.log(zip_code);

  const createdUserDetailInfo = new UserDetailInfo({
    user_id,
    country: country,
    zip_code: zip_code,
    todoufuken: todoufuken,
    shichousonku: shichousonku,
    banchi: banchi,
    name_of_residence: name_of_residence,
    phone_number: phone_number,
  });

  // let existingUser;
  // try {
  //   existingUser = await User.findById(user_id);
  //   console.log(existingUser.email);
  // } catch (error) {

  // };

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdUserDetailInfo.save({ session: sess });
    // existingUser.user_detail_infos.push(createdUserDetailInfo.id);
    // await existingUser.save({ session: sess });
    await sess.commitTransaction();
  } catch (error) {
    console.log(error);
  }

  res.status(201).json({
    country: createdUserDetailInfo.country,
    zip_code: createdUserDetailInfo.zip_code,
    todoufuken: createdUserDetailInfo.todoufuken,
    shichousonku: createdUserDetailInfo.shichousonku,
    banchi: createdUserDetailInfo.banchi,
    name_of_residence: createdUserDetailInfo.name_of_residence,
    phone_number: createdUserDetailInfo.phone_number,
    a: "a",
  });
};

const showUserDetailInfo = async (req, res, next) => {
  const user_id = req.params.userId;

  let existingUserDetailInfo;
  try {
    // existingUserDetailInfo = await UserDetailInfo.find()
    //   { user_id: user_id },
    //   { sort: { $natural: -1 } }
    // );
    existingUserDetailInfo = await UserDetailInfo.find({ user_id: user_id })
      .limit(1)
      .sort({ $natural: -1 });
    console.log(existingUserDetailInfo[0]);
    console.log(existingUserDetailInfo[0].zip_code);
  } catch (error) {}

  res.json({
    country: existingUserDetailInfo[0].country,
    zip_code: existingUserDetailInfo[0].zip_code,
    todoufuken: existingUserDetailInfo[0].todoufuken,
    shichousonku: existingUserDetailInfo[0].shichousonku,
    banchi: existingUserDetailInfo[0].banchi,
    name_of_residence: existingUserDetailInfo[0].name_of_residence,
    phone_number: existingUserDetailInfo[0].phone_number,
  });
};

const updateUserDetailInfo = async (req, res, next) => {
  const user_id = req.params.userId;
  const {
    country,
    zip_code,
    todoufuken,
    shichousonku,
    banchi,
    name_of_residence,
    phone_number,
  } = req.body;

  let existingUserDetailInfo;
  try {
    existingUserDetailInfo = await UserDetailInfo.find({ user_id: user_id })
      .limit(1)
      .sort({ $natural: -1 });
  } catch (error) {}

  existingUserDetailInfo[0].country = country;
  existingUserDetailInfo[0].zip_code = zip_code;
  existingUserDetailInfo[0].todoufuken = todoufuken;
  existingUserDetailInfo[0].shichousonku = shichousonku;
  existingUserDetailInfo[0].banchi = banchi;
  existingUserDetailInfo[0].name_of_residence = name_of_residence;
  existingUserDetailInfo[0].phone_number = phone_number;

  console.log(existingUserDetailInfo[0]);

  try {
    existingUserDetailInfo[0].save();
  } catch (error) {}

  res.json({
    country: existingUserDetailInfo[0].country,
    zip_code: existingUserDetailInfo[0].zip_code,
    todoufuken: existingUserDetailInfo[0].todoufuken,
    shichousonku: existingUserDetailInfo[0].shichousonku,
    banchi: existingUserDetailInfo[0].banchi,
    name_of_residence: existingUserDetailInfo[0].name_of_residence,
    phone_number: existingUserDetailInfo[0].phone_number,
  });
};

const followOtherUser = async (req, res, next) => {
  const userId = req.params.userId;
  const followingCandidateId = req.params.followingCandidateId;

  let user; // you
  let userYouWantToFollow;
  try {
    user = await User.findById(userId);
  } catch (error) {
    console.log(error);
  }

  await user.following.push(followingCandidateId);
  await user.save();

  try {
    userYouWantToFollow = await User.findById(followingCandidateId);
  } catch (error) {
    console.log(error);
  }

  await userYouWantToFollow.followedBy.push(userId);
  await userYouWantToFollow.save();

  const message = `Successfully Followed ${userYouWantToFollow.name}`;

  res.status(200).json({ user, message });
};

const getUsersYouAreFollowing = async (req, res, next) => {
  const userId = req.params.userId;

  let user;
  try {
    user = await User.findById(userId).populate("following");
  } catch (error) {
    console.log(error);
  }

  const peopleYouAreFollowing = user.following;

  res.status(200).json({ peopleYouAreFollowing });
};

const getUsersFollowingYou = async (req, res, next) => {
  const userId = req.params.userId;

  let user;
  try {
    user = await User.findById(userId).populate("followedBy");
  } catch (error) {
    console.log(error);
  }

  const peopleFollowingYou = user.followedBy;

  res.status(200).json({ peopleFollowingYou });
};

const getFollowingOfFollowingOfYou = async (req, res, next) => {
  // = user.following.following
  const userId = req.params.userId;
  let user;
  try {
    user = await User.findById(userId).populate({
      path: "following",
      populate: "following",
    });
  } catch (error) {
    console.log(error);
  }

  console.log(user);

  //user.following.following
  const followingOfFollowing = user.following.map((v) => {
    return v.following;
  });

  // response array = people whom you are following is following
  const result = [];

  //accessing following
  for (let index = 0; index < followingOfFollowing.length; index++) {
    const element = followingOfFollowing[index];
    // mapping each user document in following array of user.following and pushing it into result array;
    element.forEach((v) => {
      result.push(v);
    });
  }

  res.status(200).json({ result });
};

const getFollowedByOfFollowingOfYou = async (req, res, next) => {
  // = user.following.followedBy;
  const userId = req.params.userId;
  let user;
  try {
    user = await User.findById(userId).populate({
      path: "following",
      populate: "followedBy",
    });
  } catch (error) {
    console.log(error);
  }

  // need to subtract 'you' from user list. user.following.followedBy(except you) is target here.

  console.log(user);

  res.status(200).json({ user });
};

const getFollowedByOfFollowedByOfYou = async (req, res, next) => {
  // = user.followedBy.followedBy;
  const userId = req.params.userId;
  let user;
  try {
    user = await User.findById(userId).populate({
      path: "followedBy",
      populate: "followedBy",
    });
  } catch (error) {
    console.log(error);
  }

  res.json({ user });
};

const getFollowingOfFollowedByOfYou = async (req, res, next) => {
  // = user.followedBy.following; except you
  const userId = req.params.userId;
  let user;
  try {
    user = await User.findById(userId).populate({
      path: "followedBy",
      populate: "following",
    });
  } catch (error) {
    console.log(error);
  }

  console.log(user);

  res.json({ user });
};

const getAllOfTheArticleCommentsOfThisUser = async (req, res, next) => {
  const userId = req.params.userId;
  let user;
  try {
    user = await User.findById(userId).populate("article_comments");
  } catch (error) {
    console.log(error);
  }
  console.log(user);

  res.json({ user });
};

const getArticleCommentsOfFollowingOfYou = async (req, res, next) => {
  const userId = req.params.userId;

  let user;
  try {
    user = await User.findById(userId).populate({
      path: "following",
      populate: "article_comments",
    });
  } catch (error) {
    console.log(error);
  }

  console.log(user);

  res.json({ user });
};

const addProfile = async (req, res, next) => {
  const userId = req.params.userId;
  const {
    nickname,
    introduce_yourself,
    state,
    city,
    things_you_likes,
    things_you_hates,
    school,
    company,
  } = req.body;

  let things_you_likes_array = things_you_likes.split(",");
  let things_you_hates_array = things_you_hates.split(",");

  const createdProfile = new Profile({
    userId: userId,
    nickname: nickname,
    introduce_yourself: introduce_yourself,
    state: state,
    city: city,
    things_you_likes: [],
    things_you_hates: [],
    school: school,
    company: company,
  });

  for (let index = 0; index < things_you_likes_array.length; index++) {
    const element = things_you_likes_array[index];
    createdProfile.things_you_likes.push(element);
  }

  for (let index = 0; index < things_you_hates_array.length; index++) {
    const element = things_you_hates_array[index];
    createdProfile.things_you_hates.push(element);
  }

  await createdProfile.save();

  let user;
  try {
    user = await User.findById(userId);
  } catch (error) {
    console.log(error);
  }
  user.profile = createdProfile._id;
  await user.save();

  res.json({ user });
};

const getUserWithProfile = async (req, res, next) => {
  const userId = req.params.userId;

  let user;
  try {
    user = await User.findById(userId).populate("profile");
  } catch (error) {
    console.log(error);
  }

  res.json({ user });
};

const getSpecificUser = async (req, res, next) => {
  // 'other' users specific page

  const userId = req.params.userId;

  let user;

  try {
    user = await User.findById(userId, "-password")
      .populate("staredArticles")
      .populate("articles")
      .populate("followedBy")
      .populate("following")
      .populate("profile")
      .populate("videos")
      .populate({
        path: "article_comments",
        populate: { path: "article", select: "-contents" },
      });
  } catch (error) {
    console.log(error);
  }

  let result = [];
  result.push(user);

  res.json({ result: result.map((v) => v.toObject({ getters: true })) });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
exports.createUserDetailInfo = createUserDetailInfo;
exports.showUserDetailInfo = showUserDetailInfo;
exports.updateUserDetailInfo = updateUserDetailInfo;
exports.followOtherUser = followOtherUser;
exports.getUsersYouAreFollowing = getUsersYouAreFollowing;
exports.getUsersFollowingYou = getUsersFollowingYou;
exports.getFollowingOfFollowingOfYou = getFollowingOfFollowingOfYou;
exports.getFollowedByOfFollowingOfYou = getFollowedByOfFollowingOfYou;
exports.getFollowedByOfFollowedByOfYou = getFollowedByOfFollowedByOfYou;
exports.getFollowingOfFollowedByOfYou = getFollowingOfFollowedByOfYou;
exports.getAllOfTheArticleCommentsOfThisUser = getAllOfTheArticleCommentsOfThisUser;
exports.getArticleCommentsOfFollowingOfYou = getArticleCommentsOfFollowingOfYou;
exports.addProfile = addProfile;
exports.getUserWithProfile = getUserWithProfile;
exports.getSpecificUser = getSpecificUser;
