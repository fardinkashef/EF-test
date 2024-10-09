"use client";

import { useSubjectContext } from "@/lib/contexts/SubjectContext";
import Link from "next/link";

export default function Profile() {
  const { profile, setProfile } = useSubjectContext();
  // Handlers 👇:
  const handleFirstNameChange = (event) =>
    setProfile({ ...profile, firstName: event.target.value });
  const handleLastNameChange = (event) =>
    setProfile({ ...profile, lastName: event.target.value });
  const handleAgeChange = (event) =>
    setProfile({ ...profile, age: event.target.value });
  const handleGroupCodeChange = (event) =>
    setProfile({ ...profile, groupCode: event.target.value });
  const handleCaseCodeChange = (event) =>
    setProfile({ ...profile, caseCode: event.target.value });
  const handleGenderChange = (event) => {
    if (event.target.checked) {
      setProfile({ ...profile, gender: event.target.value });
    }
  };
  // setProfile({ ...profile, gender: event.target.value });
  // Handlers 👆

  return (
    <section className="grow text-blue-900 p-5 flex flex-col justify-start items-center gap-5 h-full">
      <legend className="text-center text-xl font-semibold">
        ُSubject Info
      </legend>
      <form className="flex justify-evenly gap-5 flex-wrap ">
        <div className="w-full max-w-[250px] ">
          <label htmlFor="firstName" className="block py-0 px-2">
            Name
          </label>
          <input
            className="w-full py-1 px-2 rounded"
            type="text"
            id="firstName"
            value={profile.firstName}
            onChange={handleFirstNameChange}
          />
        </div>
        <div className="w-full max-w-[250px] ">
          <label htmlFor="lastName" className="block py-0 px-2">
            Last Name
          </label>
          <input
            className="w-full py-1 px-2 rounded"
            type="text"
            id="lastName"
            value={profile.lastName}
            onChange={handleLastNameChange}
          />
        </div>
        <div className="w-full max-w-[250px] ">
          <label htmlFor="age" className="block py-0 px-2">
            Age
          </label>
          <input
            className="w-full py-1 px-2 rounded"
            type="text"
            id="age"
            value={profile.age}
            onChange={handleAgeChange}
          />
        </div>
        <div className="w-full max-w-[250px]  ">
          <fieldset className="border-none">
            <legend>Gender</legend>

            <div className="inline my-0 mx-5">
              <label htmlFor="man" className="inline py-0 px-2">
                male
              </label>
              <input
                className="py-1 px-2 rounded"
                type="radio"
                id="man"
                name="gender"
                value="male"
                onChange={handleGenderChange}
              />
            </div>

            <div className="inline my-0 mx-5">
              <label htmlFor="woman" className="inline py-0 px-2">
                female
              </label>
              <input
                className="py-1 px-2 rounded"
                type="radio"
                id="woman"
                name="gender"
                value="female"
                onChange={handleGenderChange}
              />
            </div>
          </fieldset>
        </div>
        <div className="w-full max-w-[250px] ">
          <label htmlFor="groupCode" className="block py-0 px-2">
            Group Code
          </label>
          <input
            className="w-full py-1 px-2 rounded"
            type="text"
            id="groupCode"
            value={profile.groupCode}
            onChange={handleGroupCodeChange}
          />
        </div>
        <div className="w-full max-w-[250px] ">
          <label htmlFor="caseCode" className="block py-0 px-2">
            Subject Code
          </label>
          <input
            className="w-full py-1 px-2 rounded"
            type="text"
            id="caseCode"
            value={profile.caseCode}
            onChange={handleCaseCodeChange}
          />
        </div>
      </form>

      <Link
        href="/test/type-select"
        className="text-white bg-blue-700 text-center py-1 px-2 rounded-md hover:bg-blue-800"
      >
        Save & Continue
      </Link>
    </section>
  );
}
