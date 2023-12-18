import React, {useEffect} from 'react';
import TodoItem from "../../components/TodoItem/TodoItem";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../app/store";
import {fetchTodos} from "./todoThunks";
import Spinner from "../../Spinner/Spinner";

const Todos: React.FC = () => {
  const todos = useSelector((state: RootState) => state.todos.todoList);
  const  isLoading = useSelector((state: RootState) => state.todos.isLoading);
  const isError = useSelector((state: RootState) => state.todos.isError);
  const dispatch: AppDispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);
  
  return (
    <>
      {isLoading && <Spinner/>}
      {isError && (<h5>Something went wrong!</h5>)}
      {todos.length > 0 ? (todos.map((todo) => (
        <TodoItem
          todo={todo}
          key={todo.id}
        />
      ))) : (
        <h5
          className="text-secondary text-center"
        >
          Your task list is empty!
        </h5>
      )}
    </>
  );
};

export default Todos;