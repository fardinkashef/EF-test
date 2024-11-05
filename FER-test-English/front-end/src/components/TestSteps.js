import React, { useState } from "react";
import "./TestSteps.scss";
import { NavLink, useLocation } from "react-router-dom";

const initialSteps = [
  { title: "profile", id: "profile" },
  { title: "type", id: "type-select" },
  { title: "test", id: "type" },
  { title: "results", id: "results" },
];
function TestSteps() {
  const location = useLocation();
  const [steps, setSteps] = useState(initialSteps);
  let currentStep = location.pathname
    .split("/")
    .filter((item) => item !== "" && item !== "test")[0];

  if (["sample", "main"].includes(currentStep) && steps[2].id !== currentStep) {
    const newSteps = steps.map((step, index) =>
      index === 2 ? { ...step, id: `${currentStep}` } : step
    );

    setSteps(newSteps);
  }
  const currentStepIndex = steps.findIndex(
    (option) => option.id === currentStep
  );
  const stepsTaken = steps.slice(0, currentStepIndex + 1);
  const stepsRemained = initialSteps.slice(currentStepIndex + 1);
  return (
    <section className="TestSteps">
      <ul>
        {stepsTaken.map((step) => (
          <li key={step.id}>
            <NavLink to={`/test/${step.id}`}>{step.title}</NavLink>
          </li>
        ))}
        {stepsRemained.map((step) => (
          <li key={step.id}>
            <span>{step.title}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default TestSteps;
