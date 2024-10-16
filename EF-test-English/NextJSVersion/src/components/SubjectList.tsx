"use client";

import { useState } from "react";
import SubjectListItem from "./SubjectListItem";
import Filter from "./Filter";
import { deleteSubject } from "@/lib/server-actions/subjects";
import { subject } from "@/lib/types";

type SubjectListProps = {
  initialSubjects: subject[];
};

export default function SubjectList({ initialSubjects }: SubjectListProps) {
  // State variables 👇:
  const [subjects, setSubjects] = useState(initialSubjects);
  const [filteredSubjects, setFilteredSubjects] = useState(initialSubjects);
  const [showFilters, setShowFilters] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Handlers 👇:
  const handleRemoveDSubject = async (id: string) => {
    try {
      await deleteSubject(id);
      const newSubjects = subjects.filter((item) => item.id !== id);
      setSubjects(newSubjects);
      setFilteredSubjects(newSubjects);
    } catch (error) {
      console.log("Sth went wrong with deleting the subject:", error);
    }
  };

  return (
    <div className="grow flex flex-col relative">
      <header className="bg-slate-200 flex items-center flex-wrap justify-around px-0 py-1">
        <div className="flex items-center gap-2">
          <span className="text-lg">Filter:</span>
          <button
            onClick={() => setShowFilters((previous) => !previous)}
            className="bg-tune w-10 h-10 bg-cover rounded hover:bg-zinc-300"
          />
        </div>
        {!filteredSubjects ? (
          <h2 className="text-center w-[250px] text-lg">Please Wait...</h2>
        ) : (
          <h2 className="text-center w-[250px] text-lg">{`${filteredSubjects.length} results found`}</h2>
        )}
      </header>
      {subjects && showFilters && (
        <Filter subjects={subjects} setFilteredSubjects={setFilteredSubjects} />
      )}
      <ul className="grow flex justify-evenly gap-2 flex-wrap p-2">
        {filteredSubjects &&
          filteredSubjects.map((subject, index) => (
            <li
              key={subject.id}
              className={`w-[250px] h-fit rounded ${
                index % 2 === 0 ? "bg-slate-300" : "bg-zinc-300"
              }`}
            >
              <SubjectListItem
                subject={subject}
                handleRemoveSubject={() =>
                  handleRemoveDSubject(subject.id as string)
                }
                setShowModal={setShowModal}
              />
            </li>
          ))}
      </ul>

      <div
        className="absolute top-0 left-0 w-full h-full bg-black opacity-70"
        style={{ display: `${showModal ? "block" : "none"}` }}
      ></div>
    </div>
  );
}
