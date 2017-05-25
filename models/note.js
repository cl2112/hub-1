// Require mongoose
var mongoose = require("mongoose");
// Create Schema class
var Schema = mongoose.Schema;

// Create article schema
var NoteSchema = new Schema({
  text: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});

// Create the Article model with the ArticleSchema
var Note = mongoose.model("Note", NoteSchema);

// Export the model
module.exports = Note;
