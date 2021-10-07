export class LoginData {
  email!: string;
  password!: string;
  userType?: string;
}

export class AuthData {
  accessToken!: string;
  client!: string;
  expiry?: string;
  tokenType?: string;
  uid!: string;
}

export class UserData {
  allow_password_change!: boolean;
  email!: string;
  id!: number;
  image?: string;
  nickname?: string;
  provider!: string;
  uid!: string;
}

export class ResponseData {
  status?: number;
  success?: boolean;
  statusText?: string;
  data?: UserData;
  errors?: any;
}