const { Schema, model, Types } = require("mongoose");

const userSchema = new Schema({
    email: String,
    password: String,
    token: String,
    movies: [{type: Types.ObjectId, ref: "movie"}],
    todos: [{type: Types.ObjectId, ref: "todo"}],
    books: [{type: Types.ObjectId, ref: "book"}],
});

module.exports = model("User", userSchema);
