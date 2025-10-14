"use client"

import { logoutAction } from "@/serverActions/auth.actions";
import { Button } from "./ui/button";


const LogoutButton = () => {

    // implement logout functionality
    const handleLogout = async () => {
        const res = await logoutAction();
        console.log(res);
        window.location.href = "/auth/login";
    }
    return(
        <Button onClick={() => handleLogout()}>Logout</Button>
    );
}

export default LogoutButton