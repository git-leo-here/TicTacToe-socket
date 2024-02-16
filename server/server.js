// const {instrument} = require('@socket.io/admin-ui');
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

const cors = require('cors');
app.use(cors());


const io = require("socket.io")(server, {
    cors: {
         origin: "*" 
        } 
});

// let arr = [];
// let playingArray = [];


io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });

    socket.on("joinRoom", (roomCode) => {
        console.log(`A user joined the room ${roomCode}`);
        socket.join(roomCode);
      });
    
    socket.on("play", ({ id, roomCode }) => {
      console.log(`play at ${id} to ${roomCode}`);
      socket.broadcast.to(roomCode).emit("updateGame", id);
    });

    // socket.on('find' , (e)=>{
    //     if(e.name!=null){
    //         arr.push(e.name);
    //         if(arr.length>=2){
    //             let p1obj = {
    //                 p1name: arr[0],
    //                 p1value: "X",
    //                 p1move:""
    //             }

    //             let p2obj = {
    //                 p2name: arr[1],
    //                 p2value: "O",
    //                 p2move:""
    //             }

    //             let obj = { p1: p1obj , p2: p2obj };
    //             playingArray.push(obj);

    //             arr.splice(0,2);
    //             io.emit("found" , {allPlayers: playingArray});
    //         }
    //     }
    // })
});

server.listen(5000, () => {
    console.log(`Server is running on port localhost:3001`);
});