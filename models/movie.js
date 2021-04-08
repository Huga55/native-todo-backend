const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const movieSchema = new Schema({
    userId: String,
    name: String,
    description: String,
    isEnd: {
        type: Boolean,
        default: false,
    },
});

module.exports = mongoose.model("Movie", movieSchema);