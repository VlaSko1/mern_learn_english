const {Schema, model} = require('mongoose');

const PartOfSpeech = new Schema({
  title: {type: String, required: true, unique: true}
});

module.exports = model('PartOfSpeech', PartOfSpeech);