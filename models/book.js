const { Schema, model, Types } = require("mongoose");

const bookSchema = new Schema({
    name: String,
    description: String,
    userId: {type: Types.ObjectId, ref: "user"},
});

module.exports = model("Book", bookSchema);