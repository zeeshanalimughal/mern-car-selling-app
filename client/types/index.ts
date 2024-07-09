export interface User {
  id: string;
  name: string;
  email: string;
  token?: string;
}
export interface ILoginResponse {
  user: User;
  token: string;
}

export interface ApiResponse {
  message?: string;
  status?: number;
  error?: string;
}

export interface CarListing {
  carModel: string;
  price: number;
  phone: string;
  city: string;
  copies: number;
  user: string;
  pictures: string[];
  _id: string;
  createdAt: string;
  updatedAt: string;
}
