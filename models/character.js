const { Schema, model } = require('mongoose');

const charactersSchema = new Schema(
  { name: String, username: String, race: String, class: String },
  { timestamps: true }
);

const characters = model('Characters', charactersSchema);

module.exports = characters;
