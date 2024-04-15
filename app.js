const express = require("express");
const app = express();
const cors = require("cors")
const taskRouter = require("./routes/task.routes");
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1/task", taskRouter);

module.exports = app;
