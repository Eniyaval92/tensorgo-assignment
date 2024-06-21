const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  googleId: String,
  email: String,
  displayName: String,
  communicationHistory: [
    {
      type: {
        type: String,
        enum: ["sent", "received"],
        required: true,
      },
      email: {
        to: String,
        from: String,
        subject: String,
        body: String,
        date: { type: Date, default: Date.now },
      },
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
