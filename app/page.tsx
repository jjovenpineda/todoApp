import { getAllTodos } from "@/api";
import AddTask from "@/components/addtask";
import LoginPage from "@/components/login";
import TodoList from "@/components/todoList";

export default async function HomePage() {
  const tasks = await getAllTodos();

  return (
    <div className="  mx-auto sm:w-6/12 ">
      <div className="w-4/5 mx-auto mt-[2rem] border-solid border-2 border=[#e2e8f0] rounded-xl">
        <div>
          <h1 className="text-3xl ml-4 mt-4">Todo List</h1>
          <AddTask />
        </div>
        <TodoList tasks={tasks} />
      </div>
    </div>
  );
}
