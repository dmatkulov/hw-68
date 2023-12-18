import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Todo, TodoApi} from "../../types";
import {addNewTodos, fetchTodos} from "./todoThunks";

interface TodoState {
  todoList: Todo[];
  todoForm: TodoApi,
  isLoading: boolean;
  isError: boolean;
  isCreating: boolean
}

const initialState: TodoState = {
  todoList: [{
    id: '',
    title: '',
    status: false
  }],
  todoForm: {
    title: '',
    status: false,
  },
  isLoading: false,
  isError: false,
  isCreating: false
};

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    setTodoForm: (state, action: PayloadAction<string>) => {
      state.todoForm.title = action.payload;
    }
  },
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

export const {
  setTodoForm
} = todoSlice.actions;