"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Ticket,
  MessageSquare,
  Clock,
  CheckCircle2,
  TrendingUp,
  Users,
  Zap,
  Shield,
  HeadphonesIcon,
} from "lucide-react";

export default function Home() {
  const stats = [
    { label: "Total Tickets", value: "1,234", icon: Ticket, color: "text-blue-600" },
    { label: "Active Tickets", value: "89", icon: Clock, color: "text-yellow-600" },
    { label: "Resolved Today", value: "45", icon: CheckCircle2, color: "text-green-600" },
    { label: "Avg Response Time", value: "2.5h", icon: TrendingUp, color: "text-purple-600" },
  ];

  const features = [
    {
      icon: Ticket,
      title: "Easy Ticket Submission",
      description: "Submit support tickets quickly with detailed descriptions and attachments.",
    },
    {
      icon: MessageSquare,
      title: "Real-time Updates",
      description: "Get instant notifications when your ticket status changes or receives a response.",
    },
    {
      icon: Users,
      title: "Dedicated Support Team",
      description: "Our expert team is ready to help you resolve issues efficiently.",
    },
    {
      icon: Zap,
      title: "Fast Resolution",
      description: "Average ticket resolution time of less than 24 hours.",
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your data is encrypted and handled with the highest security standards.",
    },
    {
      icon: HeadphonesIcon,
      title: "24/7 Availability",
      description: "Submit tickets anytime and our team will respond during business hours.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 sm:py-32">
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          <Badge variant="secondary" className="text-sm px-4 py-1">
            Professional Support System
          </Badge>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Support Center
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            Get the help you need, when you need it. Our dedicated support team is here to
            resolve your issues quickly and efficiently.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button size="lg" asChild className="w-full sm:w-auto">
              <Link href="/tickets/new">
                <Ticket className="mr-2 h-5 w-5" />
                Submit a Ticket
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="w-full sm:w-auto">
              <Link href="/tickets">View My Tickets</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-3xl font-bold mt-1">{stat.value}</p>
                  </div>
                  <stat.icon className={`h-12 w-12 ${stat.color} opacity-80`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold">Why Choose Our Support?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We provide a comprehensive support system designed to make problem resolution
            simple and efficient.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-all hover:-translate-y-1">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 mb-16">
        <Card className="bg-gradient-to-r from-primary/10 via-primary/5 to-background border-primary/20">
          <CardContent className="py-12 px-6 text-center">
            <h2 className="text-3xl font-bold mb-4">Need Help Right Now?</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Don't wait! Submit your support ticket now and our team will get back to you as
              soon as possible.
            </p>
            <Button size="lg" asChild>
              <Link href="/tickets/new">
                Get Started
                <Ticket className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}