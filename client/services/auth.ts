import { Api } from "@/config/apiConfig";
import { ApiResponse, ILoginResponse } from "@/types";

const AuthService = {
  signUp: async (data: object): Promise<ApiResponse> => {
    return await Api("/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  signIn: async (data: object): Promise<ILoginResponse> => {
    return await Api("/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
};

export default AuthService;
