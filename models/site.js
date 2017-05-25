// Require mongoose
var mongoose = require("mongoose");
// Create Schema class
var Schema = mongoose.Schema;

// Create article schema
var SiteSchema = new Schema({
  // title is a required string
  title: {
    type: String,
    required: true
  },
  // link is a required string
  link: {
    type: String,
    required: true
  },
  // This only saves one note's ObjectId, ref refers to the Note model
  articles: [{
    type: Schema.Types.ObjectId,
    ref: "Article"
  }]
});

// Create the Article model with the ArticleSchema
var Site = mongoose.model("Site", SiteSchema);

// Export the model
module.exports = Site;
