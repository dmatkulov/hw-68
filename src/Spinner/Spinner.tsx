const Spinner = () => {
  return (
    <div className="d-flex align-items-center justify-content-center mb-3">
      <div className="spinner-border text-primary text-center" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Spinner;