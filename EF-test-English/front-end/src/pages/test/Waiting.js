import "./Waiting.css";
function Waiting({ display, setIsBreakTime, setDoneWithImageLoading }) {
  const cancelWaiting = () => {
    setIsBreakTime(false);
    setDoneWithImageLoading(true);
  };
  return (
    <div className="Waiting" data-display={display}>
      <div>Please Wait  </div>
      <button onClick={cancelWaiting}>Cancel</button>
    </div>
  );
}

export default Waiting;
