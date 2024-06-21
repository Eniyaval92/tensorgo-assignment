require("dotenv").config();
module.exports = {
  googleClientID: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  mongoURI: process.env.MONGO_URI,
  cookieKey: process.env.COOKIE_KEY,
  postmarkApiKey: process.env.POSTMARK_API_KEY,
  jwtSecret: process.env.JWT_SECRET,
  tokenExpiry: process.env.TOKEN_EXPIRY,
  fromEmail: process.env.FROM_EMAIL,
};
