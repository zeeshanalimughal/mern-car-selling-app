export interface AuthRegisterBody {
  email: string;
  password: string;
  name: string;
}

export interface AuthLoginRequestBody {
  email: string;
  password: string;
}

export interface IAuthLoginResponse {
  user: {
    id: string | undefined;
    name: string;
    email: string;
  };
  token: string;
}

export interface IAuthRegisterResponse {
  status: number;
  message: string;
}
