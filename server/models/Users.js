const { Schema, model, ObjectId } = require('mongoose');
const Roles = require('./Roles');
const Dictionaries = require('./Dictionaries');

const Users = new Schema({
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true },
  avatar: { type: String},
  name: { type: String, required: true, unique: true },
  roleId: { type: ObjectId, ref: Roles}, 
  dictionaries_id: [{type: ObjectId, ref: Dictionaries}] 
});

module.exports = model('Users', Users);