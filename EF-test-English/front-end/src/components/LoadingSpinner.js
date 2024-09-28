import "./LoadingSpinner.css";
import ClipLoader from "react-spinners/ClipLoader";

function LoadingSpinner() {
  return (
    <div className="loading-spinner">
      <ClipLoader color="green" size={75} />
    </div>
  );
}
export default LoadingSpinner;
