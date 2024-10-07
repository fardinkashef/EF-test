"use client";
import { createResults } from "@/lib/server-actions/results";
import { useRef, useState } from "react";
// import axios from "axios";
// import "./Results.scss";
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
export default function Results({
  answers = initialAnswers,
  profile,
  showSaveButton,
}) {
  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState("green");
  const messageRef = useRef();
  // Handlers 👇 :
  const handleSaveResults = async () => {
    const newData = {
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
    };
    try {
      // const res = await axios.post(
      //   process.env.REACT_APP_BACKEND_URL + "/results",
      //   newData
      // );
      await createResults(newData);
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

  // Calculations 👆
  const fullName = profile.firstName + " " + profile.lastName;

  return (
    <div className="bg-slate-200 py-4 text-slate-800">
      <legend className="text-center text-xl mb-5">{`${
        profile.gender === "male" ? "Mr" : "Mrs"
      } ${fullName}'s test results are as follows:`}</legend>
      <section className="w-full max-w-[250px] bg-slate-200  rounded p-2 mx-auto my-0 mb-2">
        <h2 className="mb-2">Overall:</h2>
        <table className="border-collapse border-spacing-0 text-center p-1 border-2 border-solid border-cyan-950">
          <thead className="bg-slate-300">
            <tr>
              <th className="p-1 border-2 border-solid border-cyan-950">
                answer
              </th>
              <th className="p-1 border-2 border-solid border-cyan-950 w-8">
                ✔
              </th>
              <th className="p-1 border-2 border-solid border-cyan-950 w-8">
                ❌
              </th>
              <th className="p-1 border-2 border-solid border-cyan-950 w-8">
                ➖
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-1 border-2 border-solid border-cyan-950 font-semibold">
                aggregate
              </td>
              <td className="p-1 border-2 border-solid border-cyan-950">
                {sum.correct}
              </td>
              <td className="p-1 border-2 border-solid border-cyan-950">
                {sum.wrong}
              </td>
              <td className="p-1 border-2 border-solid border-cyan-950">
                {sum.missed}
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="w-full max-w-[250px] bg-slate-200  rounded p-2 mx-auto my-0 mb-2">
        <h2 className="mb-2">By each emotion:</h2>
        <table className="border-collapse border-spacing-0 text-center p-1 border-2 border-solid border-cyan-950">
          <thead className="bg-slate-300">
            <tr>
              <th className="p-1 border-2 border-solid border-cyan-950">
                emotion
              </th>
              <th className="p-1 border-2 border-solid border-cyan-950 w-8">
                ✔
              </th>
              <th className="p-1 border-2 border-solid border-cyan-950 w-8">
                ❌
              </th>
              <th className="p-1 border-2 border-solid border-cyan-950 w-8">
                ➖
              </th>
            </tr>
          </thead>

          <tbody>
            {data.map(({ emotion, emoji, correct, wrong, missed }) => (
              <tr key={emotion}>
                <td className="p-1 border-2 border-solid border-cyan-950 font-semibold">
                  {emotion} {emoji}
                </td>
                <td className="p-1 border-2 border-solid border-cyan-950">
                  {correct}
                </td>
                <td className="p-1 border-2 border-solid border-cyan-950">
                  {wrong}
                </td>
                <td className="p-1 border-2 border-solid border-cyan-950">
                  {missed}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <section className="w-full max-w-[250px] bg-slate-200  rounded p-2 mx-auto my-0 mb-2">
        <h2 className="mb-2">By each question:</h2>
        <table className="border-collapse border-spacing-0 text-center p-1 border-2 border-solid border-cyan-950">
          <thead className="bg-slate-300">
            <tr>
              <th className="p-1 border-2 border-solid border-cyan-950">
                Question
              </th>
              <th className="p-1 border-2 border-solid border-cyan-950">
                Answer
              </th>
            </tr>
          </thead>
          <tbody>
            {answers.map((answer, index) => (
              <tr>
                <td className="p-1 border-2 border-solid border-cyan-950">
                  {index + 1}
                </td>
                <td className="p-1 border-2 border-solid border-cyan-950">{`${
                  answer === true ? "✔" : answer === false ? "❌" : "➖"
                }`}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <div
        className="save h-20 flex flex-col justify-start items-center"
        style={{ display: `${showSaveButton ? "flex" : "none"}` }}
      >
        <button
          onClick={handleSaveResults}
          className="w-[200px] bg-green-600 text-white rounded p-1 hover:bg-green-400  hover:text-green-600 hover: "
        >
          save
        </button>
        <p style={{ color: messageColor }} ref={messageRef}>
          {message}
        </p>
      </div>
    </div>
  );
}
