const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const bookSchema = new Schema({
    title: { type: String, required: true, unique: true },
    author: { type: String, required: true },
    summary: { type: String, required: true },
});

bookSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Book", bookSchema);
