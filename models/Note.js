var mongoose = require("mongoose");

// Schema constructor reference
var Schema = mongoose.Schema;

// Note Schema object
var NoteSchema = new Schema({
  // title is a string
  title: {
    type: String,
    body: String
  }
});    

// model created from above schema, using mongoose's model method
var Note = mongoose.model("Note", NoteSchema);

// Export the Article model
module.exports = Note;
