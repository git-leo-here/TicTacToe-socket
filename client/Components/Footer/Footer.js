
import "./Footer.css";

const Footer = ({ setShowModal }) => {
  return (
    <footer>
      {/* <LinkSvg setShowModal={setShowModal} /> */}
      <JoinRoomButton setShowModal={setShowModal}/>
    </footer>
  );
};

const JoinRoomButton = ({ setShowModal }) => {
  const handleClick = () => {
    setShowModal(true);
  };

  return (
    <button className="join-room-button" onClick={handleClick}>
      <span>Join Room</span>
    </button>
  );
}

export default Footer;