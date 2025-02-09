const express = require("express");
const app = express();
const path = require("path");
const http = require("http");
const socketio = require("socket.io");

const server = http.createServer(app);
const io = socketio(server);

io.on("connection", (socket) => {
  console.log("connected");

  socket.on("send-location", function(data){
    io.emit("receive-location", {id: socket.id, ...data});
  });

  socket.on("send-location", (coords) => {
    console.log(`Location received: Latitude ${coords.latitude}, Longitude ${coords.longitude}`);
  });






  socket.on("disconnect", () => {
    io.emit("user-disconnected", socket.io);
  })

});

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index");
});

server.listen(4001, () => {
  console.log("server running on port 4001...");
});
