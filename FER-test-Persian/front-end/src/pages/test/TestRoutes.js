import { Navigate, Route, Routes } from "react-router-dom";
import Profile from "./Profile";
import TestTypeSelect from "./TestTypeSelect";
import Test from "./Test";
import Results from "./Results";
import { useState } from "react";
import TestSteps from "../../components/TestSteps";
import "./TestRoutes.scss";
const initialProfileData = {
  firstName: "",
  lastName: "",
  age: "",
  gender: "",
  groupCode: "",
  caseCode: "",
};
const initialAnswers = Array(60).fill(null);
function TestRoutes() {
  const [profile, setProfile] = useState(initialProfileData);
  const [answers, setAnswers] = useState(initialAnswers);

  return (
    <div className="TestRoutes">
      <TestSteps />
      <Routes>
        <Route
          path="profile"
          element={<Profile profile={profile} setProfile={setProfile} />}
        />
        <Route path="type-select" element={<TestTypeSelect />} />
        <Route
          path="sample"
          element={
            <Test answers={answers} setAnswers={setAnswers} type="sample" />
          }
        />
        <Route
          path="main"
          element={
            <Test answers={answers} setAnswers={setAnswers} type="main" />
          }
        />
        <Route
          path="results"
          element={
            <Results
              answers={answers}
              profile={profile}
              showSaveButton={true}
            />
          }
        />
        <Route path="*" element={<Navigate to="profile" replace />} />
      </Routes>
    </div>
  );
}

export default TestRoutes;
