const express = require("express");
const passport = require("passport");
const router = express.Router();
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    res.header("Acess-Control-Allow-Origin", "http://localhost:3000");
    res.header("Referer-Policy", "no-referer-when-downgrade");
    if (req.user) {
      const token = jwt.sign(
        {
          id: req.user.id,
          email: req.user.email,
          name: req.user.displayName,
        },
        keys.jwtSecret,
        { expiresIn: "1h" }
      );
      res.redirect(`http://localhost:3000/dashboard?token=${token}`);
    } else {
      res.redirect("/login");
    }
  }
);

module.exports = router;
