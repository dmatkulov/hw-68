import React from 'react';
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../app/store";
import {Todo} from "../../types";
import {fetchTodos, changeStatus, deleteTodo} from "../../containers/Todos/todoThunks";

interface Props {
  todo: Todo;
}

const TodoItem: React.FC<Props> = ({todo}) => {
  const dispatch: AppDispatch = useDispatch();
  const handleStatusChange = async () => {
    await dispatch(changeStatus(todo.id));
    await dispatch(fetchTodos());
  };
  
  const handleDelete = async () => {
    await dispatch(deleteTodo(todo.id));
    await dispatch(fetchTodos());
  };
  
  return (
    <div className="card mb-3 p-3">
      <h5 className="card-title pb-3 border-bottom mb-3 d-flex gap-2 align-items-center">
        {todo.title}
      </h5>
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <input
            type="checkbox"
            className="me-3"
            checked={todo.status}
            onChange={handleStatusChange}
          />
          {todo.status ? (
            <span className="badge text-bg-success">Completed</span>
          ) : (
            <span className="badge text-bg-secondary">Ongoing</span>
          )}
        </div>
        <button
          className="btn btn-danger"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoItem;