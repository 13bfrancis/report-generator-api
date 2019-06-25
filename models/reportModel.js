const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  name: String,
  projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }]
});

const Report = mongoose.model('Report', reportSchema);

module.exports = {
  Report
};
