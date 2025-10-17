"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import Spinner from "./spinner";
import { ticketChabgeSchema, TicketChangeValues} from "@/schema/TicketSchema";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { changeTicketAction } from "@/serverActions/ticket.action";

const ChangeTicket = ({ ticketId }: { ticketId: string }) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const defaultValues: TicketChangeValues = {
        status: "OPEN",      
        priority: "MEDIUM",
    };

    const form = useForm<TicketChangeValues>({
        resolver: zodResolver(ticketChabgeSchema) as unknown as Resolver<TicketChangeValues>,
        defaultValues,
        mode: "onChange",
    });

    const onSubmit = async (data: TicketChangeValues) => {
        setLoading(true);
        const test = await changeTicketAction({
            ticketId,
            priority: data.priority,
            status: data.status,
        });
        setOpen(false);
        setLoading(false);
    };

    return(
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">Change Status</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Change the status and priority for Ticket</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Status</FormLabel>
                            <FormControl>
                                <Select
                                value={field.value}           // ربط القيمة
                                onValueChange={field.onChange} // ربط التغيير
                                >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="OPEN">Open</SelectItem>
                                    <SelectItem value="INPROGRESS">In Progress</SelectItem>
                                    <SelectItem value="CLOSED">Closed</SelectItem>
                                </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />

                    <FormField
                    control={form.control}
                    name="priority"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Priority</FormLabel>
                        <FormControl>
                            <Select value={field.value}
                                onValueChange={field.onChange}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select priority" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="LOW">Low</SelectItem>
                                <SelectItem value="MEDIUM">Medium</SelectItem>
                                <SelectItem value="HIGH">High</SelectItem>
                            </SelectContent>
                            </Select>
                        </FormControl>
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

export default ChangeTicket