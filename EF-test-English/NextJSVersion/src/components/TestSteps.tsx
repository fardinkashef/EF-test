"use client";
import React, { useState } from "react";
import { TestStep } from "./Nav";
import { usePathname } from "next/navigation";

const initialSteps = [
  { title: "profile", id: "profile" },
  { title: "type", id: "type-select" },
  { title: "test", id: "type" },
  { title: "results", id: "results" },
];
function TestSteps() {
  const [steps, setSteps] = useState(initialSteps);

  const pathname = usePathname();

  const currentStep = pathname
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
    <section className="hidden sm:block bg-cyan-950 py-2 px-0 ">
      <ul className="flex pl-4 pr-10  ">
        {stepsTaken.map((step, index) => (
          <li
            key={step.id}
            className={
              `block grow z-${40 - index * 10} ` +
              "first:relative first:before:z-50 first:before:content-[''] first:before:block first:before:w-[40px] first:before:h-full first:before:absolute first:before:top-0 first:before:-left-5 first:before:rounded-full  first:before:bg-cyan-950"
            }
          >
            <TestStep href={`/test/${step.id}`}>{step.title}</TestStep>
          </li>
        ))}
        {stepsRemained.map((step, index) => (
          <li
            key={step.id}
            className={
              `block grow z-${40 - stepsTaken.length * 10 - index * 10} ` +
              "first:relative first:before:z-50 first:before:content-[''] first:before:block first:before:w-[40px] first:before:h-full first:before:absolute first:before:top-0 first:before:-left-5 first:before:rounded-full  first:before:bg-cyan-950"
            }
          >
            <span className="block text-center h-[40px] leading-[45px] relative after:z-40 after:content-[''] after:bg-inherit after:block after:w-[40px] after:h-full after:absolute after:top-0 after:right-[-20px] after:rounded-full after:border-r-solid after:border-r-[5px] after:border-r-white bg-gray-500 text-orange-300 ">
              {step.title}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default TestSteps;
