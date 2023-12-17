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

// export const changeStatus = createAsyncThunk<void, TodoApi, {state: RootState}>(
//   'todo/checkStatus',
//   async (_, thunkAPI) => {
//     const currentTodo = thunkAPI.getState().todos.todo;
//
//     await axiosApi.put('/todos.json', changedTodo);
//   }
// );

export const onSubmit = createAsyncThunk<void, TodoApi, {state: RootState}>(
  'todo/addTodo',
  async (newTodo) => {
    await axiosApi.post('/todos.json', newTodo);
}
);
