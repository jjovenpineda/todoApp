"use client";

import { addTodo } from "@/api";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon } from "lucide-react";
import React, { FormEventHandler, useState } from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function AddTask() {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [isDateSelected, setIsDateSelected] = useState(false);

  const [loading, setLoading] = useState(false);

  const [newTaskValue, setNewTaskValue] = useState("");
  const isInputValid = newTaskValue.length >= 1;

  const router = useRouter();
  const formattedDate = selectedDate?.toISOString();

  const newTaskSubmitButton: FormEventHandler<HTMLFormElement> = async (e) => {
    if (isInputValid) {
      try {
        setLoading(true);
        e.preventDefault();
        await addTodo({
          id: uuidv4(),
          text: newTaskValue,
          date: formattedDate,
        });
        setSelectedDate(undefined);
        setNewTaskValue("");
        toast.success("Tasks added!");
        router.refresh();
      } catch (error) {
        console.log("Error adding todo:", error);
      } finally {
        setLoading(false);
      }
    } else {
      toast.error("Input must be at least 3 characters");
    }
  };

  return (
    <div className="flex flex-col justify-center">
      <form
        onSubmit={newTaskSubmitButton}
        className="flex flex-wrap justify-center gap-2 m-4">
        <Input
          className="flex-grow w-2/4"
          placeholder="Add a new task"
          value={newTaskValue}
          onChange={(e) => setNewTaskValue(e.target.value)}
        />

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                " justify-start text-left font-normal flex-grow ",
                !selectedDate && "text-muted-foreground"
              )}>
              <CalendarIcon className="mr-2 h-4 w-4" />
              {selectedDate ? (
                <div className="text-xs truncate">
                  {" "}
                  {format(selectedDate, "EEE, MMM d ")}
                </div>
              ) : (
                <span className="text-xs truncate ">Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => {
                setSelectedDate(date);
                setIsDateSelected(true);
              }}
              initialFocus
              disabled={(date) => date < new Date()}
            />
          </PopoverContent>
        </Popover>

        <Button
          disabled={loading || !isDateSelected}
          type="submit"
          className="flex-grow">
          Add
        </Button>
      </form>
    </div>
  );
}
