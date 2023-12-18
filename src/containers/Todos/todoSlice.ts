import {createSlice} from "@reduxjs/toolkit";
import {Todo} from "../../types";
import {addNewTodos, fetchTodos} from "./todoThunks";

interface TodoState {
  todo: Todo[];
  isLoading: boolean;
  isError: boolean;
  isCreating: boolean
}

const initialState: TodoState = {
  todo: [{
    id: '',
    title: '',
    status: false
  }],
  isLoading: false,
  isError: false,
  isCreating: false
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
      state.todo = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchTodos.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
    builder.addCase(addNewTodos.pending, (state) => {
      state.isCreating = true;
      state.isError = false;
    });
    builder.addCase(addNewTodos.fulfilled, (state) => {
      state.isCreating = false;
      state.isError = false;
    });
    builder.addCase(addNewTodos.rejected, (state) => {
      state.isCreating = false;
      state.isError = true;
    });
  }
});

export const todoReducer = todoSlice.reducer;

