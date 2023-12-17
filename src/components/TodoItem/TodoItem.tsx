import React from 'react';
// import {useDispatch} from "react-redux";
// import {changeStatus, fetchTodos} from "../../containers/Todos/todoThunks";

interface Props {
  title: string;
  status: boolean;
}
const TodoItem: React.FC<Props> = ({title, status = false}) => {
  // const dispatch = useDispatch();
  // const checkStatus = async (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const newStatus = !status;
  //   await dispatch(changeStatus());
  //   await dispatch(fetchTodos());
  //   console.log('status', event.target.value);
  // };
  
  return (
      <div className="card mb-3 p-3">
        <h5 className="card-title">
          {title}
        </h5>
        <div>
          <input
            type="checkbox"
            checked={status}
            // onChange={checkStatus}
          />
          Status
        </div>
      </div>
  );
};

export default TodoItem;