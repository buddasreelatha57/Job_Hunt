const mongoose = require("mongoose");

const SavedJobSchema = new mongoose.Schema(
  {
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true
    },

    userId: {
      type: String,
      required: true
    },

    // optional but useful
    isApplied: {
      type: Boolean,
      default: false
    },

    appliedAt: {
      type: Date,
      default: null
    }
  },
  { timestamps: true }
);

// 🔥 Prevent duplicate saved jobs (VERY IMPORTANT)
SavedJobSchema.index({ jobId: 1, userId: 1 }, { unique: true });

module.exports = mongoose.model("SavedJob", SavedJobSchema);