import * as z from "zod";

export const SignUpValidation = z
  .object({
    first_name: z.string().min(2, { message: "Name too short" }),
    last_name: z.string().min(2, { message: "Name too short" }),
    email: z.string().email(),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
      .regex(/[0-9]/, { message: "Password must contain at least one number" })
      .regex(/[^a-zA-Z0-9]/, { message: "Password must contain at least one special character" }),
    confirm_password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
  })
  .superRefine(({ password, confirm_password }, ctx) => {
    if (password !== confirm_password) {
      ctx.addIssue({
        code: "custom",
        path: ["confirm_password"],
        message: "Passwords do not match",
      });
    }
  });

export const LoginValidation = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(1, { message: "Password is required" }),
  });