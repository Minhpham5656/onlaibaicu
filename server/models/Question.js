const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  testId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Test",
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: ["mc", "fill", "reorder", "error"],
  },
  question: {
    type: String,
    required: true,
  },
  options: {
    type: [String],
    default: [],
  },
  answer: {
    type: String,
    required: true,
  },
  explanation: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("Question", questionSchema);
