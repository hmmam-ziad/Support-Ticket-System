"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Clock, 
  MessageSquare, 
  AlertCircle, 
  CheckCircle2,
  ArrowRight,
  Calendar
} from "lucide-react";
import { Ticket, TicketPriority, TicketStatus } from "@/interfaces";
import AddTiketForm from "./AddTiketForm";




// Sample data - replace with real data from your API


const DashboardComponent = ({id}: {id: string}) => {
    
const mockTickets: Ticket[] = [
  {
    id: "1",
    title: "Login Issue - Cannot Access Dashboard",
    description: "I'm unable to login to my account. Keep getting error 401.",
    status: "OPEN",
    priority: "HIGH",
    userId: "user1",
    replies: [],
    createdAt: new Date("2024-10-15"),
    updatedAt: new Date("2024-10-15"),
  },
  {
    id: "2",
    title: "Payment Gateway Not Working",
    description: "Payment processing fails at checkout page.",
    status: "IN_PROGRESS",
    priority: "URGENT",
    userId: "user2",
    replies: [{}, {}],
    createdAt: new Date("2024-10-14"),
    updatedAt: new Date("2024-10-16"),
  },
  {
    id: "3",
    title: "Feature Request: Dark Mode",
    description: "Would love to see a dark mode option in the app.",
    status: "OPEN",
    priority: "LOW",
    userId: "user3",
    replies: [{}, {}, {}],
    createdAt: new Date("2024-10-13"),
    updatedAt: new Date("2024-10-14"),
  },
  {
    id: "4",
    title: "Bug: Profile Picture Not Uploading",
    description: "Cannot upload profile picture, getting 500 error.",
    status: "CLOSED",
    priority: "MEDIUM",
    userId: "user4",
    replies: [{}, {}, {}, {}],
    createdAt: new Date("2024-10-10"),
    updatedAt: new Date("2024-10-12"),
  },
];

  const getStatusColor = (status: TicketStatus) => {
    switch (status) {
      case "OPEN":
        return "bg-blue-500/10 text-blue-700 hover:bg-blue-500/20";
      case "IN_PROGRESS":
        return "bg-yellow-500/10 text-yellow-700 hover:bg-yellow-500/20";
      case "CLOSED":
        return "bg-green-500/10 text-green-700 hover:bg-green-500/20";
      default:
        return "bg-gray-500/10 text-gray-700";
    }
  };

  const getPriorityColor = (priority: TicketPriority) => {
    switch (priority) {
      case "LOW":
        return "bg-slate-500/10 text-slate-700 hover:bg-slate-500/20";
      case "MEDIUM":
        return "bg-blue-500/10 text-blue-700 hover:bg-blue-500/20";
      case "HIGH":
        return "bg-orange-500/10 text-orange-700 hover:bg-orange-500/20";
      case "URGENT":
        return "bg-red-500/10 text-red-700 hover:bg-red-500/20";
      default:
        return "bg-gray-500/10 text-gray-700";
    }
  };

  const getStatusIcon = (status: TicketStatus) => {
    switch (status) {
      case "OPEN":
        return <AlertCircle className="h-4 w-4" />;
      case "IN_PROGRESS":
        return <Clock className="h-4 w-4" />;
      case "CLOSED":
        return <CheckCircle2 className="h-4 w-4" />;
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(new Date(date));
  };

  const stats = [
    { label: "Total Tickets", value: mockTickets.length, icon: MessageSquare },
    { label: "Open", value: mockTickets.filter(t => t.status === "OPEN").length, icon: AlertCircle },
    { label: "In Progress", value: mockTickets.filter(t => t.status === "IN_PROGRESS").length, icon: Clock },
    { label: "Closed", value: mockTickets.filter(t => t.status === "CLOSED").length, icon: CheckCircle2 },
  ];

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Support Tickets</h1>
            <p className="text-muted-foreground mt-1">
              Manage and track all your support requests
            </p>
          </div>
          <AddTiketForm userId={id}/>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.label}
                    </p>
                    <p className="text-2xl font-bold mt-1">{stat.value}</p>
                  </div>
                  <stat.icon className="h-8 w-8 text-muted-foreground opacity-50" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tickets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {mockTickets.map((ticket) => (
            <Card key={ticket.id} className="hover:shadow-lg transition-all hover:-translate-y-1">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-lg line-clamp-1">
                    {ticket.title}
                  </CardTitle>
                  <Badge className={getPriorityColor(ticket.priority)} variant="secondary">
                    {ticket.priority}
                  </Badge>
                </div>
                <CardDescription className="line-clamp-2">
                  {ticket.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Status & Replies */}
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge className={getStatusColor(ticket.status)} variant="secondary">
                    <span className="flex items-center gap-1">
                      {getStatusIcon(ticket.status)}
                      {ticket.status.replace("_", " ")}
                    </span>
                  </Badge>
                  {ticket.replies.length > 0 && (
                    <Badge variant="outline" className="gap-1">
                      <MessageSquare className="h-3 w-3" />
                      {ticket.replies.length} {ticket.replies.length === 1 ? "Reply" : "Replies"}
                    </Badge>
                  )}
                </div>

                {/* Date */}
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5 mr-1.5" />
                  Created {formatDate(ticket.createdAt)}
                </div>

                {/* Action Button */}
                <Button variant="outline" className="w-full" size="sm">
                  View Details
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State - uncomment if no tickets */}
        {/* {mockTickets.length === 0 && (
          <Card className="py-16">
            <CardContent className="text-center">
              <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground opacity-50 mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Tickets Yet</h3>
              <p className="text-muted-foreground mb-4">
                Get started by creating your first support ticket
              </p>
              <Button>Create Ticket</Button>
            </CardContent>
          </Card>
        )} */}
      </div>
    </div>
  );
};

export default DashboardComponent;