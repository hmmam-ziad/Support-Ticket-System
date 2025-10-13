'use server';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
import { loginSchema } from "@/schema/loginSchema";
import { registerchema } from "@/schema/registerSchema";
import z from "zod";

export async function loginAction(data: z.infer<typeof loginSchema>) {
    try {
    const res = await fetch(`http://localhost:5283/api/Account/Login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
    }

    const result = await res.json();
    return result;
    } catch (err) {
    console.error("Login failed:", err);
    }
}

export async function registerAction(data: z.infer<typeof registerchema>) {
    try {
        const res = await fetch(`http://localhost:5283/api/Account/Register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        if (!res.ok) {
            throw new Error(`Server returned ${res.status}`);
        }
        const result = await res.json();
        return result;
    } catch (err) {
        console.error("Registration failed:", err);
        
    }
};