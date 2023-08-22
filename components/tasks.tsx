"use client";

import React, { FormEventHandler, useState } from "react";

import {toast} from "react-hot-toast";
import { ITask, deleteTodo, editTodo } from "@/api";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { BiEdit } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import { BiCheckCircle } from "react-icons/bi";
import { MdOutlineCancel } from "react-icons/md";

import { format, parseISO } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
interface TasksProps {
  tasks: ITask;
}

const Tasks: React.FC<TasksProps> = ({ tasks }) => {
  const router = useRouter();
  const [taskToEdit, setTaskToEdit] = useState(tasks.text);
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [onTicked, setOnTicked] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [currentDate, setCurrentDate] = React.useState<Date | undefined>(
    tasks.date ? new Date(tasks.date as string) : undefined
  );



  const dateString = tasks.date; // Your date string

  const date = parseISO(tasks.date as string );
  const formattedDate = format(date, "EEE, MMM d ");
  const formattedSelectedDate = currentDate?.toISOString();

  const handleClickEdit: FormEventHandler<HTMLFormElement> = async (e) => {
   
   
    try {
      toast.success('Successfully updated!');
      setLoading(true);
      e.preventDefault();
      await editTodo({
        id: tasks.id,
        text: taskToEdit,
        date: formattedSelectedDate,
      });

      setTaskToEdit("");
      setOpenEdit(false);
      router.refresh();
    } catch (error) {
      console.log("error editing");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      toast.success('Tasks Deleted!');
      setLoading(true);
      await deleteTodo(id);
      setOpenEdit(false);
      router.refresh();
    } catch (error) {
     toast.error("error deleting");
    }
  };

  const handleOnTicked = () => {
    !onTicked
      ? (() => {
          setOnTicked(true);
          setLoading(true);
        })()
      : (() => {
          setOnTicked(false);
          setLoading(false);
        })();
  };

  return (
    <>
      <div key={tasks.id} className="ml-3 mr-3 mt-1 mb-1">
        <div className="font-medium ">
          {!openEdit ? (
            <div className="flex justify-between flex-col items-center">
              <div className="flex items-start  justify-around  w-full rounded-md p-1 border bg-[#ececec37] ">
                <Checkbox onClick={handleOnTicked} className="mt-[6px] ml-2" />
                {!onTicked ? (
                  <div className="flex justify-between w-full flex-wrap">
                    <div className="text-lg  ml-0.5 opacity-70 truncate w-52 grow-[2] ">
                      {tasks.text}
                    </div>

                    <div className="flex items-center gap-1 text-[14px] opacity-70 justify-end grow-[1] ">
                      <div>{formattedDate}</div>
                      <div className="flex mr-2">
                        <BiEdit
                          className={`opacity-70 hover:opacity-100`}
                          /*  className={`opacity-70 hover:opacity-100 ${
                          onTicked ? "pointer-events-none opacity-20" : ""
                        }`} */
                          cursor={loading ? "not-allowed" : "pointer"}
                          size={18}
                          disabled={loading}
                          onClick={() => setOpenEdit(true)}
                        />
                        <AiOutlineDelete
                          className="opacity-70 hover:opacity-100"
                          cursor="pointer"
                          size={18}
                          disabled={loading}
                          onClick={() => handleDelete(tasks.id)}
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-between w-full ">
                    <del className="opacity-50 ml-2 text-lg">{tasks.text}</del>
                    <div>
                      <AiOutlineDelete
                        className="text-red-400 mt-1.5"
                        cursor="pointer"
                        size={20}
                        disabled={loading}
                        onClick={() => handleDelete(tasks.id)}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex">
              <form
                onSubmit={handleClickEdit}
                className=" flex w-full justify-between gap-1 ">
                <div className="flex-grow">
                  <Input
                    className="h-[40px]"
                    placeholder={taskToEdit}
                    value={taskToEdit}
                    onChange={(e) => setTaskToEdit(e.target.value)}
                  />
                </div>
                <div className="flex items-center">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[130px] justify-start text-left  h-[40px]",
                          !currentDate && "text-muted-foreground"
                        )}>
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {currentDate ? (
                          <div className="text-[10px] truncate">
                            {" "}
                            {format(currentDate, "EEE, MMM d ")}
                          </div>
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={currentDate}
                        onSelect={setCurrentDate}
                        initialFocus
                        disabled={(date) => date < new Date()}
                      />
                    </PopoverContent>
                  </Popover>

                  <BiCheckCircle
                    className="opacity-70 hover:opacity-100 text-[#6cdf49]"
                    cursor="pointer"
                    size={21}
                    disabled={loading}
                    onClick={handleClickEdit}
                    type="submit">
                    Save
                  </BiCheckCircle>

                  <MdOutlineCancel
                    className="opacity-70 hover:opacity-100 text-red-400"
                    cursor="pointer"
                    disabled={loading}
                    size={21}
                    onClick={() => setOpenEdit(false)}>
                    Cancel
                  </MdOutlineCancel>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Tasks;
