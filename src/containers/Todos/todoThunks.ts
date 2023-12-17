import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi";
import {Todos} from "../../types";

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