type WaitingProps = {
  setIsBreakTime: React.Dispatch<React.SetStateAction<boolean>>;
  setDoneWithImageLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Waiting({
  setIsBreakTime,
  setDoneWithImageLoading,
}: WaitingProps) {
  const cancelWaiting = () => {
    setIsBreakTime(false);
    setDoneWithImageLoading(true);
  };
  return (
    <div className="w-full h-full bg-slate-200 flex flex-col gap-4 justify-center items-center absolute top-0 left-0 z-10">
      <p className="w-fit text-slate-800 text-xl p-5 ">Please Wait... </p>
      <button
        onClick={cancelWaiting}
        className="border-none text-white text-lg bg-red-500 hover:bg-red-600 w-[75px] rounded-md"
      >
        Cancel
      </button>
    </div>
  );
}
