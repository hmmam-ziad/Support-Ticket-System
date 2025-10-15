import UsersTable from "@/components/UsersTable";
import { getAllUsers } from "@/serverActions/admin.actions";

const page = async () => {
    const users = await getAllUsers();
    return(
        <>
            <UsersTable users={users}/>
        </>
    );
}

export default page