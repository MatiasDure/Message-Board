const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    author: { type: String, required: true },
    text: { type: String, required: true },
    added: { type: Date, required: true, default: Date.now() },
});

module.exports = mongoose.model("Messages", messageSchema);