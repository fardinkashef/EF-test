import { NavLink, useSearchParams } from "react-router-dom";
import "./DataListItem.scss";
import { useState } from "react";
function DataListItem({
  profile,
  results,
  id,
  setShowModal,
  handleRemoveData,
}) {
  // The above setShowModal which we are receiving through props, refers to the big dark background color which covers the whole DataList component. The following setShowModalContent refers to the modal content which will be displayed on top of DataListItem 👇:
  const [showModalContent, setShowModalContent] = useState(false);
  const type = results.byEachQuestion.length === 60 ? "اصلی " : "نمونه ";

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
    <div className="DataListItem">
      <ul>
        <li>{fullName}</li>
        <li>{`${profile.age} ساله`}</li>
        <li>{`در آزمون ${type} شرکت کرده اند.`}</li>
        <li>{`پاسخ های صحیح: ${results.byAnswerStatus.correct}`}</li>
        <li>{`پاسخ های غلط: ${results.byAnswerStatus.wrong}`}</li>
        <li>{`پاسخ نداده: ${results.byAnswerStatus.missed}`}</li>
      </ul>
      <button
        className="remove-btn"
        onClick={handleShowRemoveConfirmationModal}
        title="remove this data"
      >
        ❌
      </button>
      <NavLink className="more" to={`${id}`} title="more details"></NavLink>
      <div
        className="modal-content"
        style={{
          display: `${showModalContent ? "flex" : "none"}`,
          zIndex: `${showModalContent ? 2 : 1}`,
        }}
      >
        <div className="container">
          <h3>{`آیا از حذف داده مربوط به آزمون ${type} ${
            profile.gender === "مرد" ? "آقای" : "خانم"
          } ${fullName} اطمینان دارید؟`}</h3>
          <div className="control">
            <button className="remove" onClick={handleConfirmRemove}>
              حذف
            </button>
            <button className="cancel" onClick={handleHideModal}>
              لغو
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DataListItem;
