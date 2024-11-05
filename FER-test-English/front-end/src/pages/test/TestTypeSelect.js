import React from "react";
import { NavLink } from "react-router-dom";
import "./TestTypeSelect.scss";
function TestTypeSelect() {
  return (
    <div className="TestTypeSelect">
      <div className="wrapper">
        <section className="sampleTest">
          <p>
            The purpose of the sample test is to familiarize the user with the
            main test. In the sample test, 6 pictures are shown to the subject,
            and they must choose the option that represents the person’s feeling
            for each picture.
          </p>
          <NavLink to="/test/sample">ُStart Sample Test</NavLink>
        </section>
        <section className="mainTest">
          <p>
            In this test, 60 pictures are shown to the subject, and they must
            choose the option that represents the person’s feeling for each
            picture
          </p>
          <NavLink to="/test/main">ُStart Main Test</NavLink>
        </section>
      </div>
    </div>
  );
}

export default TestTypeSelect;
