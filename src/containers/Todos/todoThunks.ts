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
  async (todo, thunkAPI) => {
    const currentTodos = thunkAPI.getState().todos.todoList;
    
    const changedTodo = currentTodos.find(item => item.id === todo.id);
    
    if (!changedTodo) {
      return;
    } else {
      const updatedTodo: TodoApi = {
        title: changedTodo.title,
        status: !changedTodo.status
      };
      await axiosApi.put('/todos/' + todo.id + '.json', updatedTodo);
    }
  }
);

export const deleteTodo = createAsyncThunk<void, Todo, { state: RootState }>(
  'todo/deleteTodo',
  async (todo) => {
    await axiosApi.delete<Todos>('/todos/' + todo.id + '.json');
  }
);
