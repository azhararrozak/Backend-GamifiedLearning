require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

const corsOptions = {
    origin: "http://127.0.0.1:5173",
    credentials: true
}

// middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//connect to db mongo
const db = require("./src/models");
const Role = db.role;

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
}).catch(err => {
    console.error("Connection error", err);
    process.exit(); 
});

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to the backend." });
});

// start server
app.listen(5000, () => {
    console.log("Server is running on port 5000.");
});

// routes
require("./src/routes/auth.routes")(app);
require("./src/routes/user.routes")(app);
require("./src/routes/lesson.routes")(app);
require("./src/routes/contact.routes")(app);

// function to create roles
async function initial() {
    try {
      const count = await Role.estimatedDocumentCount();
  
      if (count === 0) {
        await new Role({
          name: "user"
        }).save();
  
        await new Role({
          name: "admin"
        }).save();
  
        console.log("Added 'user' and 'admin' to roles collection");
      }
    } catch (err) {
      console.error("Error:", err);
    }
  }
  