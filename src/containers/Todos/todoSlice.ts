import {createSlice} from "@reduxjs/toolkit";
import {Todo} from "../../types";
import {fetchTodos} from "./todoThunks";

interface TodoState {
  todoList: Todo[];
  isLoading: boolean;
  isError: boolean;
}

const initialState: TodoState = {
  todoList: [{
    id: '',
    title: '',
    status: false
  }],
  isLoading: false,
  isError: false,
};

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchTodos.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.todoList = action.payload.reverse();
      state.isLoading = false;
    });
    builder.addCase(fetchTodos.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  }
});

export const todoReducer = todoSlice.reducer;