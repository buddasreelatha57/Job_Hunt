const router = require("express").Router();

const SavedJob = require("../models/SavedJob");
const AppliedJob = require("../models/AppliedJob");


// ================= TEST =================
router.get("/", (req, res) => {
  res.send("Tracker API Working 🚀");
});


// ================= TOGGLE SAVE =================
router.post("/toggle-save", async (req, res) => {

  try {

    const { userId, jobId } = req.body;

    const existing = await SavedJob.findOne({
      userId,
      jobId
    });

    // REMOVE SAVE
    if (existing) {

      await SavedJob.deleteOne({
        _id: existing._id
      });

      return res.json({
        saved: false
      });
    }

    // SAVE JOB
    const savedJob = new SavedJob({
      userId,
      jobId
    });

    await savedJob.save();

    res.json({
      saved: true
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Save failed"
    });
  }
});


// ================= TOGGLE APPLIED =================
router.post("/toggle-applied", async (req, res) => {

  try {

    const { userId, jobId } = req.body;

    const existing = await AppliedJob.findOne({
      userId,
      jobId
    });

    // REMOVE APPLIED
    if (existing) {

      await AppliedJob.deleteOne({
        _id: existing._id
      });

      return res.json({
        applied: false
      });
    }

    // APPLY JOB
    const appliedJob = new AppliedJob({
      userId,
      jobId
    });

    await appliedJob.save();

    res.json({
      applied: true
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Apply failed"
    });
  }
});


// ================= GET SAVED =================
router.get("/saved/:userId", async (req, res) => {

  const data = await SavedJob.find({
    userId: req.params.userId
  });

  res.json(data);
});


// ================= GET APPLIED =================
router.get("/applied/:userId", async (req, res) => {

  const data = await AppliedJob.find({
    userId: req.params.userId
  });

  res.json(data);
});

module.exports = router;