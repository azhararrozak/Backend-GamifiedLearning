const mongoose = require("mongoose");

// const Quiz = mongoose.model(
//     "Quiz",
//     new mongoose.Schema({
//         question: String,
//         image: String,
//         answer: [
//             {
//                 text: {
//                     type: String,
//                     required: true
//                 },
//                 isCorrect: {
//                     type: Boolean,
//                     required: true,
//                     default: false
//                 },
//                 image: String
//             }
//         ]
//     })
// );

const questionsSchema = new mongoose.Schema({
  question: { type: String, required: true },
  image: String,
  options: [{
    text: { type: String, required: true },
    image: String,
    isCorrect: { type: Boolean, required: true, default: false },
  }],
});

const quizSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true},
  description: { type: String, required: true},
  questions: [questionsSchema],
},
{
    collection: "quiz"
});

const Quiz = mongoose.model("Quiz", quizSchema);

module.exports = Quiz;
