import { z } from "zod";
import { defaultListParams } from "@/shared/constants/default-params";

export const todoListQueryParamsSchema = z.object({
  ...defaultListParams,
  search: z.string().optional(),
  userId: z.coerce.number({ message: "должен быть числом" }).optional(),
});

export type TodoListQueryParams = z.infer<typeof todoListQueryParamsSchema>;
