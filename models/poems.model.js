const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let PoemSchema = new Schema(
  {
    poemName: { type: String, required: true },
    authorName: { type: String, required: true },
    poemGenre: { type: String, required: true },
    poemData:{ type: String, required: true},
    addedBy: { type: String},
    modifiedBy:{ type: String}
  },
  {
    timestamps: true
  }
);

// Export the model
module.exports = mongoose.model("Poems", StudentSchema);
