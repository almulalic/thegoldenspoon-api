export default interface RegisterUserDTO {
  firstName: String;
  lastName: String;
  bornOn: Date;
  identityId: Number;
  username: String;
  email: String;
  role: Number;
  password: String;
  created: Date;
  isConfirmed: Number;
}
