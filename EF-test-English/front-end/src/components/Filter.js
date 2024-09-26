import { useEffect, useState } from "react";
import "./Filter.scss";
const filters = ["نام", "سن", "جنسیت"];
export default function Filter({ data, setFilteredData, className }) {
  // State Variables 👇:
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [name, setName] = useState("");
  const [minAge, setMinAge] = useState(0);
  const [maxAge, setMaxAge] = useState(120);
  const [gender, setGender] = useState("هر دو");
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
      filteredData = !selectedFilters.includes("نام")
        ? data
        : data.filter((item) => {
            const { firstName, lastName } = item._doc.profile;
            const fullName = firstName + lastName;
            return fullName.includes(name);
          });
      filteredData = !selectedFilters.includes("سن")
        ? filteredData
        : filteredData.filter(
            (item) =>
              minAge <= +item._doc.profile.age &&
              +item._doc.profile.age <= maxAge
          );
      filteredData =
        !selectedFilters.includes("جنسیت") || gender === "هر دو"
          ? filteredData
          : filteredData.filter((item) => item._doc.profile.gender === gender);
      setFilteredData(filteredData);
    },
    [selectedFilters, data, name, minAge, maxAge, gender]
  );

  //////
  return (
    <form className={"Filter" + ` ${className}`}>
      <header>
        <legend> فیلترها:</legend>
        <ul>
          {filters.map((filter) => (
            <li key={filter}>
              <label htmlFor={filter}>
                <span>{filter}</span>
                <input
                  type="checkbox"
                  id={filter}
                  onChange={(e) => handleFiltersCheckBoxChange(e, filter)}
                />
              </label>
            </li>
          ))}
        </ul>
      </header>
      <hr />
      <section>
        {selectedFilters.map((selectedFilter) => {
          if (selectedFilter === "نام")
            return <NameFilter name={name} setName={setName} key="name" />;
          if (selectedFilter === "سن")
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
    <div className="NameFilter">
      <label htmlFor="nameFilter">نام آزمودنی:</label>
      <input
        type="search"
        id="nameFilter"
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
    <fieldset className="AgeFilter">
      <legend>محدوده سنی:</legend>
      <div className="range">
        <span>از</span>
        <input
          type="number"
          id="min-age"
          value={minAge}
          onChange={handleMinAgeChange}
        />
        <span>تا</span>
        <input
          type="number"
          id="max-age"
          value={maxAge}
          onChange={handleMaxAgeChange}
        />
        <span>سال</span>
      </div>
    </fieldset>
  );
}
function GenderFilter({ gender, setGender }) {
  const handleGenderChange = (event) => setGender(event.target.value);
  const selectOptions = ["هر دو", "مرد", "زن"];
  return (
    <div className="GenderFilter">
      <label htmlFor="gender">جنسیت:</label>
      <select name="gender" id="gender" onChange={handleGenderChange}>
        {selectOptions.map((option) => (
          <option value={option} selected={gender === option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
