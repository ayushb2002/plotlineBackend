const {Schema, model} = require("../db/connection") // import Schema & model
const {Item} = require('./item')
// User Schema
const CategorySchema = new Schema({
    _id: { type: String, required: true, unique: true },
    type: {type: String, required: true, enum: ["product", "service"]},
    name: { type: String, required: true, unique: true},
    keywords: {type: String, default: ""}
});

CategorySchema.pre('remove', (next) => {
    Item.remove({ category: this._id }).exec();
    next();
});

const Category = model("Category", CategorySchema);

module.exports = Category