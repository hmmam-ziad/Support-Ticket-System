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
import { ITicket } from "@/interfaces";
import Link from "next/link";


const DashboardAdmin = ({tickets}: {tickets: ITicket[]}) => {

  const getStatusColor = (status: ITicket["status"]) => {
    switch (status) {
      case "OPEN":
        return "bg-blue-500/10 text-blue-700 hover:bg-blue-500/20";
      case "INPROGRESS":
        return "bg-yellow-500/10 text-yellow-700 hover:bg-yellow-500/20";
      case "CLOSED":
        return "bg-green-500/10 text-green-700 hover:bg-green-500/20";
      default:
        return "bg-gray-500/10 text-gray-700";
    }
  };

  const getPriorityColor = (priority: ITicket["priority"]) => {
    switch (priority) {
      case "LOW":
        return "bg-slate-500/10 text-slate-700 hover:bg-slate-500/20";
      case "MEDIUM":
        return "bg-blue-500/10 text-blue-700 hover:bg-blue-500/20";
      case "HIGH":
        return "bg-orange-500/10 text-orange-700 hover:bg-orange-500/20";
      default:
        return "bg-gray-500/10 text-gray-700";
    }
  };

  const getStatusIcon = (status: ITicket["status"]) => {
    switch (status) {
      case "OPEN":
        return <AlertCircle className="h-4 w-4" />;
      case "INPROGRESS":
        return <Clock className="h-4 w-4" />;
      case "CLOSED":
        return <CheckCircle2 className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const formatDate = (date?: Date | string) => {
    if (!date) return "Unknown date";
    const d = typeof date === "string" ? new Date(date) : date;
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(new Date(d));
  };

  const stats = [
    { label: "Total Tickets", value: tickets.length, icon: MessageSquare },
    { label: "Open", value: tickets.filter(t => t.status === "OPEN").length, icon: AlertCircle },
    { label: "In Progress", value: tickets.filter(t => t.status === "INPROGRESS").length, icon: Clock },
    { label: "Closed", value: tickets.filter(t => t.status === "CLOSED").length, icon: CheckCircle2 },
  ];

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Support Tickets</h1>
            <p className="text-muted-foreground mt-1">
              Manage and track all support requests
            </p>
          </div>
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
          {tickets.map((ticket) => (
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
                      {ticket.status?.replace("_", " ")}
                    </span>
                  </Badge>
                  {(ticket.replies?.length ?? 0) > 0 && (
                    <Badge variant="outline" className="gap-1">
                      <MessageSquare className="h-3 w-3" />
                      {ticket.replies?.length ?? 0} {(ticket.replies?.length ?? 0) === 1 ? "Reply" : "Replies"}
                    </Badge>
                  )}
                </div>

                {/* Date */}
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5 mr-1.5" />
                  Created {formatDate(ticket?.createdAt)}
                </div>

                {/* Action Button */}
                <Link href={`/user/tickets/${ticket.id}`}>
                    <Button variant="outline" className="w-full" size="sm">
                      View Details
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {tickets.length === 0 && (
          <Card className="py-16">
            <CardContent className="text-center">
              <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground opacity-50 mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Tickets Yet</h3>
            </CardContent>
          </Card>
        )} 
      </div>
    </div>
  );
};

export default DashboardAdmin;