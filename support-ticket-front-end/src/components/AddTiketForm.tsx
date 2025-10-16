"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import Spinner from "./spinner";
import { TicketFormValues, TicketPriorityEnum, ticketschema, TicketStatusEnum } from "@/schema/TicketSchema";
import { createTicketAction } from "@/serverActions/ticket.action";

const AddTiketForm = ({userId}: {userId: string | null}) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const defaultValues: TicketFormValues = {
        title: "",
        description: "",
        status: "OPEN",      
        priority: "MEDIUM",
        userId: "",                     
        replies: [],                    
        createdAt: new Date(),          
        updatedAt: new Date(),
    };

    const form = useForm<TicketFormValues>({
        resolver: zodResolver(ticketschema) as unknown as Resolver<TicketFormValues>,
        defaultValues,
        mode: "onChange",
    });

    const onSubmit = async (data: TicketFormValues) => {
        setLoading(true);
        await createTicketAction({
            title: data.title,
            description: data.description,
            priority: data.priority,
            status: data.status,
            userId: userId as string,
            updatedAt: data.updatedAt,
        });
        form.reset();
        setOpen(false);
        setLoading(false);
    };

    return(
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button><Plus size={14} className="mr-1"/>New Ticket</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Ticket</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input placeholder="shadcn" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Short description</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Tell us a little bit about yourself" className="resize-none" {...field} />
                        </FormControl>
                        <FormDescription>you can write a short Ticcket</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />


                  <DialogFooter>
                    <Button type="submit" disabled={loading}>{
                        loading ? (<><Spinner /> Saving</>) : ("Save")
                      }</Button>
                    <DialogClose asChild>
                        <Button variant="destructive">Cancel</Button>
                    </DialogClose>
                    
                  </DialogFooter>
                </form>
              </Form>
      
            </div>
            
          </DialogContent>
      </Dialog>
    );
}

export default AddTiketForm