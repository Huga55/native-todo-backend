const { Schema, model, Types } = require("mongoose");

const todoSchema = new Schema({
    name: String,
    description: String,
    userId: {type: Types.ObjectId, ref: "user"}
});

module.exports = model("Todo", todoSchema);