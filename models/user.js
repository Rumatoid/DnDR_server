const { Schema, model } = require('mongoose');

const usersSchema = new Schema(
  { username: String, password: String, charactersID: [] },
  { timestamps: true }
);

const users = model('Users', usersSchema);

module.exports = users;
