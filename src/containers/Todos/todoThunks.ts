import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi";
import {TodoApi, Todos} from "../../types";
import {RootState} from "../../app/store";

export const fetchTodos = createAsyncThunk(
  'todo/fetch',
  async () => {
    const response = await axiosApi.get<Todos | null>('/todos.json');
    const fetchedTodos = response.data;
    
    if (fetchedTodos === null) {
      return [];
    } else {
      const newTodos = Object.keys(fetchedTodos).map((id) => {
        return {
          id,
          title: fetchedTodos[id].title,
          status: fetchedTodos[id].status
        };
      });
      return [...newTodos];
    }
  }
);

export const changeStatus = createAsyncThunk<void, string, {state: RootState}>(
  'todo/status',
  async (id, thunkAPI) => {
      const currentTodos = thunkAPI.getState().todos.todo;
      
      const changedTodo = currentTodos.find(todo => todo.id === id);
      
      if (!changedTodo) {
        return;
      } else {
        const updatedTodo: TodoApi = {
          ...changedTodo,
          status: !changedTodo.status
        };
        
        await axiosApi.put('/todos/' + id + '.json', updatedTodo);
      }
  }
);

export const deleteTodo = createAsyncThunk<void, string, {state: RootState}>(
  'todo/deleteTodo',
  async (id) => {
    await axiosApi.delete<Todos>('/todos/' + id + '.json');
  }
);

export const addNewTodos = createAsyncThunk<void, TodoApi, {state: RootState}>(
  'todo/addTodo',
  async (newTodo) => {
    await axiosApi.post('/todos.json', newTodo);
}
);
