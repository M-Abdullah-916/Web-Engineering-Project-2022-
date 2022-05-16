const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let BookSchema = new Schema(
  {
    bookName: { type: String, required: true },
    authorName: { type: String, required: true },
    bookGenre: { type: String, required: true },
    bookData:{ type: String, required: true},
    addedBy: { type: String},
    modifiedBy:{ type: String}
  },
  {
    timestamps: true
  }
);

// Export the model
module.exports = mongoose.model("Books", StudentSchema);
