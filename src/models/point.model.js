const mongoose = require("mongoose");

// const pointSchema = new mongoose.Schema({
//     user: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User",
//     },
//     point: {
//         type: Number,
//         default: 0,
//     }
// });

// const Point = mongoose.model("Point", pointSchema);

const Point = mongoose.model(
  "Point",
  new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    point: {
      type: Number,
      default: 0,
    },
  })
);

module.exports = Point;
