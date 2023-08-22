"use client";

import { ITask } from "@/api";
import Tasks from "@/components/tasks";

interface TodoListProps {
  tasks: ITask[];
}

const TodoList: React.FC<TodoListProps> = ({ tasks }) => {
  return (
    <div>
      <div>
        <div>
          <div className=" text-lg ml-3 opacity-90">Tasks</div>
        </div>

        <div className="max-h-80 sm:max-h-96 overflow-y-auto">
          {tasks.map((task) => (
            <Tasks key={task.id} tasks={task} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default TodoList;
