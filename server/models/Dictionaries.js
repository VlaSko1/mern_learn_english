const {Schema, ObjectId, model} = require('mongoose');
const Words = require('./Words');

const Dictionaries = new Schema({
  title: {type: String, required: true, unique: true},
  arrayWordsId: [{type: ObjectId, ref: Words}]
});

module.exports = model('Dictionaries', Dictionaries);