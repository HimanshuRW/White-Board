const express = require("express");
const app = express();
app.use(express.static('public'));
const server = app.listen(8000,()=>{
    console.log("listening to port 8000...");
})

const io = require("socket.io")(server, {
    // cors: {
    //   origin: "*",
    //   methods: ["GET", "POST"]
    // }
  });
  
  io.on("connection", socket => {
      console.log("someone joined.....with id : "+socket.id);

    // --- main code for chat app for socket.io----
    socket.on("start",data=>{
        socket.broadcast.emit("start",data);
    })
    socket.on("keepGoing",coordinates=>{
        socket.broadcast.emit("keepGoing",coordinates);
    })
    socket.on("end",data=>{
        socket.broadcast.emit("end",data);
    })
    socket.on("clear",()=>{
        socket.broadcast.emit("clear");
    })
  });