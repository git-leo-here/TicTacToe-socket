import Header from "./Components/Header/Header";
import Main from "./Components/Main/Main";
import "./App.css";
import JoinRoomModal from "./Components/JoinRoomModal/JoinRoomModal";
import React , { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io.connect("http://localhost:5000"); // Connect to the Websocket server

function App() {
  const [showModal, setShowModal] = useState(false);
  const [roomCode, setRoomCode] = useState(null);
  

  useEffect(() => {
    console.log(roomCode);
    if (roomCode) {
      socket.emit("joinRoom", roomCode);
      document.querySelector('.you-are').innerHTML = "You are X";
    }
  }, [roomCode]);
  // Whenever the roomCode changes, emit a "joinRoom" event to the server so that we can join that room

  
  const handleJoinRoomClick = () => {
    setShowModal(true);
  };
  // When the "Join Room" button is clicked, show the modal to join a room

  return (
    <div className="App">
      <h1 className="title">Tic Tac Toe</h1>
      <button className="join-room-btn"  onClick={handleJoinRoomClick}>Join Room</button>
      <JoinRoomModal
        showModal={showModal}
        setShowModal={setShowModal}
        setRoomCode={setRoomCode}
      />
      <h1 className="you-are" style={{textAlign:'center'}}></h1>
      <Header />
      <Main socket={socket} roomCode={roomCode} />
      
    
    </div>
  );
}

export default App;