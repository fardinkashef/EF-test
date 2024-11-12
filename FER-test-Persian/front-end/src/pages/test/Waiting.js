import "./Waiting.css";
function Waiting({ display, setIsBreakTime, setDoneWithImageLoading }) {
  const cancelWaiting = () => {
    setIsBreakTime(false);
    setDoneWithImageLoading(true);
  };
  return (
    <div className="Waiting" data-display={display}>
      <div>لطفاً صبر کنید</div>
      <button onClick={cancelWaiting}>لغو</button>
    </div>
  );
}

export default Waiting;
