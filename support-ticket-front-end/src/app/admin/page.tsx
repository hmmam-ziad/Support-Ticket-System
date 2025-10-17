import DashboardAdmin from "@/components/DashboardAdmin";
import { getTicketsForAdminAction } from "@/serverActions/ticket.action";

// show all tickets
interface Iprops {

}

const page = async ({}: Iprops) => {
    // const cookieStore = await cookies();
    //   const userString = cookieStore.get("user")?.value;
    //   let user: IUser | null = null;
    //   user = JSON.parse(userString as string);
    //   let userId: string = '';
    //   userId = String(user?.["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"] ?? '');
      const tickets = await getTicketsForAdminAction();
      return(
        <DashboardAdmin tickets={tickets} />
      );
}

export default page