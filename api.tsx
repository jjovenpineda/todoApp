export interface ITask {
  id: string;
  text: string;
  date?: String | null;
}

export const getAllTodos = async (): Promise<ITask[]> => {
  const response = await fetch(
    "https://64dee0a271c3335b2581e318.mockapi.io/tasks/tasks",
    { cache: "no-store" }
  );

  const todos = await response.json();
  return todos;
};

export const addTodo = async (todo: ITask): Promise<ITask> => {
  const response = await fetch(
    "https://64dee0a271c3335b2581e318.mockapi.io/tasks/tasks",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    }
  );
  const newTodo = await response.json();

  return newTodo;
};

export const editTodo = async (todo: ITask): Promise<ITask> => {
  const response = await fetch(
    `https://64dee0a271c3335b2581e318.mockapi.io/tasks/tasks/${todo.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    }
  );
  const updatedTodo = await response.json();

  return updatedTodo;
};

export const deleteTodo = async (id: string): Promise<void> => {
  const response = await fetch(
    `https://64dee0a271c3335b2581e318.mockapi.io/tasks/tasks/${id}`,
    {
      method: "DELETE",
    }
  );
};
