const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: String,
  status: String,
  forecast: String,
  progress: String
});

const Project = mongoose.model('Project', projectSchema);

module.exports = {
  Project
};
