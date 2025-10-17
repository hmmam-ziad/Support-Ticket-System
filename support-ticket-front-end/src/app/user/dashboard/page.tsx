import DashboardComponent from "@/components/dashboardComponent";
import { IUser } from "@/interfaces";
import { getTicketsAction } from "@/serverActions/ticket.action";
import { cookies } from "next/headers";

 const page = async () => {
  const cookieStore = await cookies();
  const userString = cookieStore.get("user")?.value;
  let user: IUser | null = null;
  user = JSON.parse(userString as string);
  let userId: string = '';
  userId = String(user?.["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"] ?? '');
  const tickets = await getTicketsAction({userId});

    return(
      <DashboardComponent tickets={tickets} userId={userId} />
    );
}

export default page