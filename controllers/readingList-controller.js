const ReadingList = require("../models/readingList");
const User = require("../models/user");
const mongoose = require("mongoose");

// get 'my' readingLists
const getReadingListsByUserId = async (req, res, next) => {
  const userId = req.params.userId;

  let userPopulatedWithReadingLists;
  try {
    userPopulatedWithReadingLists = await User.findById(userId).populate(
      "readingLists"
    );
    console.log(userPopulatedWithReadingLists.readingLists[0].name);
    const listName = userPopulatedWithReadingLists.readingLists[0].name;

    console.log(
      `This list '${listName}' was created by ${userPopulatedWithReadingLists.name}.If you need to get in touch, please Email to ${userPopulatedWithReadingLists.email}`
    );
  } catch (error) {}

  res.json({
    userPopulatedWithReadingLists: userPopulatedWithReadingLists.readingLists.map(
      (u) => u.toObject({ getters: true })
    ),
  });
};

const getCreatorsInformationOfReadingLists = async (req, res, next) => {};

const createReadingList = async (req, res, next) => {
  const { name, userId } = req.body;

  const createdReadingList = new ReadingList({
    name,
    creator: userId,
    articles: [],
  });

  let user;
  try {
    user = await User.findById(userId);
  } catch (error) {}

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdReadingList.save({ session: sess });
    user.readingLists.push(createdReadingList);
    await user.save({ session: sess });
    await sess.commitTransaction();
  } catch (error) {}

  res.json({ createdReadingList });
};

exports.createReadingList = createReadingList;
exports.getReadingListsByUserId = getReadingListsByUserId;
