import { z } from "zod";

export const loginSchema = z.object({
  email: z.email({ message: "Некорректный email" }),
  password: z.string().min(6, "Минимальная длина 6 символов"),
});
