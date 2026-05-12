const mongoose = require("mongoose");

const AppliedJobSchema = new mongoose.Schema(
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

    // better tracking system
    status: {
      type: String,
      enum: ["Applied", "Interview", "Rejected", "Selected"],
      default: "Applied"
    },

    appliedAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

// 🔥 prevent duplicate applications
AppliedJobSchema.index({ jobId: 1, userId: 1 }, { unique: true });

module.exports = mongoose.model("AppliedJob", AppliedJobSchema);