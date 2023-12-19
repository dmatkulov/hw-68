import {configureStore} from "@reduxjs/toolkit";
import {todoReducer} from "../containers/Todos/todoSlice";
import {formReducer} from "../components/TodoForm/formSlice";

export const store = configureStore({
  reducer: {
    todos: todoReducer,
    form: formReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;