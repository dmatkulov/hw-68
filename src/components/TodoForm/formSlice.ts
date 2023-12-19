import {TodoApi} from "../../types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {addNewTodos} from "./formThunks";

interface FormState {
  todoForm: TodoApi;
  isCreating: boolean;
  isError: boolean;
}

const initialState: FormState = {
  todoForm: {
    title: '',
    status: false
  },
  isCreating: false,
  isError: false
};


export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setTodoForm: (state, action: PayloadAction<string>) => {
      state.todoForm.title = action.payload;
    },
  },
  extraReducers: builder => {
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

export const formReducer = formSlice.reducer;
export const {
  setTodoForm
} = formSlice.actions;