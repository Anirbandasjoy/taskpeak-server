const {
  createTask,
  findAllTasks,
  deleteTask,
  getSingleTask,
  updateTask,
  updateStatus,
  findTasks,
} = require("../controller/task.controller");

const taskRouter = require("express").Router();

taskRouter.post("/", createTask);
taskRouter.get("/", findAllTasks);
taskRouter.delete("/:id", deleteTask);
taskRouter.get("/:id", getSingleTask);
taskRouter.put("/:id", updateTask);
taskRouter.patch("/:id", updateStatus);
taskRouter.get("/status/:email", findTasks);

module.exports = taskRouter;
