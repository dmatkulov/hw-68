import React, {useCallback, useState} from 'react';
import {TodoApi} from "../../types";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../app/store";
import {fetchTodos, addNewTodos} from "../../containers/Todos/todoThunks";
import ButtonSpinner from "../../Spinner/ButtonSpinner";

const TodoForm: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const isCreating = useSelector((state: RootState) => state.todos.isCreating);
  
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
    await dispatch(addNewTodos(todo));
    await dispatch(fetchTodos());
  };
  
  return (
    <form onSubmit={onFormSubmit}>
      <h4>Add new Task</h4>
      <div className="row d-flex align-items-end mb-5 pb-5 border-bottom">
        <div className="col-8 form-group">
          <label htmlFor="title" className="form-label"/>
          <input
            type="text"
            name="title"
            id="title"
            className="form-control"
            placeholder="Add title"
            onChange={todoChanged}
            required
          />
        </div>
        <div className="form-group col-4">
          <button
            type="submit"
            className={isCreating ? 'btn btn-primary w-100' : 'btn btn-secondary w-100'}
            disabled={isCreating}
          >
            {isCreating && <ButtonSpinner/>}
            {isCreating ? 'Creating...' : 'Add'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default TodoForm;