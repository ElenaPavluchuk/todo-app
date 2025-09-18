require("dotenv").config();
const express = require("express");
const cors = require("cors");

// App
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// API routes
const router = require("./routes/routes");

app.use("/", router);

// Server running
app.listen(3001, () => {
  console.log("server is running on port 3001");
});
