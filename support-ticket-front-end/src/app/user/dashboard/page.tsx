import DashboardComponent from "@/components/dashboardComponent";
import { IUser } from "@/interfaces";
import { cookies } from "next/headers";

 const page = async () => {
  const cookieStore = await cookies();
  const userString = cookieStore.get("user")?.value;
  let user: IUser | null = null;
  let userId: string = '';

  if (userString) {
    try {
      user = JSON.parse(userString);
      userId = String(user?.["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"] ?? '');
    } catch (err) {
      console.error("Invalid user JSON:", err);
    }
  }
    return(
      <DashboardComponent id={userId}/>
    );
}

export default page