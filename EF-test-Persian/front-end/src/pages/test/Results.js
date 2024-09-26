import { useRef, useState } from "react";
import axios from "axios";
import "./Results.scss";
const emotions = [
  "anger",
  "disgust",
  "fear",
  "happiness",
  "sadness",
  "surprise",
];
const emojis = ["😡", "🤢", "😨", "😀", "😞", "😮"];
const initialAnswers = Array(60).fill(null);
////////
////////
////////
function Results({ answers = initialAnswers, profile, showSaveButton }) {
  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState("green");
  const messageRef = useRef();
  // Handlers 👇 :
  const handleSaveResults = async () => {
    try {
      // ! ALWAYS REMEMBER WHEN YOU CHANGE .env FILE, YOU NEED TO RESTART THE APPLICATION (STOP IT USING Ctrl+c AND START IT AGAIN)
      const res = await axios.post(
        process.env.REACT_APP_BACKEND_URL + "/results",
        // "http://localhost:5000/api/results",

        {
          profile,
          results: {
            byEachQuestion: answers,
            byEachEmotion: data,
            byAnswerStatus: {
              correct: sum.correct,
              wrong: sum.wrong,
              missed: sum.missed,
            },
          },
        }
      );
      setMessage("Results saved successfully");
      setMessageColor("green");
    } catch (error) {
      setMessage("Something went wrong and couldn't save the results");
      setMessageColor("red");
      console.log(error);
    } finally {
      messageRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };
  // Handlers 👆

  // Calculations 👇 :

  let data = emotions.map((emotion, index) => ({
    emotion,
    emoji: emojis[index],
    correct: 0,
    wrong: 0,
    missed: 0,
  }));
  for (let i = 0; i < answers.length; i++) {
    if (answers[i] === true) data[i % 6].correct++;
    else if (answers[i] === false) data[i % 6].wrong++;
    else data[i % 6].missed++;
  }
  const numberOfInAnswers = (value) => {
    const array = answers.filter((answer) => answer === value);
    return array.length;
  };
  let sum = {
    correct: numberOfInAnswers(true),
    wrong: numberOfInAnswers(false),
    missed: numberOfInAnswers(null),
  };
  const text =
    "نتایج آزمون" +
    " " +
    `${!profile.gender ? "" : profile.gender === "مرد" ? "آقای" : "خانم"}` +
    " " +
    profile.firstName +
    " " +
    profile.lastName +
    " " +
    "به صورت زیر است :" +
    " ";
  const text1 = `:نتایج آزمون ${
    !profile.gender ? "" : profile.gender === "مرد" ? "آقای" : "خانم"
  } ${profile.firstName} ${profile.lastName} به صورت زیر است`;
  // Calculations 👆
  return (
    <div dir="ltr" className="results">
      <legend>{text1}</legend>
      <section>
        <p>Results aggregate:</p>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>✔</th>
              <th>❌</th>
              <th>➖</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>aggregate</td>
              <td>{sum.correct}</td>
              <td>{sum.wrong}</td>
              <td>{sum.missed}</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section>
        <p>Results seperated by each emotion:</p>
        <table>
          <thead>
            <tr>
              <th>emotion</th>
              <th>✔</th>
              <th>❌</th>
              <th>➖</th>
            </tr>
          </thead>

          <tbody>
            {data.map(({ emotion, emoji, correct, wrong, missed }) => (
              <tr key={emotion}>
                <td>
                  {emotion} {emoji}
                </td>
                <td>{correct}</td>
                <td>{wrong}</td>
                <td>{missed}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <section>
        <p>Results by each question:</p>
        <table>
          <thead>
            <tr>
              <th>Q</th>
              <th>A</th>
            </tr>
          </thead>
          <tbody>
            {answers.map((answer, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{`${
                  answer === true ? "✔" : answer === false ? "❌" : "➖"
                }`}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <div
        className="save"
        style={{ display: `${showSaveButton ? "flex" : "none"}` }}
      >
        <button onClick={handleSaveResults}>save</button>
        <p style={{ color: messageColor }} ref={messageRef}>
          {message}
        </p>
      </div>
    </div>
  );
}
export default Results;
