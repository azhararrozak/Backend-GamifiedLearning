const mongoose = require("mongoose");

const answerPretestSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  answers: [
    {
      question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
        required: true,
      },
      atp: {
        type: String,
        required: true,
      },
      indicator: {
        type: String,
        required: true,
      },
      isCorrect: {
        type: Boolean,
        required: true,
      },
    },
  ],
});

const AnswerPretest = mongoose.model("AnswerPretest", answerPretestSchema);

module.exports = AnswerPretest;
