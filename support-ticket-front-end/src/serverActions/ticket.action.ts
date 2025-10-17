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
        },
        include: {
            replies: {
                select: {
                    id: true,
                    message: true,
                    createdAt: true,
                    senderId: true,
                    ticketId: true,
                },
            }
        }
    });
}

export const getTicketByIdAction = async ({ticketId, userId} : {ticketId: string | null, userId: string}) => {
    return await prisma.ticket.findUnique({
        where: {
            id: ticketId as string,
            userId: userId
        },
        include: {
            replies: {
                select: {
                    id: true,
                    message: true,
                    createdAt: true,
                    senderId: true,
                    ticketId: true,
                },
                orderBy: {
                    createdAt: 'asc',
                },
            },
        },
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

export const changeTicketAction = async ({
  ticketId,
  status,
  priority,
}: {
  ticketId: string;
  status: z.infer<typeof TicketStatusEnum> | null | undefined;
  priority: z.infer<typeof TicketPriorityEnum> | null | undefined;
}) => {
//   console.log("Attempting to update:", { ticketId, status, priority });

  try {
    const updatedTicket = await prisma.ticket.update({
      where: { id: ticketId },
      data: {
        ...(status != null ? { status } : {}),
        ...(priority != null ? { priority } : {}),
      },
    });
    revalidatePath(`/user/tickets/${ticketId}`)
    return updatedTicket;
  } catch (error) {
    console.error("Failed to update ticket:", error);
    throw error;
  }
};

export const AddReplyTicket = async ({userId, ticketId, message} : {userId: string, ticketId: string | undefined, message: string}) => {
    try {
        await prisma.ticketReply.create({
            data: {
                message: message,
                ticketId: ticketId as string,
                senderId: userId
            }
        });
        revalidatePath(`/user/tickets/${ticketId}`)
    }catch (error) {
    console.error("Failed to update ticket:", error);
    throw error;
  }
}

export const getTicketByIdForAdminAction = async ({ticketId} : {ticketId: string | null}) => {
    return await prisma.ticket.findUnique({
        where: {
            id: ticketId as string,
        },
        include: {
            replies: {
                select: {
                    id: true,
                    message: true,
                    createdAt: true,
                    senderId: true,
                    ticketId: true,
                },
                orderBy: {
                    createdAt: 'asc',
                },
            },
        },
    });
}

export const getTicketsForAdminAction = async () => {
    return await prisma.ticket.findMany({
        include: {
            replies: {
                select: {
                    id: true,
                    message: true,
                    createdAt: true,
                    senderId: true,
                    ticketId: true,
                },
            }
        }
    });
}