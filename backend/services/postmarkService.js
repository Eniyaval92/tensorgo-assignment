const postmark = require("postmark");
const keys = require("../config/keys");

const client = new postmark.ServerClient(keys.postmarkApiKey);

const sendEmail = async (to, from, subject, body) => {
  try {
    await client.sendEmail({
      From: from,
      To: to,
      Subject: subject,
      HtmlBody: body,
    });
  } catch (error) {
    console.error("Error sending email:", error.message);
  }
};

const sendWelcomeEmail = (userEmail, userName) => {
  const emailContent = {
    From: keys.fromEmail,
    To: userEmail,
    TemplateAlias: "welcome",
    TemplateModel: {
      product_url: "http://localhost:3000",
      product_name: "MailBridge",
      name: userName,
      company_name: "MailBridge",
      company_address: "Some Where in the World.",
    },
  };

  client.sendEmailWithTemplate(emailContent, (error, result) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent successfully:", result);
    }
  });
};

module.exports = { sendEmail, sendWelcomeEmail };
