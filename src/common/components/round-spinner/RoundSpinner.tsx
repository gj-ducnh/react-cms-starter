import "./round-spinner.css";

const Spinner: React.FC<any> = () => {
  return (
    <div className="spinner-wrapper">
      <div className="lds-ripple">
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Spinner;
