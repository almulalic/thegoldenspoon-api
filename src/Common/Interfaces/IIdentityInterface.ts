export interface IIdentityService {
  RegisterUser(body, res): any;
  ResendConfirmation(body, res): any;
  ChangeConfirmationEmail(body, res): any;
  ConfirmUser(body, res): any;
  LoginUser(body, res): any;
  ResetPasswordRequest?(body, res): any;
  ResetPasswordConfim?(token, body, res): any;
}
