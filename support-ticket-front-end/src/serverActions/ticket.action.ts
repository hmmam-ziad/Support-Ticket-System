"use server";

import { PrismaClient, TicketReply } from "@prisma/client";
import { revalidatePath } from "next/cache";
import z from "zod";

const TicketStatusEnum = z.enum(["OPEN", "INPROGRESS", "CLOSED"]);
const TicketPriorityEnum = z.enum(["LOW", "MEDIUM", "HIGH"]);

const prisma = new PrismaClient();

export const getTicketsAction = async ({userId} : {userId: string | null}) => {
    return await prisma.ticket.findMany({
        where: {
            userId: userId as string,
        }
    });
}

export const createTicketAction = async ({
  title,
  description,
  status,
  priority,
  replies = [],
  userId,
  updatedAt = new Date(),
}: {
  title: string;
  description: string;
  status: z.infer<typeof TicketStatusEnum>;
  priority: z.infer<typeof TicketPriorityEnum>;
  replies?: TicketReply[];
  userId: string;
  updatedAt?: Date;
}) =>  {
    await prisma.ticket.create({
        data: {
            title,
            description,
            status,
            priority,
            replies: replies && replies.length
                ? {
                    create: replies.map(({ id, createdAt, message, senderId }) => ({
                        id,
                        createdAt,
                        message,
                        senderId,
                    })),
                }
                : undefined,
            userId: userId as string,
            updatedAt,
        }
    });
    revalidatePath('/user/dashboard');
}