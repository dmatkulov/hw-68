import React from 'react';

const TodoForm: React.FC = () => {
  return (
    <form className="col-6">
      <div className="form-group">
        <label htmlFor="title" className="form-label">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          className="form-control"
          required
        />
      </div>
      <div className="form-group">
        <button
          type="submit"
          className="btn btn-primary"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default TodoForm;