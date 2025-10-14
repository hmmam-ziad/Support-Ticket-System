import { IUser } from "@/interfaces";
import { cookies } from "next/headers";

// dispaly all tickets raised by the user
interface Iprops {

}

 const page = async ({}: Iprops) => {
    const cookieStore = await cookies();
  const userString = cookieStore.get("user")?.value;

  let user: IUser | null = null;
  if (userString) {
    try {
      user = JSON.parse(userString);  // هنا بترجع object!
      console.log("User from cookie:", user);
    } catch (err) {
      console.error("Invalid user JSON:", err);
      // امسح الكوكي الغلط: cookieStore.set("user", "", { maxAge: 0 });
    }
  }
    return(
        <div>dashboard user</div>
    );
}

export default page