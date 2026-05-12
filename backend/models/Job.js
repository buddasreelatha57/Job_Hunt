const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  job_title: String,
  employer_name: String,
  job_city: String,
  job_type: String,
  job_description: String,
  job_apply_link: String,
  experience: String,
  role: String,
  qualification: String,
  batch: String,

  isEdited: {
    type: Boolean,
    default: false
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Job", jobSchema);