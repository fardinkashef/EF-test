// import "./DataListItem.scss";
import { useState } from "react";
import Link from "next/link";
function DataListItem({
  profile,
  results,
  id,
  setShowModal,
  handleRemoveData,
}) {
  // The above setShowModal which we are receiving through props, refers to the big dark background color which covers the whole DataList component. The following setShowModalContent refers to the modal content which will be displayed on top of DataListItem 👇:
  const [showModalContent, setShowModalContent] = useState(false);
  const type = results.byEachQuestion.length === 60 ? "main " : "sample ";

  // Handlers 👇:
  const handleShowRemoveConfirmationModal = () => {
    setShowModal(true);
    setShowModalContent(true);
  };
  const handleHideModal = () => {
    setShowModal(false);
    setShowModalContent(false);
  };
  const handleConfirmRemove = () => {
    handleRemoveData();
    handleHideModal();
  };
  const fullName = profile.firstName + " " + profile.lastName;
  return (
    <div className="DataListItem w-full h-full bg-inherit p-2 rounded relative">
      <ul>
        <li>{fullName}</li>
        <li>{`${profile.age} years old`}</li>
        <li>{`Has participated in ${type} test`}</li>
        <li>{`Correct answers: ${results.byAnswerStatus.correct}`}</li>
        <li>{`Wrong Answers: ${results.byAnswerStatus.wrong}`}</li>
        <li>{`No Answers: ${results.byAnswerStatus.missed}`}</li>
      </ul>
      <button
        className="remove-btn border-none bg-inherit absolute top-1 right-1 p-1 rounded hover:bg-yellow-400 "
        onClick={handleShowRemoveConfirmationModal}
        title="remove this data"
      >
        ❌
      </button>
      <Link
        className="bg-more w-10 h-10 bg-contain block mx-auto my-2 px-2 py-1 rounded hover:bg-blue-500"
        href={`/data/${id}`}
        title="more details"
      ></Link>
      <div
        className="modal-content "
        style={{
          display: `${showModalContent ? "flex" : "none"}`,
          zIndex: `${showModalContent ? 2 : 1}`,
        }}
      >
        <div className="container">
          <h3>{`Are you sure you want to delete ${
            profile.gender === "male" ? "Mr" : "Mrs"
          } ${fullName}'s results of ${type} test?`}</h3>
          <div className="control">
            <button className="remove" onClick={handleConfirmRemove}>
              Remove
            </button>
            <button className="cancel" onClick={handleHideModal}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DataListItem;
