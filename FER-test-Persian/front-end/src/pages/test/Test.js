import { useState, useEffect, useRef } from "react";
import "./Test.scss";
import Waiting from "./Waiting";
import LoadingSpinner from "components/LoadingSpinner";
import { Navigate, useNavigate, useParams } from "react-router-dom";

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
// the options in the test (possible answers):
// const options = [
//   { feeling: "شاد 😀", id: "happiness" },
//   { feeling: "غمگین 😞", id: "sadness" },
//   { feeling: "متعجب 😮", id: "surprise" },
//   { feeling: "عصبانی 😡", id: "anger" },
//   { feeling: "ترسیده 😨", id: "fear" },
//   { feeling: "چندش 🤢", id: "disgust" },
// ];
const options = [
  { feeling: "شادی", id: "happiness" },
  { feeling: "غم", id: "sadness" },
  { feeling: "تعجب", id: "surprise" },
  { feeling: "عصبانیت", id: "anger" },
  { feeling: "ترس", id: "fear" },
  { feeling: "انزجار", id: "disgust" },
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
function Test({ type, setAnswers }) {
  // *TODO: Try to remove finished state and use navigate like I did in goToNextQuestion function.
  const [index, setIndex] = useState(0); // this index will increment one by one from 0 to 59
  const [selectedOption, setSelectedOption] = useState(null);
  const [isBreakTime, setIsBreakTime] = useState(true);
  const [doneWithImageLoading, setDoneWithImageLoading] = useState(false); // Either successfully or with failure
  ////////
  const [image, setImage] = useState(
    <img
      src={require(`assets/images/${type}/${shuffledArray1to60[0]}.jpg`)}
      onError={handleRetryLoadingImage}
      onLoad={() => setDoneWithImageLoading(true)}
    />
  );

  const [finished, setFinished] = useState(false);
  const testRef = useRef();
  const scrollTimeOutRef = useRef();
  const selectOptionTimeOutRef = useRef();
  const navigate = useNavigate();
  ////////
  const numberOfQuestions = type === "sample" ? 6 : 60;
  // This array will include 60 items and each item will be true, false or null, corresponding to correct answer, wrong answer or not answered respectively:

  ////////////
  const imageNumber = shuffledArray1to60[index];
  const correctAnswer = emotions[(imageNumber - 1) % 6];
  if (index === numberOfQuestions && !finished) setFinished(true);
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
      <img
        src={require(`assets/images/${type}/${imageNum}.jpg`)}
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
    setIndex((previousIndex) => previousIndex + 1);
    // if (index + 1 === numberOfQuestions) return setFinished(true);
    if (index + 1 === numberOfQuestions) return navigate("/test/results"); //*! I don't know why the argument "results" won't do the job and "/test/results" does. If we use the <Navigate/> component it will be the same (we will need to use <Navigate to="/test/results" />)
    const imageNum = shuffledArray1to60[index + 1];
    const nextImage = (
      <img
        src={require(`assets/images/${type}/${imageNum}.jpg`)}
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
      <img
        src={require(`assets/images/${type}/${imageNum}.jpg`)}
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
    <div className="Test" dir="rtl" ref={testRef}>
      <div className="main">
        <div className="image">
          {image}
          <span dir="ltr">{`${index + 1} of ${numberOfQuestions}`}</span>
        </div>
        <div className="QA">
          <div className="QA-nav">
            <button
              className="previous"
              onClick={goToPreviousQuestion}
              disabled={index === 0 || selectedOption}
            >
              {/* // *This is a html chevron icon 👇:   */}
              &#8249;
            </button>
            <h3>شخص چه حسی دارد؟</h3>
            <button
              className="next"
              onClick={goToNextQuestion}
              disabled={selectedOption}
            >
              &#8250;
            </button>
          </div>
          <div className="options">
            {options.map((item, index) => (
              <button
                key={item.id}
                id={item.id}
                onClick={() => handleSelectOption(item.id)}
                className={item.id === selectedOption ? "selected" : ""}
                disabled={selectedOption}
                style={{
                  background: `linear-gradient(to left, ${colors[index]}, 20%, snow)`,
                }}
              >
                {item.feeling}
              </button>
            ))}
          </div>
        </div>

        <Waiting
          display={(isBreakTime || !doneWithImageLoading).toString()}
          setIsBreakTime={setIsBreakTime}
          setDoneWithImageLoading={setDoneWithImageLoading}
        />
      </div>
    </div>
  );
}
export default Test;
