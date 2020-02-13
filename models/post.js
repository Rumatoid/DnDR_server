const { Schema, model } = require('mongoose');

const postSchema = new Schema(
  { title: String, text: String },
  { timestamps: true }
);

const post = model('Post', postSchema);

module.exports = post;
