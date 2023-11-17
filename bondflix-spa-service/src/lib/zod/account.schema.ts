import { z } from "zod";

export const AccountUpdateSchema = z
    .object({
        name: z.union([
            z.string().min(8, {
                message: "Name must contain at least 8 characters",
            }),
            z.string().length(0),
        ]),
        password: z.union([
            z.string().min(8, {
                message: "Password must contain at least 8 characters",
            }),
            z.string().length(0),
        ]),
        confirmPassword: z.union([
            z.string().min(8, {
                message: "Confirm password must contain at least 8 characters",
            }),
            z.string().length(0),
        ]),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords must match",
        path: ["password", "confirmPassword"],
    });
