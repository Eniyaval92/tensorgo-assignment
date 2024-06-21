const express = require("express");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const { sendEmail } = require("../services/postmarkService");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();

router.get("/history", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).send("User not found.");
    res.send(user.communicationHistory);
  } catch (error) {
    res.status(500).send("Server error.");
  }
});

router.post("/send", verifyToken, async (req, res) => {
  const { to, subject, body } = req.body;
  const from = req.user.email;

  const response = await sendEmail(to, from, subject, body);

  const user = await User.findById(req.user.id);
  user.communicationHistory.push({
    type: "sent",
    email: { to, from, subject, body },
  });
  await user.save();

  res.send("Email sent");
  console.log(response);
});

module.exports = router;
