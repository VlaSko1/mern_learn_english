const {Schema, model} = require('mongoose');

const Roles = new Schema({
  role: {type: String, required: true, unique: true},
});

module.exports = model('Roles', Roles);