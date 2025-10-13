import { IUser } from "@/interfaces";
import { jwtDecode } from "jwt-decode";



export function decodeJWT(token: string): IUser {
    return jwtDecode(token);
}