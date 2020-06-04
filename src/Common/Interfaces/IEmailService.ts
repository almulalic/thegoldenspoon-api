export interface IEmailService {
  SendConfirmationEmail(id: number, body: any): void;
  ResendConfirmationEmail(userData: any): void;
  SendResetPasswordEmail(id: number, body: any): void;
  SendGenericEmail(body: any): void;
}
