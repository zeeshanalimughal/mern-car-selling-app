import { Api } from "@/config/apiConfig";
import { ApiResponse, CarListing, ILoginResponse } from "@/types";

const CarService = {
  create: async (body: FormData): Promise<any> => {
    return await Api(
      "/cars/create",
      {
        method: "POST",
        body,
      },
      true
    );
  },
  getAll: async (): Promise<CarListing[]> => {
    return await Api("/cars", {
      method: "GET",
    });
  },
};

export default CarService;
