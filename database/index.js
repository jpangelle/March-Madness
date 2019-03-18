const mongoose = require('mongoose');

let entrySchema = mongoose.Schema({
  uniqueID: Number,
  entryName: String,
  teams: Array,
  dateLost: Date,
  status: Boolean,
});

let Entry = mongoose.model('Entry', entrySchema);

exports.Entry = Entry;
