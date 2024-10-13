"use client";
import { createContext, ReactNode, useContext, useState } from "react";
import { answers, profile } from "../types";

type SubjectContext = {
  profile: profile;
  setProfile: React.Dispatch<React.SetStateAction<profile>>;
  answers: answers;
  setAnswers: React.Dispatch<React.SetStateAction<answers>>;
};

type SubjectContextProviderProps = {
  children: ReactNode;
};

const SubjectContext = createContext<SubjectContext | null>(null);

const initialProfileData = {
  firstName: "",
  lastName: "",
  age: "",
  gender: "",
  groupCode: "",
  caseCode: "",
};
const initialAnswers = Array(60).fill(null);

function SubjectContextProvider({ children }: SubjectContextProviderProps) {
  const [profile, setProfile] = useState<profile>(initialProfileData);
  const [answers, setAnswers] = useState<answers>(initialAnswers);

  return (
    <SubjectContext.Provider
      value={{ profile, setProfile, answers, setAnswers }}
    >
      {children}
    </SubjectContext.Provider>
  );
}

export default SubjectContext;
export { SubjectContextProvider };

// Always use a custom hook like this when using context:
export function useSubjectContext() {
  const subjectContext = useContext(SubjectContext);
  if (!subjectContext)
    throw new Error(
      "useSubjectContext must be used within SubjectContextProvider "
    );
  return subjectContext;
}
