import nodemailer from "nodemailer";
import nodemailerSendgrid from "nodemailer-sendgrid";
import jwt from "jsonwebtoken";

require("dotenv").config();

const transport = nodemailer.createTransport(
  nodemailerSendgrid({ apiKey: process.env.SENDGRID_API_KEY })
);

export interface IEmailService {
  SendConfirmationEmail(id: number, body: any): void;
  ResendConfirmationEmail(userData: any): void;
  SendGenericEmail(body: any): void;
}

class EmailService implements IEmailService {
  public SendConfirmationEmail = async (id, body) => {
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

  public ResendConfirmationEmail = async (userData) => {
    const confirmationToken = jwt.sign(
      { userIdentityId: userData.id },
      process.env.EMAIL_SECRET,
      {
        expiresIn: "1d",
      }
    );
    const url = `http://localhost:3000/identity/confirmation/${confirmationToken}`;

    transport
      .sendMail({
        from: "almir.mulalic@tayra.io",
        to: userData.email,
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

  public SendGenericEmail = async (body) => {
    transport
      .sendMail({
        from: body.from,
        to: body.to,
        subject: body.subject,
        html: body.html,
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

export default new EmailService();
