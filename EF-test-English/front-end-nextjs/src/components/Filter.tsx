import { useEffect, useState } from "react";
// import "./Filter.scss";
const filters = ["name", "age", "gender"];
export default function Filter({ data, setFilteredData, showFilters }) {
  // State Variables 👇:
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [name, setName] = useState("");
  const [minAge, setMinAge] = useState(0);
  const [maxAge, setMaxAge] = useState(120);
  const [gender, setGender] = useState("both");
  // Handlers 👇:
  const handleAddFilter = (filter) => {
    if (selectedFilters.includes(filter)) return;
    setSelectedFilters((previousItems) => [...previousItems, filter]);
  };
  const handleRemoveFilter = (filter) => {
    if (!selectedFilters.includes(filter)) return;
    setSelectedFilters((previousItems) =>
      previousItems.filter((item) => item !== filter)
    );
  };
  const handleFiltersCheckBoxChange = (event, filter) => {
    if (event.target.checked) {
      handleAddFilter(filter);
    } else handleRemoveFilter(filter);
  };
  // Handlers 👆
  ////////
  useEffect(
    function () {
      if (data.length === 0) return;
      let filteredData;
      filteredData = !selectedFilters.includes("name")
        ? data
        : data.filter((item) => {
            const { firstName, lastName } = item._doc.profile;
            const fullName = firstName + lastName;
            return fullName.toLowerCase().includes(name.toLowerCase());
          });
      filteredData = !selectedFilters.includes("age")
        ? filteredData
        : filteredData.filter(
            (item) =>
              minAge <= +item._doc.profile.age &&
              +item._doc.profile.age <= maxAge
          );
      filteredData =
        !selectedFilters.includes("gender") || gender === "both"
          ? filteredData
          : filteredData.filter((item) => item._doc.profile.gender === gender);
      setFilteredData(filteredData);
    },
    [selectedFilters, data, name, minAge, maxAge, gender]
  );

  //////
  return (
    <form className={` bg-slate-200 ${!showFilters ? "hidden" : ""} `}>
      <header className="flex justify-center px-0 py-1">
        <legend>filters:</legend>
        <ul className="flex justify-around w-[250px] ">
          {filters.map((filter) => (
            <li key={filter}>
              <label htmlFor={filter}>
                <span>{filter}</span>
                <input
                  type="checkbox"
                  className="align-middle mr-1"
                  id={filter}
                  onChange={(e) => handleFiltersCheckBoxChange(e, filter)}
                />
              </label>
            </li>
          ))}
        </ul>
      </header>
      <hr />
      <section className="flex flex-col items-center">
        {selectedFilters.map((selectedFilter) => {
          if (selectedFilter === "name")
            return <NameFilter name={name} setName={setName} key="name" />;
          if (selectedFilter === "age")
            return (
              <AgeFilter
                minAge={minAge}
                maxAge={maxAge}
                setMinAge={setMinAge}
                setMaxAge={setMaxAge}
                key="age"
              />
            );
          return (
            <GenderFilter gender={gender} setGender={setGender} key="gender" />
          );
        })}
      </section>
    </form>
  );
}
function NameFilter({ name, setName }) {
  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  return (
    <div>
      <label className="pl-2" htmlFor="nameFilter">
        Participant's name:
      </label>
      <input
        type="search"
        id="nameFilter"
        className="px-1 py-[2px] text-base rounded"
        value={name}
        onChange={handleNameChange}
      />
    </div>
  );
}

function AgeFilter({ minAge, maxAge, setMinAge, setMaxAge }) {
  const handleMinAgeChange = (event) => {
    setMinAge(event.target.value);
  };
  const handleMaxAgeChange = (event) => {
    setMaxAge(event.target.value);
  };
  return (
    <fieldset>
      <legend>Age range:</legend>
      <div className="flex gap-2">
        <span>from</span>
        <input
          type="number"
          id="min-age"
          className="w-12 px-1 rounded"
          value={minAge}
          onChange={handleMinAgeChange}
        />
        <span>to</span>
        <input
          type="number"
          id="max-age"
          className="w-12 px-1 rounded"
          value={maxAge}
          onChange={handleMaxAgeChange}
        />
        <span>years</span>
      </div>
    </fieldset>
  );
}
function GenderFilter({ gender, setGender }) {
  const handleGenderChange = (event) => setGender(event.target.value);
  const selectOptions = ["both", "male", "female"];
  return (
    <div>
      <label htmlFor="gender">Gender:</label>
      <select
        name="gender"
        className="pl-2"
        id="gender"
        onChange={handleGenderChange}
      >
        {selectOptions.map((option) => (
          <option value={option} selected={gender === option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
