import { useModal } from "../../context/Modal";

function DeleteReviewModal({ deleting, reviewId }) {
  const { closeModal } = useModal();

  const doDelete = () => {
    deleting(reviewId);
    closeModal();
  };

  return (
    <div id="deleteModal">
      <h1 id="loginHeader">Confirm Delete</h1>
      <p>Are you sure you want to remove this review?</p>
      <button className="yes Btn" onClick={() => doDelete()}>
        Yes (Delete Review)
      </button>
      <button className="no Btn" onClick={() => closeModal()}>
        No (Keep Review)
      </button>
    </div>
  );
}

export default DeleteReviewModal;
