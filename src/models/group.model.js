const mongoose = require("mongoose");

const GroupSchema = new mongoose.Schema({
    name: String,
    problem: [{ type: mongoose.Schema.Types.ObjectId, ref: "Problem" , default: "Belum Memilih"}],
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
}, {
    timestamps: true
});

module.exports = mongoose.model("Group", GroupSchema);

