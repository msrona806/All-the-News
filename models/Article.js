var mongoose = require("mongoose");

// Schema constructor reference
var Schema = mongoose.Schema;

// Article Schema object
var ArticleSchema = new Schema({
  // title is a string
  title: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
    
  // The ref property links the ObjectId to the Note model
  // This will allow a note to be populated with the article
  note: {
    type: Schema.Types.ObjectId,
    ref: "Note"
  }
});

// model created from above schema, using mongoose's model method
var Article = mongoose.model("Article", ArticleSchema);

// Export the Article model
module.exports = Article;
