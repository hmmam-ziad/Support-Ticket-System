'use server';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

// return all users
export async function getAllUsers() {
    const cookie = cookies();
    const token = (await cookie).get("token")?.value;
    try {
        const res = await fetch(`https://localhost:7290/api/Users/GetUsers`, {
            method: "GET",
            headers: { "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            cache: "no-store",
        });
        if (!res.ok) {
            throw new Error(`Server returned ${res.status}`);
        }
        const users = await res.json();
        return users;
    }
    catch (err) {
        console.error("Failed to fetch users:", err);
        throw err;
    }
}

export async function deleteUser(id: string) {
    const cookie = cookies();
    const token = (await cookie).get("token")?.value;

    try {
        await fetch(`https://localhost:7290/api/Users/DeleteUser/${id}`,
            {
                method: "DELETE",
                headers: { "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                cache: "no-store",
            }
        )
        revalidatePath('/admin/users');
    }
    catch (err) {
        console.error("Failed to fetch users:", err);
        throw err;
    }
}

export async function getUserById(id:string) {
    try {
        const res = await fetch(`https://localhost:7290/api/Users/GetUserByID/${id}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
                cache: "no-store",
            });
            if (!res.ok) {
                throw new Error(`Server returned ${res.status}`);
            }
            const result = await res.json();
            console.log(result)
            return result;
    }
    catch (err) {
        console.error("Login failed:", err);
        throw err;
    }
}