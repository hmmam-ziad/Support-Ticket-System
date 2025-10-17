import z from "zod";

export type TicketFormValues = z.infer<typeof ticketschema>;

export const TicketStatusEnum = z.enum(["OPEN", "INPROGRESS", "CLOSED"]);
export const TicketPriorityEnum = z.enum(["LOW", "MEDIUM", "HIGH"]);

export const TicketReplySchema = z.object({
  id: z.string(),
  message: z.string(),
  createdAt: z.date(),
  updatedAt: z.date().optional(),
});

export const ticketschema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  status: TicketStatusEnum.default("OPEN"),
  priority: TicketPriorityEnum.default("MEDIUM"),
  userId: z.string(),
  replies: z.array(TicketReplySchema).default([]),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().optional(),
});


export type TicketChangeValues = z.infer<typeof ticketChabgeSchema>;


export const ticketChabgeSchema = z.object(
  {
    status: TicketStatusEnum.default("OPEN"),
    priority: TicketPriorityEnum.default("MEDIUM"),
  }
);

