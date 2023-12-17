import React, {useEffect} from 'react';
import TodoItem from "../../components/TodoItem/TodoItem";
import TodoForm from "../../components/TodoForm/TodoForm";
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
    <div className="container-md mx-auto">
      <div className="row">
        <div className="col-6">
          {isLoading && <Spinner/>}
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              title={todo.title}
              status={todo.status}
            />
          ))}
        </div>
        <div className="col-6">
          <TodoForm/>
        </div>
      </div>
    </div>
  );
};

export default Todos;