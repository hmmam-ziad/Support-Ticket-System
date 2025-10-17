import TicketDetails from "@/components/TicketDetails";
import { ITicket, ITicketReply, IUser } from "@/interfaces";
import { getUserById } from "@/serverActions/admin.actions";
import { getTicketByIdAction, getTicketByIdForAdminAction } from "@/serverActions/ticket.action";
import { cookies } from "next/headers";

interface Iprops {
    params: { id: string }
}

interface ISender {
  id: string;
  userName: string;
  normalizedUserName: string;
  email: string;
  normalizedEmail: string;
  emailConfirmed: boolean;
  passwordHash: string;
  securityStamp: string;
  concurrencyStamp: string;
  phoneNumber: string | null;
  phoneNumberConfirmed: boolean;
  twoFactorEnabled: boolean;
  lockoutEnd: string | null;
  lockoutEnabled: boolean;
  accessFailedCount: number;
}

export interface IReplyWithSender extends ITicketReply {
  sender?: ISender | null;
}

const page = async ({ params }: Iprops) => {
    const cookieStore = cookies();
    const userString = (await cookieStore).get("user")?.value;
    let user: IUser | null = null;
    if (userString) user = JSON.parse(userString);

    const userId = String(user?.["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"] ?? '');
    const userRole = String(user?.["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] ?? '');
    const ticketId = params.id;
    let ticket: ITicket | null = null

    if (userRole === "Admin")
    {
        ticket = await getTicketByIdForAdminAction({ ticketId });
    }
    else {
        ticket = await getTicketByIdAction({ ticketId, userId });
    }
    const replies: ITicketReply[] = ticket?.replies || [];

    const repliesWithSender: IReplyWithSender[] = await Promise.all(
        replies.map(async (reply) => {
            const sender = await getUserById(reply.senderId as string);
            return { ...reply, sender };
        })
    );

    return (
        <div>
            <TicketDetails ticket={ticket} replies={repliesWithSender} role={userRole} userId={userId}/>
        </div>
    );
};

export default page;
