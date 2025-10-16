'use server';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
import { IUser } from "@/interfaces";
import { decodeJWT } from "@/jwt/jwtDecode";
import { loginSchema } from "@/schema/loginSchema";
import { registerchema } from "@/schema/registerSchema";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import z from "zod";

export async function loginAction(data: z.infer<typeof loginSchema>) {
  try {
    const res = await fetch(`http://localhost:5283/api/Account/Login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error(`Server returned ${res.status}: ${res.statusText}`);
    }

    const result = await res.json();
    const user : IUser = decodeJWT(result.token);
    const cookieStore = cookies();
    
    (await cookieStore).set("user", JSON.stringify(user), {
      httpOnly: true,
      secure: false, 
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 30,
    });

    (await cookieStore).set("token", result.token, {
      httpOnly: true,
      secure: false, 
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 30, 
    });

    return { success: true, ...result };
  } catch (err) {
    console.error("Login failed:", err);
    throw err;
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
        const user : IUser = decodeJWT(result.token);
        const cookieStore = cookies();
        
        (await cookieStore).set("user", JSON.stringify(user), {
        httpOnly: true,
        secure: false, 
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 30,
        });

        (await cookieStore).set("token", result.token, {
        httpOnly: true,
        secure: false, 
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 30, 
        });

        return { success: true, ...result };
        } catch (err) {
          console.error("Login failed:", err);
          throw err;
        }
};

export async function logoutAction() {
  const cookieStore = cookies();
  (await cookieStore).delete("token");
  (await cookieStore).delete("user");
  redirect("/auth/login");
}