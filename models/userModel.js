const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  reports: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Report' }]
});

const User = mongoose.model('User', userSchema);

module.exports = {
  User
};
