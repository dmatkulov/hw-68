import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi";
import {Todo, TodoApi, Todos} from "../../types";
import {RootState} from "../../app/store";

export const fetchTodos = createAsyncThunk(
  'todo/fetch',
  async () => {
    const response = await axiosApi.get<Todos | null>('/todos.json');
    const fetchedTodos = response.data;
    
    if (fetchedTodos === null) {
      return [];
    } else {
      const newTodos: Todo[] = Object.keys(fetchedTodos).map((id) => ({
        id,
        title: fetchedTodos[id].title,
        status: fetchedTodos[id].status
      }));
      return newTodos;
    }
  }
);

export const changeStatus = createAsyncThunk<void, Todo, { state: RootState }>(
  'todo/status',
  async (todo) => {
      const updatedTodo: TodoApi = {
        title: todo.title,
        status: !todo.status
      };
      await axiosApi.put('/todos/' + todo.id + '.json', updatedTodo);
  }
);

export const deleteTodo = createAsyncThunk<void, Todo, { state: RootState }>(
  'todo/deleteTodo',
  async (todo) => {
    await axiosApi.delete<Todos>('/todos/' + todo.id + '.json');
  }
);
