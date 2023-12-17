import React, {useEffect} from 'react';
import TodoItem from "../../components/TodoItem/TodoItem";
import TodoForm from "../../components/TodoForm/TodoForm";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../app/store";
import {fetchTodos} from "./todoThunks";

const Todos: React.FC = () => {
  const todos = useSelector((state: RootState) => state.todos.todo);
  const dispatch: AppDispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);
  
  
  return (
    <div className="row">
      {todos.map((todo) => (
        <div key={todo.id}>
          {todo.title}
        </div>
      ))}
      <TodoItem/>
      <TodoForm/>
    </div>
  );
};

export default Todos;