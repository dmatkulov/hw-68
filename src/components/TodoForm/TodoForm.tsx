import React, {useCallback} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../app/store";
import {fetchTodos, addNewTodos} from "../../containers/Todos/todoThunks";
import ButtonSpinner from "../../Spinner/ButtonSpinner";
import {setTodoForm} from "../../containers/Todos/todoSlice";

const TodoForm: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const todoForm = useSelector((state: RootState) => state.todos.todoForm);
  const isCreating = useSelector((state: RootState) => state.todos.isCreating);
  
  const todoChanged = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setTodoForm(event.target.value));
  }, [dispatch]);
  
  const onFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await dispatch(addNewTodos(todoForm));
    await dispatch(fetchTodos());
    dispatch(setTodoForm(''));
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
            placeholder="Todo..."
            value={todoForm.title}
            onChange={todoChanged}
            required
          />
        </div>
        <div className="form-group col-4">
          <button
            type="submit"
            className={isCreating ? 'btn btn-secondary w-100' : 'btn btn-primary w-100'}
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