import "./JoinRoomModal.css";
import { useState } from "react";

const JoinRoomModal = ({ showModal, setShowModal, setRoomCode }) => {
  const [roomCodeInput, setRoomCodeInput] = useState(null);
  const handleSave = () => {
    setShowModal(false);
    setRoomCode(roomCodeInput);
  };

  return (
    <>
      {showModal && (
        <div className="joinRoomModal-container">
          <div className="joinRoomModal-card">
            <h1 className="joinRoomModal-card-title">Enter a room code</h1>
            <input
              className="joinRoomModal-card-input"
              type="number"
              placeholder="eg: 1212"
              onChange={(e) => setRoomCodeInput(e.target.value)}
            />
            <button onClick={handleSave} className="joinRoomModal-card-button">
              Save
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default JoinRoomModal;
