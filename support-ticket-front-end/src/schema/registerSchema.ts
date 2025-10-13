import z from "zod";

export type registerFormValues = z.infer<typeof registerchema>;

export const registerchema = z
  .object({
    username: z
      .string()
      .min(5, "Username must be at least 5 characters long.")
      .max(32, "Username must be at most 32 characters long."),
    email: z.string().email("Invalid email address."),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters long.")
      .max(100, "Password must be at most 100 characters long.")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
      .regex(/[0-9]/, "Password must contain at least one number.")
      .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character."),
    passwordConfirmation: z
      .string()
      .min(1, "Please confirm your password."),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    path: ["passwordConfirmation"],
    message: "Passwords do not match.",
  });