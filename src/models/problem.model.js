const mongoose = require('mongoose');

const problemSchema = mongoose.model(
    'Problem',
    new mongoose.Schema({
        title: { type: String, required: true, unique: true },
        description: { type: String, required: true },
        image: String,
    })
);

module.exports = problemSchema;