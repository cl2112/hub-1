// Require mongoose
var mongoose = require("mongoose");
// Create Schema class
var Schema = mongoose.Schema;

// Create article schema
var UserSchema = new Schema({
  // title is a required string
  name: {
    type: String,
    required: true,
    unique: true
  },
  // link is a required string
  pass: {
    type: String,
    required: true
  },
  // This only saves one note's ObjectId, ref refers to the Note model
  notes: [{
    type: Schema.Types.ObjectId,
    ref: "Note"
  }]
});

// Create the Article model with the ArticleSchema
var User = mongoose.model("User", UserSchema);

// Export the model
module.exports = User;
