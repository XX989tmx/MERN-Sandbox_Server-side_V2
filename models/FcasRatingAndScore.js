const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
const fcasRatingAndScoreSchema = new mongoose.Schema({
  symbol: { type: String },
  name: { type: String },
  fcasRating: { type: String },
  fcasScore: { type: String },
  developlerScore: { type: String },
  marketMaturityScore: { type: String },
  utilityScore: { type: String },
  lastRefreshed: { type: String },
  timezone: { type: Date },
});

//Export the model
module.exports = mongoose.model("FcasRatingAndScore", fcasRatingAndScoreSchema);
