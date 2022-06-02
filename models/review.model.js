const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let reviewSchema = new Schema(
  {
    username: { type: String, required: true },
    data: { type: String, required: true },
    rating:{ type: String, required: true},
    refrence: { type: String, default: "no refrence"},
  },
  {
    timestamps: true
  }
);

// Export the model
module.exports = mongoose.model("Reviews", reviewSchema);
