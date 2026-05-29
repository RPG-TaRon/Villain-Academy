require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/connection");
const app = express();
connectDB();
const PORT = process.env.PORT;

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Villain Academy API Running");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});