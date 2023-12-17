import React, {useCallback, useState} from 'react';
import {TodoApi} from "../../types";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../app/store";
import {fetchTodos, onSubmit} from "../../containers/Todos/todoThunks";
import ButtonSpinner from "../../Spinner/ButtonSpinner";

const TodoForm: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const todoSending = useSelector((state: RootState) => state.todos.isLoading);
  
  const [todo, setTodo] = useState<TodoApi>({
    title: '',
    status: false,
  });
  
  const todoChanged = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    
    setTodo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }, []);
  
  const onFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await dispatch(onSubmit(todo));
    await dispatch(fetchTodos());
  };
  
  return (
    <form className="col-6" onSubmit={onFormSubmit}>
      <h4>Add new Todo</h4>
      <div className="form-group mt-5">
        <label htmlFor="title" className="form-label">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          className="form-control mb-3"
          onChange={todoChanged}
          required
        />
      </div>
      <div className="form-group">
        <button
          type="submit"
          className="btn btn-primary w-100"
          disabled={todoSending}
        >
          {todoSending && <ButtonSpinner/>}
          Submit
        </button>
      </div>
    </form>
  );
};

export default TodoForm;