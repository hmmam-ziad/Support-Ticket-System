import z from "zod";


export type loginFormValues = z.infer<typeof loginSchema>;

export const loginSchema = z.object({
  username: z
    .string()
    .min(5, "Username must be at least 5 characters long.")
    .max(32, "Username must be at most 32 characters long."),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long.")
    .max(100, "Password must be at most 100 characters long.")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
    .regex(/[0-9]/, "Password must contain at least one number.")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character."),
});