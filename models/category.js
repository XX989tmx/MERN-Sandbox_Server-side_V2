const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const categorySchema = new Schema({
  category_name: { type: String, required: true },
  ancestors: [],
  parent: { type: String, required: true },

});

db.categories.insertMany([
  {
    _id: "MongoDB",
    ancestors: ["Books", "Programming", "Databases"],
    parent: "Databases",
  },
  {
    _id: "dbm",
    ancestors: ["Books", "Programming", "Databases"],
    parent: "Databases",
  },
  {
    _id: "Databases",
    ancestors: ["Books", "Programming"],
    parent: "Programming",
  },
  {
    _id: "Languages",
    ancestors: ["Books", "Programming"],
    parent: "Programming",
  },
  { _id: "Programming", ancestors: ["Books"], parent: "Books" },
  { _id: "Books", ancestors: [], parent: null },
]);

db.categories.insertMany([
  {
    _id: "makita codeless cleaner",
    ancestors: ["家電カメラAV機器", "生活家電", "スティッククリーナー"],
    parent: "スティッククリーナー",
    path: ",家電カメラAV機器,生活家電,スティッククリーナー ",
  },
  {
    _id: "スティッククリーナー",
    ancestors: ["家電カメラAV機器", "生活家電"],
    parent: "生活家電",
  },
  {
    _id: "生活家電",
    ancestors: ["家電カメラAV機器"],
    parent: "家電カメラAV機器",
  },
  {
    _id: "家電カメラAV機器",
    ancestors: [],
    parent: null
  },
]);