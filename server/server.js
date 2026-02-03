const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const testRoutes = require("./routes/tests");
const uploadRoutes = require("./routes/upload");
const resultRoutes = require("./routes/results");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: "1mb" }));

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/tests", testRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/results", resultRoutes);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Mongo connection error:", error);
    process.exit(1);
  });
