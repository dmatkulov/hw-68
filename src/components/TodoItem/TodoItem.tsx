import React from 'react';

interface Props {
  title: string;
  status: boolean;
}
const TodoItem: React.FC<Props> = ({title, status = false}) => {
  return (
    <div className="col-6">
      <h4>{title}</h4>
      <div>
        <input
          type="checkbox"
          checked={status}
        />
        Status
      </div>
    </div>
  );
};

export default TodoItem;