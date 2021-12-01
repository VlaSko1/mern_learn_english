const {Schema, ObjectId, model} = require('mongoose');
const PartOfSpeech = require('./PartOfSpeech');

const Words = new Schema({
  englishView: {type: String, required: true, unique: true},
  partOfSpeech: {type: ObjectId, ref: PartOfSpeech}
});

module.exports = model('Words', Words);