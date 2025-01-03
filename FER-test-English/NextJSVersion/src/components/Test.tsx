"use client";
import { useState, useEffect, useRef, Dispatch, SetStateAction } from "react";
import Waiting from "./Waiting";
// import LoadingSpinner from "components/LoadingSpinner";
import { useRouter } from "next/navigation";
import Image from "next/image.js";
import { answers } from "@/lib/types";

type TestProps = {
  type: "main" | "sample";
  setAnswers: Dispatch<SetStateAction<answers>>;
};

// Every image is implying one of these emotions:
const emotions = [
  "anger",
  "disgust",
  "fear",
  "happiness",
  "sadness",
  "surprise",
];
const colors = [
  "#e72222",
  "#0c0d49",
  "#a0522d",
  "#ffa500",
  "#332424",
  "#8ab852",
];

const breakTime = 500; // The time gap between qustions
const answerTime = 600000; // The time to answer a question

// This function will shuffle any given array of numbers:
const shuffleArray = (array: number[]) =>
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  array.sort((_, __) => 0.5 - Math.random());
// Shuffled array of [1,2,3, ... , 60] :
let shuffledArray1to60: number[] = [];
for (let i = 0; i < 10; i++) {
  const newArray = Array.from({ length: 6 }, (_, j) => i * 6 + j + 1);
  shuffledArray1to60 = [...shuffledArray1to60, ...shuffleArray(newArray)];
}
/////////
export default function Test({ type, setAnswers }: TestProps) {
  const [index, setIndex] = useState(0); // this index will increment one by one from 0 to 59
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isBreakTime, setIsBreakTime] = useState(true);
  const [doneWithImageLoading, setDoneWithImageLoading] = useState(false); // Either successfully or with failure
  ////////
  const [image, setImage] = useState(
    <Image
      alt="Image of a person with some emotion"
      fill
      className="w-full h-full sm:aspect-[3/4] sm:max-h-full sm:w-full sm:h-full "
      src={`/images/${type}/${shuffledArray1to60[0]}.jpg`}
      onError={handleRetryLoadingImage}
      onLoad={() => setDoneWithImageLoading(true)}
    />
  );

  const testRef = useRef<HTMLDivElement>(null);
  const scrollTimeOutRef = useRef<NodeJS.Timeout>();
  const selectOptionTimeOutRef = useRef<NodeJS.Timeout>();

  const router = useRouter();

  ////////
  const numberOfQuestions = type === "sample" ? 6 : 60;
  // This array will include 60 items and each item will be true, false or null, corresponding to correct answer, wrong answer or not answered respectively:

  ////////////
  const imageNumber = shuffledArray1to60[index];
  const correctAnswer = emotions[(imageNumber - 1) % 6];
  /////////////
  function handleRetryLoadingImage() {
    const imageNum = shuffledArray1to60[index + 1];
    ////////////////////////////////////////////////////////
    // const reloadingImage = new Image();
    // reloadingImage.src = `./images/${type}/${imageNum}.jpg`;
    // reloadingImage.onload = () => setDoneWithImageLoading(true);
    // // * This time even if there would be an error, we are going to setDoneWithImageLoading to true anyway 👇:
    // reloadingImage.onerror = () => setDoneWithImageLoading(true);
    //////////////////////////////////////
    // * The following approach doesn't work because in a function component, React won't re-render the component if we are setting a state to its previous vaule again.  👇 :
    const reloadingImage = (
      <Image
        alt="Image of a person with some emotion"
        fill
        className="w-full h-full sm:aspect-[3/4] sm:max-h-full sm:w-full sm:h-full "
        src={`/images/${type}/${imageNum}.jpg`}
        onError={() => setDoneWithImageLoading(true)}
        onLoad={() => setDoneWithImageLoading(true)}
        // *TODO : Check this out. with the same src, react won't re-render the component event though the onError is different. That was really weird. Assigning a key prop, solved the problem as react considers this image element a different one than before  👇 (I think I even tried different ids but react considered them as the same!):
        key={Date.now()}
      />
    );
    ////////
    setImage(reloadingImage);
  }
  ///////////
  const goToNextQuestion = () => {
    if (index + 1 === numberOfQuestions) return router.push("/test/results"); //*! I don't know why the argument "results" won't do the job and "/test/results" does. If we use the <Navigate/> component it will be the same (we will need to use <Navigate to="/test/results" />)
    setIndex((previousIndex) => previousIndex + 1);

    const imageNum = shuffledArray1to60[index + 1];
    const nextImage = (
      <Image
        alt="Image of a person with some emotion"
        fill
        className="w-full h-full sm:aspect-[3/4] sm:max-h-full sm:w-full sm:h-full"
        src={`/images/${type}/${imageNum}.jpg`}
        onError={handleRetryLoadingImage}
        onLoad={() => setDoneWithImageLoading(true)}
      />
    );
    setImage(nextImage);
    setSelectedOption(null);
    setIsBreakTime(true);
    setDoneWithImageLoading(false);
  };
  const goToPreviousQuestion = () => {
    setIndex((currentIndex) => currentIndex - 1);
    if (index - 1 < 0) return setIndex(0);
    const imageNum = shuffledArray1to60[index - 1];
    const nextImage = (
      <Image
        alt="Image of a person with some emotion"
        fill
        className="w-full h-full sm:aspect-[3/4] sm:max-h-full sm:w-full sm:h-full "
        src={`/images/${type}/${imageNum}.jpg`}
        onError={handleRetryLoadingImage}
        onLoad={() => setDoneWithImageLoading(true)}
      />
    );
    setImage(nextImage);
    setSelectedOption(null);
    setIsBreakTime(true);
    setDoneWithImageLoading(false);
  };
  //////////
  const handleSelectOption = (option: string) => {
    setSelectedOption(option);
    const newAnswer = option === correctAnswer ? true : false;
    setAnswers((previousAnswers) =>
      previousAnswers.map((item, index) =>
        index === imageNumber - 1 ? newAnswer : item
      )
    );
    // The first time this function runs, the selectOptionTimeOutRef.current will be undefined but it is fine using clearTimeout on undefined so don't worry about it 👇:
    clearTimeout(selectOptionTimeOutRef.current);
    selectOptionTimeOutRef.current = setTimeout(() => {
      goToNextQuestion();
    }, 500);
  };
  /////////////
  useEffect(
    function () {
      if (isBreakTime) {
        const timeOut = setTimeout(() => {
          setIsBreakTime(false);
        }, breakTime);
        return function () {
          clearTimeout(timeOut);
        };
      }
      if (!isBreakTime && doneWithImageLoading) {
        const timeOut = setTimeout(() => {
          goToNextQuestion();
        }, answerTime);
        return function () {
          clearTimeout(timeOut);
        };
      }
    },
    [isBreakTime, doneWithImageLoading]
  );
  useEffect(
    function () {
      setAnswers(Array(numberOfQuestions).fill(null));
    },
    [numberOfQuestions, setAnswers]
  );
  useEffect(function () {
    clearTimeout(scrollTimeOutRef.current);
    scrollTimeOutRef.current = setTimeout(() => {
      if (!testRef.current) return;
      testRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 1000);
  }, []);
  ///////
  return (
    <div className="w-full grow relative h-screen" ref={testRef}>
      <div className="mx-auto my-0 mb-1 h-full flex flex-col border-solid border-2 rounded sm:flex-row-reverse sm:p-2 sm:justify-center sm:items-center sm:gap-5  ">
        <div className="relative w-full h-[10px] grow sm:w-2 sm:max-w-[500px] sm:h-full">
          {image}
          <span className="absolute bottom-0 left-0 bg-gray-500 text-white text-xl py-0 px-2 rounded">{`${
            index + 1
          } of ${numberOfQuestions}`}</span>
        </div>
        <div className="w-full bg-slate-300 p-2  sm:my-2 sm:border-solid sm:border-4 sm:border-gray-500 sm:w-[350px]">
          <div className="flex gap-1 mb-1 ">
            <button
              className="bg-slate-200 w-12 text-black text-[50px] leading-8 pb-[6px] rounded-md hover:bg-cyan-950 hover:text-cyan-50 disabled:opacity-50 disabled:hover:bg-slate-200 disabled:text-black disabled:cursor-default"
              onClick={goToPreviousQuestion}
              disabled={index === 0 || !!selectedOption}
            >
              {/* // *This is a html chevron icon 👇:   */}
              &#8249;
            </button>
            <h3 className="grow bg-slate-200 p-1 text-center text-xl text-slate-700 font-semibold rounded-md">
              Feeling...?
            </h3>
            <button
              className="bg-slate-200 w-12 text-black text-[50px] leading-8 pb-[6px] rounded-md hover:bg-cyan-950 hover:text-cyan-50 disabled:opacity-50  disabled:text-black disabled:cursor-default"
              onClick={goToNextQuestion}
              disabled={!!selectedOption}
            >
              &#8250;
            </button>
          </div>
          <div className="w-full p-2 grid grid-cols-2 gap-2">
            {emotions.map((emotion, index) => (
              <button
                key={emotion}
                id={emotion}
                onClick={() => handleSelectOption(emotion)}
                className={`w-28 p-1 mx-auto text-xl rounded-lg text-slate-100 border-solid border-2 border-transparent enabled:hover:cursor-pointer  enabled:hover:border-slate-300 enabled:hover:border-2 disabled:border-white disabled:opacity-50 ${
                  emotion === selectedOption
                    ? "!border-2 !border-slate-900 !opacity-100"
                    : ""
                }`}
                disabled={!!selectedOption}
                style={{
                  background: `${colors[index]}`,
                }}
              >
                {emotion}
              </button>
            ))}
          </div>
        </div>
        {(isBreakTime || !doneWithImageLoading) && (
          <Waiting
            setIsBreakTime={setIsBreakTime}
            setDoneWithImageLoading={setDoneWithImageLoading}
          />
        )}
      </div>
    </div>
  );
}
