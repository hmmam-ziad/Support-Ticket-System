"use client";

import { ITicket } from "@/interfaces";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback} from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  AlertCircle,
  Clock,
  CheckCircle2,
  Calendar,
  User,
  MessageSquare,
  Send,
  ArrowLeft,
  MoreVertical,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { IReplyWithSender } from "@/app/user/tickets/[id]/page";
import ChangeTicket from "./ChangeTicket";
import { AddReplyTicket } from "@/serverActions/ticket.action";

const TicketDetails = ({
  ticket,
  replies,
  role,
  userId
}: {
  ticket: ITicket | null;
  replies: IReplyWithSender[];
  role: string;
  userId: string
}) => {
  const [newReply, setNewReply] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getStatusColor = (status?: string) => {
    switch (status) {
      case "OPEN":
        return "bg-blue-500/10 text-blue-700 border-blue-200";
      case "INPROGRESS":
        return "bg-yellow-500/10 text-yellow-700 border-yellow-200";
      case "CLOSED":
        return "bg-green-500/10 text-green-700 border-green-200";
      default:
        return "bg-gray-500/10 text-gray-700 border-gray-200";
    }
  };

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case "LOW":
        return "bg-slate-500/10 text-slate-700 border-slate-200";
      case "MEDIUM":
        return "bg-blue-500/10 text-blue-700 border-blue-200";
      case "HIGH":
        return "bg-orange-500/10 text-orange-700 border-orange-200";
      default:
        return "bg-gray-500/10 text-gray-700 border-gray-200";
    }
  };

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case "OPEN":
        return <AlertCircle className="h-4 w-4" />;
      case "INPROGRESS":
        return <Clock className="h-4 w-4" />;
      case "CLOSED":
        return <CheckCircle2 className="h-4 w-4" />;
      default:
        return <MessageSquare className="h-4 w-4" />;
    }
  };

  const formatDate = (date?: Date | string | number) => {
    if (!date) return "";
    const d = date instanceof Date ? date : new Date(date);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(d);
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleSubmitReply = async (e: React.FormEvent) => {
    e.preventDefault();
    // Add your submit logic here
    // console.log("New reply:", newReply, userId, ticket?.id);
    setIsLoading(true);
    await AddReplyTicket({ userId, ticketId: ticket?.id, message: newReply });
    setNewReply("");
    setIsLoading(false);
  };

  // Loading or Error State
  if (!ticket) {
    return (
      <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
        <div className="max-w-5xl mx-auto">
          <Card>
            <CardContent className="py-16 text-center">
              <AlertCircle className="h-12 w-12 mx-auto text-muted-foreground opacity-50 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Ticket Not Found</h3>
              <p className="text-muted-foreground mb-4">
                The ticket you're looking for doesn't exist or has been removed.
              </p>
              <Button asChild>
                <Link href="/user/dashboard">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Tickets
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <Button variant="ghost" asChild>
            <Link href="/user/dashboard">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Tickets
            </Link>
          </Button>
          <div className="flex gap-2">
            
            {role === "Admin" && <ChangeTicket ticketId={ticket.id} />}          
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Main Ticket Card */}
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <div className="flex-1 space-y-3">
                <div className="flex items-start gap-2 flex-wrap">
                  <Badge className={getStatusColor(ticket.status)} variant="outline">
                    <span className="flex items-center gap-1">
                      {getStatusIcon(ticket.status)}
                      {ticket.status?.replace("_", " ")}
                    </span>
                  </Badge>
                  <Badge className={getPriorityColor(ticket.priority)} variant="outline">
                    {ticket.priority}
                  </Badge>
                </div>
                <CardTitle className="text-2xl sm:text-3xl">{ticket.title}</CardTitle>
                <CardDescription className="text-base">
                  Ticket ID: #{ticket.id.slice(-8)}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Metadata */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Created:</span>
                <span className="font-medium">{formatDate(ticket.createdAt)}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Updated:</span>
                <span className="font-medium">{formatDate(ticket.updatedAt)}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">User ID:</span>
                <span className="font-medium">{ticket.userId}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Replies:</span>
                <span className="font-medium">{replies?.length || 0}</span>
              </div>
            </div>

            <Separator />

            {/* Description */}
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Description</h3>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                {ticket.description}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Replies Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Replies {replies && replies.length > 0 && `(${replies.length})`}
            </CardTitle>
            <CardDescription>
              Conversation history and support responses
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Replies List */}
            {replies && replies.length > 0 ? (
              <div className="space-y-4">
                {replies.map((reply, index) => (
                  <div key={index} className="flex gap-4 p-4 rounded-lg bg-muted/30">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>
                        {getInitials(reply.sender?.userName || "User")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-2">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <p className="font-semibold">{reply.sender?.userName || "User"}</p>
                          <p className="text-xs text-muted-foreground">
                            {formatDate(reply.createdAt)}
                          </p>
                        </div>
                      </div>
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">
                        {reply.message}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground opacity-50 mb-3" />
                <p className="text-muted-foreground">No replies yet</p>
                <p className="text-sm text-muted-foreground">
                  Be the first to respond to this ticket
                </p>
              </div>
            )}

            <Separator />

            {/* Reply Form */}
            {ticket.status !== "CLOSED" && (
              <form onSubmit={handleSubmitReply} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="reply">Add a Reply</Label>
                  <Textarea
                    id="reply"
                    placeholder="Type your response here..."
                    value={newReply}
                    onChange={(e) => setNewReply(e.target.value)}
                    rows={4}
                    className="resize-none"
                  />
                </div>
                <div className="flex justify-end">
                  {isLoading ? (
                                  <Button disabled type="button" variant="outline" size={"sm"}>
                                    Sending...
                                  </Button>
                                ) : (
                  <Button type="submit" disabled={!newReply.trim()}>
                    <Send className="mr-2 h-4 w-4" />
                    Send Reply
                  </Button> )}
                </div>
              </form>
            )}

            {ticket.status === "CLOSED" && (
              <div className="text-center py-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  This ticket is closed. Reopen it to add more replies.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TicketDetails;