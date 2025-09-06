const express = require("express");
const rootRouter = require("./routes/index");
const dotenv = require("dotenv");
const User = require("./db");
const cors = require("cors");
const mongoose = require("mongoose");

dotenv.config();

async function connectDB() {
  await mongoose.connect(process.env.MONGODB_URL);
  console.log("mongodb connected");
}
connectDB();
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/v1", rootRouter);

app.listen(3000, (req, res) => {
  console.log("backend is running");
});
