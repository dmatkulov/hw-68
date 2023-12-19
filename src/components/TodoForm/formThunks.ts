import {createAsyncThunk} from "@reduxjs/toolkit";
import {TodoApi} from "../../types";
import {RootState} from "../../app/store";
import axiosApi from "../../axiosApi";

export const addNewTodos = createAsyncThunk<void, TodoApi, { state: RootState }>(
  'todo/addTodo',
  async (newTodo) => {
    await axiosApi.post('/todos.json', newTodo);
  }
);