require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/connection");
const userRoutes = require("./routes/userRoutes");
const classRoutes = require("./routes/classRoutes");
const assignmentRoutes = require("./routes/assignmentRoutes");

const app = express();

connectDB();

const PORT = process.env.PORT || 1313;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Villain Academy API Running");
});

app.use("/api/users", userRoutes);
app.use("/api/classes", classRoutes);
app.use("/api/assignments", assignmentRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});