"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"



const formSchema = z.object({
  date: z.date(),
  title: z.string().min(1).max(50),
  company: z.string().min(1).max(50),
  status: z.enum(['applied', 'rejected', 'offered', 'pending']),
})

export default function ProfileForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: "",
      title: "",
      company: "",
      status: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-end gap-4 w-full">
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => {
            return (
              <FormItem className="flex flex-col justify-start basis-1/5">
                <FormLabel className="font-bold text-primary">
                  Date
                </FormLabel>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild className="text-primary">
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "min-w-max pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </FormControl>

              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => {
            return (
              <FormItem className="basis-1/3">
                <FormLabel className="font-bold text-primary">
                  Job Title
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    placeholder="Software Developer..."
                  />
                </FormControl>

              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="company"
          render={({ field }) => {
            return (
              <FormItem className="basis-1/5">
                <FormLabel className="font-bold text-primary">
                  Company Name
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Google"
                    type="text"
                  />
                </FormControl>

              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => {
            return (
              <FormItem className="basis-1/5">
                <FormLabel className="font-bold text-primary">
                  Status
                </FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className={field.value ? "" : "text-muted-foreground"}>
                        <SelectValue placeholder="Applied" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="applied">Applied</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                      <SelectItem value="offered">Offered</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>

              </FormItem>
            );
          }}
        />
        <Button type="submit" className="">Add</Button>
      </form>
    </Form>
  )
}