import { useModal } from "../../context/Modal";
import "./DeleteSpotModal.css";

function DeleteSpotModal({ deleting, spotId }) {
  const { closeModal } = useModal();

  const doDelete = () => {
    deleting(spotId);
    closeModal();
  };

  return (
    <div id="deleteModal">
      <h1 id="loginHeader">Confirm Delete</h1>
      <p>Are you sure you want to remove this spot?</p>
      <button className="yes Btn" onClick={() => doDelete()}>
        Yes (Delete Spot)
      </button>
      <button className="no Btn" onClick={() => closeModal()}>
        No (Keep Spot)
      </button>
    </div>
  );
}

export default DeleteSpotModal;
