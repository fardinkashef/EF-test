import { subject } from "@/lib/types";
import { useEffect, useState } from "react";
// import "./Filter.scss";
const filters = ["Name", "Age", "Gender"];

type FilterProps = {
  subjects: subject[];
  setFilteredSubjects: React.Dispatch<React.SetStateAction<subject[]>>;
};

export default function Filter({ subjects, setFilteredSubjects }: FilterProps) {
  // State Variables 👇:
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [minAge, setMinAge] = useState(40);
  const [maxAge, setMaxAge] = useState(120);
  const [gender, setGender] = useState<"male" | "female" | "both">("both");
  // Handlers 👇:
  const handleAddFilter = (filter: string) => {
    if (selectedFilters.includes(filter)) return;
    setSelectedFilters((previousItems) => [...previousItems, filter]);
  };
  const handleRemoveFilter = (filter: string) => {
    if (!selectedFilters.includes(filter)) return;
    setSelectedFilters((previousItems) =>
      previousItems.filter((item) => item !== filter)
    );
  };
  const toggleFilter = (filter: string) => {
    if (!selectedFilters.includes(filter)) return handleAddFilter(filter);
    handleRemoveFilter(filter);
  };
  // Handlers 👆
  ////////
  useEffect(
    function () {
      if (subjects.length === 0) return;
      let filteredSubjects;
      filteredSubjects = !selectedFilters.includes("Name")
        ? subjects
        : subjects.filter((item) => {
            const { firstName, lastName } = item.profile;
            const fullName = firstName + lastName;
            return fullName.toLowerCase().includes(name.toLowerCase());
          });
      filteredSubjects = !selectedFilters.includes("Age")
        ? filteredSubjects
        : filteredSubjects.filter(
            (item) => minAge <= +item.profile.age && +item.profile.age <= maxAge
          );
      filteredSubjects =
        !selectedFilters.includes("Gender") || gender === "both"
          ? filteredSubjects
          : filteredSubjects.filter((item) => item.profile.gender === gender);
      setFilteredSubjects(filteredSubjects);
    },
    [
      selectedFilters,
      subjects,
      name,
      minAge,
      maxAge,
      gender,
      setFilteredSubjects,
    ]
  );

  //////
  return (
    <form className="bg-slate-200 pt-4 pb-8">
      <header className="flex justify-center px-0 py-1 mb-8">
        <ul className="flex justify-around w-64 ">
          {filters.map((filter) => (
            <li key={filter}>
              <button
                type="button"
                onClick={() => toggleFilter(filter)}
                className={`w-20 h-12 rounded-md ${
                  selectedFilters.includes(filter)
                    ? "bg-cyan-800 text-cyan-50"
                    : "bg-slate-300 text-slate-800"
                }`}
              >
                {filter}
              </button>
            </li>
          ))}
        </ul>
      </header>
      <hr />
      <section className="w-64 flex flex-col items-center gap-8 mx-auto text-slate-800">
        {selectedFilters.map((selectedFilter) => {
          if (selectedFilter === "Name")
            return <NameFilter name={name} setName={setName} key="Name" />;
          if (selectedFilter === "Age")
            return (
              <AgeFilter
                minAge={minAge}
                maxAge={maxAge}
                setMinAge={setMinAge}
                setMaxAge={setMaxAge}
                key="Age"
              />
            );
          return (
            <GenderFilter gender={gender} setGender={setGender} key="Gender" />
          );
        })}
      </section>
    </form>
  );
}

type NameFilterProps = {
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
};

function NameFilter({ name, setName }: NameFilterProps) {
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  return (
    <div>
      <label
        className="block text-lg text-center text-slate-700 font-semibold mb-1"
        htmlFor="nameFilter"
      >
        {"Subject's name"}
      </label>
      <input
        type="search"
        id="nameFilter"
        className="px-2 py-[2px] text-base rounded"
        value={name}
        onChange={handleNameChange}
      />
    </div>
  );
}

type AgeFilterProps = {
  minAge: number;
  maxAge: number;
  setMinAge: React.Dispatch<React.SetStateAction<number>>;
  setMaxAge: React.Dispatch<React.SetStateAction<number>>;
};

function AgeFilter({ minAge, maxAge, setMinAge, setMaxAge }: AgeFilterProps) {
  const handleMinAgeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMinAge(+event.target.value);
  };
  const handleMaxAgeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMaxAge(+event.target.value);
  };
  return (
    <fieldset>
      <legend className="text-lg text-center text-slate-700 font-semibold mb-1">
        Age range
      </legend>
      <div className="flex gap-2">
        <span>from</span>
        <input
          type="number"
          id="min-age"
          className="w-14 px-1 rounded"
          value={minAge}
          onChange={handleMinAgeChange}
        />
        <span>to</span>
        <input
          type="number"
          id="max-age"
          className="w-14 px-1 rounded"
          value={maxAge}
          onChange={handleMaxAgeChange}
        />
        <span>years old</span>
      </div>
    </fieldset>
  );
}

type gender = "male" | "female" | "both";
type GenderFilterProps = {
  gender: gender;
  setGender: React.Dispatch<React.SetStateAction<gender>>;
};

function GenderFilter({ gender, setGender }: GenderFilterProps) {
  const handleGenderChange = (event: React.ChangeEvent<HTMLSelectElement>) =>
    setGender(event.target.value as gender);
  const selectOptions = ["both", "male", "female"];
  return (
    <div>
      <label
        className="block text-center text-lg text-slate-700 font-semibold mb-1"
        htmlFor="gender"
      >
        Gender
      </label>
      <select
        name="gender"
        className="pl-2"
        id="gender"
        onChange={handleGenderChange}
      >
        {selectOptions.map((option) => (
          <option value={option} selected={gender === option} key={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
