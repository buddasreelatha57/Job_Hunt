const router = require("express").Router();

const bcrypt = require("bcryptjs");

const User = require("../models/User");


// ================= REGISTER =================
router.post("/register", async (req, res) => {

  try {

    const { name, email, password } = req.body;

    // CHECK USER
    const existing = await User.findOne({ email });

    if (existing) {
      return res.status(400).json({
        message: "Email already exists"
      });
    }

    // HASH PASSWORD
    const hashed = await bcrypt.hash(password, 10);

    // CREATE USER
    const user = new User({
      name,
      email,
      password: hashed
    });

    await user.save();

    res.json({
      message: "Registered Successfully"
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Register failed"
    });

  }
});


// ================= LOGIN =================
router.post("/login", async (req, res) => {

  try {

    const { email, password } = req.body;

    // FIND USER
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User not found"
      });
    }

    // CHECK PASSWORD
    const valid = await bcrypt.compare(
      password,
      user.password
    );

    if (!valid) {
      return res.status(400).json({
        message: "Invalid password"
      });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      photo: user.photo
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Login failed"
    });

  }
});

module.exports = router;