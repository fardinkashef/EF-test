"use client";

import { useState } from "react";
import DataListItem from "./DataListItem";
import Filter from "./Filter";
import { deleteResults } from "@/lib/server-actions/results";

export default function DataList({ initialData }) {
  // State variables 👇:
  const [data, setData] = useState(initialData);
  const [filteredData, setFilteredData] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Handlers 👇:
  const handleRemoveData = async (id) => {
    // const storedAdminData = JSON.parse(localStorage.getItem("adminData"));
    try {
      // const res = await axios.delete(
      //   process.env.REACT_APP_BACKEND_URL + `/results/${id}`,
      //   { headers: { Authorization: `Bearer ${storedAdminData.token}` } }
      // );
      await deleteResults(id);
      const newData = data.filter((item) => item.id !== id);
      setData(newData);
    } catch (error) {
      console.log("Sth went wrong with deleting data:", error);
    }
  };

  return (
    <div className="grow flex flex-col relative">
      <header className="bg-slate-200 flex items-center flex-wrap justify-around px-0 py-1">
        <div className="flex items-center gap-2">
          <span className="text-lg">Filter:</span>
          <button
            onClick={() => setShowFilters((previous) => !previous)}
            className="bg-tune w-10 h-10 bg-cover rounded hover:bg-blue-400"
          />
        </div>
        {!filteredData ? (
          <h2 className="text-center w-[250px] text-lg">Please Wait...</h2>
        ) : (
          <h2 className="text-center w-[250px] text-lg">{`${filteredData.length} results found`}</h2>
        )}
      </header>
      {data && (
        <Filter
          data={data}
          setFilteredData={setFilteredData}
          showFilters={showFilters}
        />
      )}
      <ul className="grow flex justify-evenly gap-2 flex-wrap p-2">
        {filteredData &&
          filteredData.map((item, index) => (
            <li
              key={item.id}
              className={`w-[250px] h-fit rounded ${
                index % 2 === 0 ? "bg-slate-300" : "bg-zinc-300"
              }`}
            >
              <DataListItem
                profile={item.profile}
                results={item.results}
                id={item.id}
                handleRemoveData={() => handleRemoveData(item.id)}
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
