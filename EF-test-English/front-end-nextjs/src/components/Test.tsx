"use client";
import { useState, useEffect, useRef } from "react";
import Waiting from "./Waiting.tsx";
// import LoadingSpinner from "components/LoadingSpinner";
import { useRouter } from "next/navigation";
import Image from "next/image.js";

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
  "#ffea6c",
  "#0c0d49",
  "#a0522d",
  "#e72222",
  "#332424",
  "#8ab852",
];

const breakTime = 500; // The time gap between qustions
const answerTime = 600000; // The time to answer a question

// This function will shuffle any given array:
const shuffleArray = (array) => array.sort((a, b) => 0.5 - Math.random());
// Shuffled array of [1,2,3, ... , 60] :
let shuffledArray1to60 = [];
for (let i = 0; i < 10; i++) {
  const newArray = Array.from({ length: 6 }, (_, j) => i * 6 + j + 1);
  shuffledArray1to60 = [...shuffledArray1to60, ...shuffleArray(newArray)];
}
/////////
export default function Test({ type, setAnswers }) {
  const [index, setIndex] = useState(0); // this index will increment one by one from 0 to 59
  const [selectedOption, setSelectedOption] = useState(null);
  const [isBreakTime, setIsBreakTime] = useState(true);
  const [doneWithImageLoading, setDoneWithImageLoading] = useState(false); // Either successfully or with failure
  ////////
  const [image, setImage] = useState(
    <Image
      fill
      className="w-full h-full sm:aspect-[3/4] sm:h-auto sm:max-h-full sm:w-full sm:h-full "
      src={`/images/${type}/${shuffledArray1to60[0]}.jpg`}
      onError={handleRetryLoadingImage}
      onLoad={() => setDoneWithImageLoading(true)}
    />
  );

  const testRef = useRef();
  const scrollTimeOutRef = useRef();
  const selectOptionTimeOutRef = useRef();

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
        fill
        className="w-full h-full sm:aspect-[3/4] sm:h-auto sm:max-h-full sm:w-full sm:h-full "
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
        fill
        className="w-full h-full sm:aspect-[3/4] sm:h-auto sm:max-h-full sm:w-full sm:h-full "
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
        fill
        className="w-full h-full sm:aspect-[3/4] sm:h-auto sm:max-h-full sm:w-full sm:h-full "
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
  const handleSelectOption = (optionId) => {
    setSelectedOption(optionId);
    const newAnswer = optionId === correctAnswer ? true : false;
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
    [numberOfQuestions]
  );
  useEffect(function () {
    clearTimeout(scrollTimeOutRef.current);
    scrollTimeOutRef.current = setTimeout(() => {
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
        <div className="w-full bg-orange-100 p-2  sm:my-2 sm:border-solid sm:border-4 sm:border-gray-500 sm:w-[350px]">
          <div className="flex gap-1 mb-1 ">
            <button
              className="grow bg-yellow-600 text-black text-[50px] leading-8 pb-[6px] hover:bg-green-300 hover:text-white disabled:opacity-50 disabled:bg-yellow-700 disabled:text-black disabled:cursor-default"
              onClick={goToPreviousQuestion}
              disabled={index === 0 || selectedOption}
            >
              {/* // *This is a html chevron icon 👇:   */}
              &#8249;
            </button>
            <h3 className="bg-orange-400 p-1 text-center text-xl text-red-800">
              What is the feeling?
            </h3>
            <button
              className="grow bg-yellow-600 text-black text-[50px] leading-8 pb-[6px] hover:bg-green-300 hover:text-white disabled:opacity-50 disabled:bg-yellow-700 disabled:text-black disabled:cursor-default"
              onClick={goToNextQuestion}
              disabled={selectedOption}
            >
              &#8250;
            </button>
          </div>
          <div className="options w-full columns-2">
            {emotions.map((emotion, index) => (
              <button
                key={emotion}
                id={emotion}
                onClick={() => handleSelectOption(emotion)}
                className={`w-full h-[60px] text-[25px] font-semibold text-black enabled:hover:cursor-pointer enabled:hover:border-solid enabled:hover:border-purple-600 enabled:hover:border-4 disabled:border-white disabled:opacity-50 ${
                  emotion === selectedOption
                    ? "!border-solid !border-4 !border-purple-600  !text-inherit !opacity-100"
                    : ""
                }`}
                disabled={selectedOption}
                style={{
                  background: `linear-gradient(to left, ${colors[index]}, 20%, snow)`,
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
