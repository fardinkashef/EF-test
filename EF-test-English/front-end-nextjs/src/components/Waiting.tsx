export default function Waiting({ setIsBreakTime, setDoneWithImageLoading }) {
  const cancelWaiting = () => {
    setIsBreakTime(false);
    setDoneWithImageLoading(true);
  };
  return (
    <div className="w-full h-full bg-green-100 flex flex-col gap-4 justify-center items-center absolute top-0 left-0 z-10">
      <div className="w-fit bg-blue-500 p-5 ">Please Wait </div>
      <button
        onClick={cancelWaiting}
        className="border-none text-lg bg-pink-400 w-[75px]"
      >
        Cancel
      </button>
    </div>
  );
}
