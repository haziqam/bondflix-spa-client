import { string, z } from "zod";

export const RegisterSchema = z
    .object({
        username: z
            .union([
                z.string().min(8, {
                    message: "Username must contain at least 8 characters",
                }),
                z.string().length(0),
            ])
            .refine((value) => !/\s/.test(value), {
                message: "Username must not contain empty spaces",
            })
            .refine((e) => e !== "", {
                message: "Username is required",
            }),
        name: z
            .union([
                z.string().min(8, {
                    message: "Name must contain at least 8 characters",
                }),
                z.string().length(0),
            ])
            .refine((e) => e !== "", {
                message: "Name is required",
            }),
        email: z
            .union([z.string().email(), z.string().length(0)])
            .refine((e) => e !== "", {
                message: "Email is required",
            }),
        password: z
            .union([
                z.string().min(8, {
                    message: "Password must contain at least 8 characters",
                }),
                z.string().length(0),
            ])
            .refine((e) => e !== "", {
                message: "Password is required",
            }),
        confirmPassword: z
            .union([
                z.string().min(8, {
                    message:
                        "Confirm password must contain at least 8 characters",
                }),
                z.string().length(0),
            ])
            .refine((e) => e !== "", {
                message: "Confirm password is required",
            }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords must match",
        path: ["password", "confirmPassword"],
    });

export const LoginSchema = z.object({
    identifier: z.union([z.string(), z.string().email()], {
        required_error: "Identifier (username or email) is required",
    }),
    password: z.string({ required_error: "Password is required" }),
});
