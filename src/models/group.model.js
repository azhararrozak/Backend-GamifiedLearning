const mongoose = require("mongoose");

const GroupSchema = new mongoose.Schema({
    name: String,
    lead: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    problem: {
        title: { type: String, default: "Belum Memilh Problem" },
        description: { type: String },
    },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
}, {
    timestamps: true
});

module.exports = mongoose.model("Group", GroupSchema);

