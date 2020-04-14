const nodemailer = require("nodemailer");
const nodemailerSendgrid = require("nodemailer-sendgrid");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const transport = nodemailer.createTransport(
  nodemailerSendgrid({ apiKey: process.env.SENDGRID_API_KEY })
);

class EmailService {
  static SendConfirmationEmail = async (id, body) => {
    const confirmationToken = jwt.sign(
      { userIdentityId: id },
      process.env.EMAIL_SECRET,
      {
        expiresIn: "1d",
      }
    );
    const url = `http://localhost:3000/identity/confirmation/${confirmationToken}`;

    transport
      .sendMail({
        from: "almir.mulalic@tayra.io",
        to: body.email,
        subject: "Confirmation email for the golden spoon platform",
        html: `Hi ${body.firstName} ${body.lastName}! Please click this link to confirm your email <a href="${url}">${url}</a>`,
      })
      .then(() => {
        console.log("Email Sent");
        return 0;
      })
      .catch((err) => {
        console.log("Email Not sent" + err);
        return 1;
      });
  };

  static ResendConfirmationEmail = async (userData) => {
    const confirmationToken = jwt.sign(
      { userIdentityId: userData.Id },
      process.env.EMAIL_SECRET,
      {
        expiresIn: "1d",
      }
    );
    const url = `http://localhost:3000/identity/confirmation/${confirmationToken}`;

    transport
      .sendMail({
        from: "almir.mulalic@tayra.io",
        to: userData.Email,
        subject: "Confirmation email for the golden spoon platform",
        html: `Hi there! You requestd reconfirmation. Please click this link to confirm your email <a href="${url}">${url}</a>`,
      })
      .then(() => {
        console.log("Email Sent");
        return 0;
      })
      .catch((err) => {
        console.log("Email Not sent" + err);
        return 1;
      });
  };
}

module.exports = EmailService;
