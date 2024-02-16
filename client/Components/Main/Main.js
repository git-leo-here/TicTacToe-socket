import { useEffect, useState } from "react";
import Cell from "../Cell/Cell";
import "./Main.css";

const Main = ({ socket, roomCode }) => {
  const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);
  const [canPlay, setCanPlay] = useState(true);
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    socket.on("updateGame", (id) => {
      console.log("use Effect", id);
      setBoard((data) => ({ ...data, [id]: "O" }));
      setCurrentPlayer("X");
      setCanPlay(true);
    });

    return () => socket.off("updateGame");
  });

  useEffect(() => {
    const winner = calculateWinner(board);
    setWinner(winner);
    let status;
    if (winner) {
      status = `Winner: ${winner}`; // If there is a winner, display the winner
      document.querySelector(".status").innerHTML = status;
      document.querySelector(".status").style.backgroundColor = 'green';
    }
  }, [board]);

  const handleCellClick = (e) => {
    const id = e.currentTarget.id
    if (canPlay && board[id] == "" && !winner) {
      setBoard((data) => ({ ...data, [id]: "X" }));
      socket.emit("play", { id, roomCode });
      setCurrentPlayer("O");
      setCanPlay(false);
    }

    
  };

  return (
    <main>
      
      <section className="main-section">
        <Cell handleCellClick={handleCellClick} id={"0"} text={board[0]} />
        <Cell handleCellClick={handleCellClick} id={"1"} text={board[1]} />
        <Cell handleCellClick={handleCellClick} id={"2"} text={board[2]} />

        <Cell handleCellClick={handleCellClick} id={"3"} text={board[3]} />
        <Cell handleCellClick={handleCellClick} id={"4"} text={board[4]} />
        <Cell handleCellClick={handleCellClick} id={"5"} text={board[5]} />

        <Cell handleCellClick={handleCellClick} id={"6"} text={board[6]} />
        <Cell handleCellClick={handleCellClick} id={"7"} text={board[7]} />
        <Cell handleCellClick={handleCellClick} id={"8"} text={board[8]} />
      </section>
      {!roomCode && <p className="room-code">Join a room to start playing</p>}
      {roomCode && <p className="room-code">Room Code: {roomCode}</p>}
      {currentPlayer && <p className="current-player">Current Player: {currentPlayer}</p>}
      <div className="status" ></div>
    </main>
  );
};

export default Main;

  
  // Function to calculate the winner of the game - either 'X' or 'O' , or null if no winner
  function calculateWinner(squares) {
    const winningPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]
    
    for (let i = 0; i < winningPatterns.length; i++) {
      const [a, b, c] = winningPatterns[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }
