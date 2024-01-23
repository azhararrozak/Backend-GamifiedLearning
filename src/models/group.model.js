const mongoose = require("mongoose");

const GroupSchema = new mongoose.Schema({
    name: String,
    lead: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    problem: {
        title: { type: String, required: true, unique: true, default: "Belum Memilh Problem" },
        description: { type: String, required: true },
    },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
}, {
    timestamps: true
});

module.exports = mongoose.model("Group", GroupSchema);

