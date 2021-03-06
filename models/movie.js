const { Schema, model, Types } = require("mongoose");

const movieSchema = new Schema({
    name: String,
    description: String,
    userId: {type: Types.ObjectId, ref: "user"},
});

module.exports = model("Movie", movieSchema);