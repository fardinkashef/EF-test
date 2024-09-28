import axios from "axios";
import React, { useState } from "react";
import "./DataList.scss";
import DataListItem from "components/DataListItem";
import Filter from "components/Filter";
import LoadingSpinner from "components/LoadingSpinner";

function DataList({ data, setData, isLoading }) {
  // State variables 👇:
  const [filteredData, setFilteredData] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [showModal, setShowModal] = useState(false);
  // Handlers 👇:
  const handleRemoveData = async (id) => {
    const storedAdminData = JSON.parse(localStorage.getItem("adminData"));
    try {
      const res = await axios.delete(
        process.env.REACT_APP_BACKEND_URL + `/results/${id}`,
        { headers: { Authorization: `Bearer ${storedAdminData.token}` } }
      );

      const newData = data.filter((item) => item.id !== id);
      setData(newData);
    } catch (error) {
      console.log("Sth went wrong with deleting data:", error);
    }
  };

  return (
    <div className="DataList">
      <header>
        <div>
          <span>Filter:</span>
          <button
            onClick={() => setShowFilters((previous) => !previous)}
          ></button>
        </div>
        {isLoading || !filteredData ? (
          <h2>Please Wait...</h2>
        ) : (
          <h2>{`${filteredData.length} results found`}</h2>
        )}
      </header>
      <Filter
        data={data}
        setFilteredData={setFilteredData}
        className={`${showFilters ? "show" : "hidden"}`}
      />
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <ul className="list">
          {!filteredData
            ? null
            : filteredData.map((item, index) => (
                <li
                  key={item.id}
                  className="list-item"
                  style={{
                    backgroundColor: `${
                      index % 2 === 0 ? "azure" : "cornsilk"
                    }`,
                  }}
                >
                  <DataListItem
                    profile={item._doc.profile}
                    results={item._doc.results}
                    id={item.id}
                    handleRemoveData={() => handleRemoveData(item.id)}
                    setShowModal={setShowModal}
                  />
                </li>
              ))}
        </ul>
      )}

      <div
        className="modal"
        style={{ display: `${showModal ? "block" : "none"}` }}
      ></div>
    </div>
  );
}

export default DataList;
