import { $Enums } from "@prisma/client";
import z from "zod";

export interface IUser {
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name": string;
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress" : string;
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string;
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier": string;
};

export const TicketStatus = z.enum(["OPEN", "INPROGRESS", "CLOSED"]);
export const TicketPriority = z.enum(["LOW", "MEDIUM", "HIGH"]);

export interface ITicket {
  id: string;
  title: string;
  description: string;
  status?: $Enums.TicketStatus;
  priority?: $Enums.TicketPriority;
  userId: string;
  replies?: any[];
  createdAt?: Date;
  updatedAt?: Date;
}