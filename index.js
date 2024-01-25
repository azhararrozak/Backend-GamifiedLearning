require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const http = require("http");
const socketIO = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true
  }
});

const corsOptions = {
  origin: "*",
  credentials: true,
};

// middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// connect to db mongo
const db = require("./src/models");
const Role = db.role;
const Chat = db.chat;

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });

// set up Socket.IO
io.on("connection", (socket) => {

  socket.on('chat message', (msg, user) => {
    //Save to mongo
    const chat = new Chat({
      user: user,
      msg: msg
    });
    chat.save();

    io.emit('chat message', {user, msg}); // Broadcast the message to all connected clients
  });
});

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the backend." });
});

// start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// routes
require("./src/routes/auth.routes")(app);
require("./src/routes/user.routes")(app);
require("./src/routes/lesson.routes")(app);
require("./src/routes/contact.routes")(app);
require("./src/routes/point.routes")(app);
require("./src/routes/badge.routes")(app);
require("./src/routes/task.routes")(app);
require("./src/routes/quiz.routes")(app);
require("./src/routes/group.routes")(app);
require("./src/routes/score.routes")(app);
require("./src/routes/chat.routes")(app);
require("./src/routes/unit.route")(app);

// function to create roles
async function initial() {
  try {
    const count = await Role.estimatedDocumentCount();

    if (count === 0) {
      await new Role({
        name: "user",
      }).save();

      await new Role({
        name: "admin",
      }).save();

      console.log("Added 'user' and 'admin' to roles collection");
    }
  } catch (err) {
    console.error("Error:", err);
  }
}
