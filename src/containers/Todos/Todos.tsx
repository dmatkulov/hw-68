import React, {useEffect} from 'react';
import TodoItem from "../../components/TodoItem/TodoItem";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../app/store";
import {fetchTodos} from "./todoThunks";
import Spinner from "../../Spinner/Spinner";

const Todos: React.FC = () => {
  const todos = useSelector((state: RootState) => state.todos.todo);
  const  isLoading = useSelector((state: RootState) => state.todos.isLoading);
  const dispatch: AppDispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);
  
  return (
    <>
      {isLoading && <Spinner/>}
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
        />
      ))}
    </>
  );
};

export default Todos;