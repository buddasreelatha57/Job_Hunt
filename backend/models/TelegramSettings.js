const mongoose = require("mongoose");

const TelegramSettingsSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true
    },

    botToken: {
      type: String,
      required: true
    },

    chatId: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "TelegramSettings",
  TelegramSettingsSchema
);