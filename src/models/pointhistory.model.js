const mongoose = require("mongoose");

const PointHistory = mongoose.model(
    "PointHistory",
    new mongoose.Schema({
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", // Pastikan mengacu pada model pengguna yang sesuai
            required: true,
          },
          lessonId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Lesson", // Pastikan mengacu pada model pelajaran yang sesuai
            required: true,
          },
          addedAt: {
            type: Date,
            default: Date.now,
          },
        },
        { timestamps: true }
    )
);

module.exports = PointHistory;