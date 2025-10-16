import DashboardComponent from "@/components/dashboardComponent";
import { IUser } from "@/interfaces";
import { cookies } from "next/headers";

 const page = async () => {
    const cookieStore = await cookies();
  const userString = cookieStore.get("user")?.value;

  let user: IUser | null = null;
  if (userString) {
    try {
      user = JSON.parse(userString);
      console.log("User from cookie:", user);
    } catch (err) {
      console.error("Invalid user JSON:", err);
    }
  }
    return(
      <DashboardComponent />
    );
}

export default page