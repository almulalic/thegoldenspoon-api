import { EmailEnums } from "./EmailEnums";
import jwt from "jsonwebtoken";
import sgMail from "@sendgrid/mail";

require("dotenv").config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export interface IEmailService {
  SendConfirmationEmail(id: number, body: any): void;
  ResendConfirmationEmail(userData: any): void;
  SendResetPasswordEmail(id: number, body: any): void;
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
    const url =
      process.env.APP_URL + `/accountConfirmation/${confirmationToken}`;

    sgMail
      .send({
        to: body.email,
        from: "no-reply@enviorment.live",
        subject: "Confirmation email for the golden spoon platform",
        html: `Hi ${body.firstName} ${body.lastName}! Please click this link to confirm your email <a href="${url}">${url}</a> <input value=${confirmationToken} />`,
      })
      .then(() => {
        return EmailEnums.EmailSentSuccessfully;
      })
      .catch((err) => {
        console.log(err);
        return EmailEnums.EmailNotSent;
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
    const url =
      process.env.APP_URL + `/accountConfirmation/${confirmationToken}`;

    sgMail
      .send({
        to: userData.email,
        from: "no-reply@enviorment.live",
        subject: "Confirmation email for the golden spoon platform",
        html: `Hi there! You requested reconfirmation. Please click this link to confirm your email <a href="${url}">${url}</a>`,
      })
      .then(() => {
        return EmailEnums.EmailSentSuccessfully;
      })
      .catch((err) => {
        console.log(err);
        return EmailEnums.EmailNotSent;
      });
  };

  public SendResetPasswordEmail = async (userData) => {
    const confirmationToken = jwt.sign(
      { userIdentityId: userData.id },
      process.env.PASSWORD_RESET_SECRET,
      {
        expiresIn: "12h",
      }
    );
    const url =
      process.env.APP_URL +
      `/identity/resetPasswordConfirmation/${confirmationToken}`;

    sgMail
      .send({
        to: userData.email,
        from: "no-reply@enviorment.live",
        subject: "Reset password golden spoon",
        html: ` Please click this link to proceed to password reset <a href="${url}">${url}</a> <input value=${confirmationToken} />`,
      })
      .then(() => {
        return EmailEnums.EmailSentSuccessfully;
      })
      .catch((err) => {
        console.log(err);
        return EmailEnums.EmailNotSent;
      });
  };

  public SendGenericEmail = async (body) => {
    sgMail
      .send({
        from: body.from,
        to: body.to,
        subject: body.subject,
        html: body.html,
      })
      .then(() => {
        return EmailEnums.EmailSentSuccessfully;
      })
      .catch((err) => {
        console.log(err);
        return EmailEnums.EmailNotSent;
      });
  };
}

export default new EmailService();
