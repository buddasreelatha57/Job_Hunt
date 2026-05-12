const router = require("express").Router();

const axios = require("axios");

const TelegramSettings = require("../models/TelegramSettings");


// =====================================================
// TEST ROUTE
// =====================================================
router.get("/", (req, res) => {

  res.json({
    success: true,
    message: "Telegram API Working 🚀"
  });

});


// =====================================================
// SAVE / UPDATE TELEGRAM SETTINGS
// =====================================================
router.post("/save", async (req, res) => {

  try {

    const {
      userId,
      botToken,
      chatId
    } = req.body;

    // VALIDATION
    if (!userId || !botToken || !chatId) {

      return res.status(400).json({
        success: false,
        message: "All fields required"
      });

    }

    // CHECK EXISTING
    const existing = await TelegramSettings.findOne({
      userId
    });

    // UPDATE
    if (existing) {

      existing.botToken = botToken;
      existing.chatId = chatId;

      await existing.save();

      return res.json({
        success: true,
        message: "Telegram settings updated ✅",
        data: existing
      });

    }

    // CREATE NEW
    const settings = new TelegramSettings({
      userId,
      botToken,
      chatId
    });

    await settings.save();

    res.json({
      success: true,
      message: "Telegram settings saved ✅",
      data: settings
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      success: false,
      message: "Failed to save settings"
    });

  }

});


// =====================================================
// GET USER TELEGRAM SETTINGS
// =====================================================
router.get("/:userId", async (req, res) => {

  try {

    const settings = await TelegramSettings.findOne({
      userId: req.params.userId
    });

    if (!settings) {

      return res.status(404).json({
        success: false,
        message: "No Telegram settings found"
      });

    }

    res.json({
      success: true,
      data: settings
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      success: false,
      message: "Failed to fetch settings"
    });

  }

});


// =====================================================
// DELETE SETTINGS
// =====================================================
router.delete("/:userId", async (req, res) => {

  try {

    await TelegramSettings.deleteOne({
      userId: req.params.userId
    });

    res.json({
      success: true,
      message: "Telegram settings deleted"
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      success: false,
      message: "Delete failed"
    });

  }

});


// =====================================================
// SEND TEST MESSAGE
// =====================================================
router.post("/send-test", async (req, res) => {

  try {

    const {
      botToken,
      chatId,
      message
    } = req.body;

    if (!botToken || !chatId) {

      return res.status(400).json({
        success: false,
        message: "botToken and chatId required"
      });

    }

    // TELEGRAM API
    const telegramURL =
      `https://api.telegram.org/bot${botToken}/sendMessage`;

    const response = await axios.post(
      telegramURL,
      {
        chat_id: chatId,
        text: message || "🚀 Test message from Job Hunt App"
      }
    );

    res.json({
      success: true,
      message: "Message sent successfully ✅",
      telegram: response.data
    });

  } catch (err) {

    console.log(err?.response?.data || err.message);

    res.status(500).json({
      success: false,
      message: "Telegram message failed",
      error: err?.response?.data || err.message
    });

  }

});


module.exports = router;