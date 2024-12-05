import { useModal } from "../../context/Modal";
import "./PostReviewModal.css";

function PostReviewModal() {
  const { closeModal } = useModal();

  return (
    <div id="deleteModal">
      <h1 id="loginHeader">How was your stay?</h1>
      <p>Leave Your review here...</p>
      <div className="starInput">
        <input type="number" />
        <span id="star"> ★ </span>
      </div>
      <br />
      <textarea name="" id="textArea"></textarea>
      <br />
      <button className="no Btn" onClick={() => closeModal()}>
        Submit Your Review
      </button>
    </div>
  );
}

export default PostReviewModal;
