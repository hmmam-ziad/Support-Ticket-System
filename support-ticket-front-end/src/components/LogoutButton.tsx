"use client"

import { logoutAction } from "@/serverActions/auth.actions";
import { Button } from "./ui/button";
import { useState } from "react";
import Spinner from "./spinner";


const LogoutButton = () => {
    const [isLoading, setIsLoading] = useState(false);

    // implement logout functionality
    const handleLogout = async () => {
        setIsLoading(true);
        const res = await logoutAction();

        window.location.href = "/auth/login";
    }
    return(
       <>
            {isLoading ? (
            <Button disabled>
                <Spinner />
            </Button>
            ) : (
            <Button onClick={() => handleLogout()}>Logout</Button>
            )}
        </>
        
    );
}

export default LogoutButton