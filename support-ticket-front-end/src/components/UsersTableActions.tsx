"use client"
import {useState}  from "react";
import { Button } from "./ui/button";
import Spinner from "./spinner";
import { Trash } from "lucide-react";
import { deleteUser } from "@/serverActions/admin.actions";


const UsersTableActions = ({id}: {id: string}) => {
     const [loading, setLoading] = useState(false);
    return(
        <Button size="icon" variant={"destructive"} onClick={async () =>{
                    setLoading(true);
                    await deleteUser(id);
                    setLoading(false);
                }}>
                    {loading ? <Spinner />: <Trash size={16}/>}
                </Button>
    );
}

export default UsersTableActions