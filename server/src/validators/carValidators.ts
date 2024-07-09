import { z } from "zod";

export const carSchema = z.object({
  carModel: z.string().min(3, "Model must be at least 3 characters long"),
  price: z.number().min(0, "Price must be at least 0"),
  phone: z
    .string()
    .min(11, "Phone number must be at least 11 characters long")
    .max(11, "Phone number must be at most 11 characters long"),
  city: z.string().min(1, "City is required"),
  copies: z.number().min(0, "Copies must be at least 0"),
  pictures: z
    .array(z.any())
    .min(1, "At least one image is required")
    .max(10, "At most 10 images are allowed"),
});
