const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema ({
  firstName: mongoose.Schema.Types.String,
  lastName: mongoose.Schema.Types.String,
  age: mongoose.Schema.Types.Number,
  profession: mongoose.Schema.Types.String,
});

module.exports = mongoose.model('Users', UserSchema);