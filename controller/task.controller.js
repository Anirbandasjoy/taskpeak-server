const { v4: uuidv4 } = require("uuid");
const pool = require("../config/db");

// create a new task
const createTask = async (req, res) => {
  try {
    const id = uuidv4();
    const { title, description, deadline, priority, email, status } = req.body;
    // Insert task into the database
    pool.query(
      "INSERT INTO tasks (id, title, description, deadline, priority, email, status) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [id, title, description, deadline, priority, email, status],
      (error, results, fields) => {
        if (error) {
          console.error("Error creating task:", error);
          return res
            .status(500)
            .json({ message: "Internal server error", error: error.message });
        }
        res.status(201).send({
          message: "Task created successfully",
          id,
          title,
          description,
          deadline,
          priority,
          email,
          status,
        });
      }
    );
  } catch (error) {
    console.error("Error creating task:", error);
    res
      .status(500)
      .send({ message: "Internal server error", error: error.message });
  }
};

const findAllTasks = async (req, res) => {
  try {
    // Query to fetch all tasks
    pool.query("SELECT * FROM tasks", (error, results, fields) => {
      if (error) {
        console.error("Error retrieving tasks:", error);
        return res
          .status(500)
          .json({ message: "Internal server error", error: error.message });
      }
      res.status(200).json(results);
    });
  } catch (error) {
    console.error("Error retrieving tasks:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// find task using email and status
const findTasks = async (req, res) => {
  try {
    const email = req.params.email;
    const status = req.query.status;
    const sql = "SELECT * FROM tasks WHERE email = ? AND status = ?";
    pool.query(sql, [email, status], (error, results, fields) => {
      if (error) {
        console.error("Error fetching tasks:", error);
        return res.status(500).json({ error: "Internal server error", message: error.message });
      }
      res.status(200).json(results);
    });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "Internal server error", message: error.message });
  }
};


//  delete task
const deleteTask = async (req, res) => {
  try {
    const id = req.params.id;
    // Delete task from the database
    pool.query(
      "DELETE FROM tasks WHERE id = ?",
      [id],
      (error, results, fields) => {
        if (error) {
          console.error("Error deleting task:", error);
          return res
            .status(500)
            .json({ message: "Internal server error", error: error.message });
        }
        if (results.affectedRows === 0) {
          return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json({ message: "Task successfully deleted" });
      }
    );
  } catch (error) {
    console.error("Error deleting task:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// get single task

const getSingleTask = async (req, res) => {
  try {
    const id = req.params.id;
    // Fetch task from the database based on ID
    pool.query(
      "SELECT * FROM tasks WHERE id = ?",
      [id],
      (error, results, fields) => {
        if (error) {
          console.error("Error retrieving task:", error);
          return res
            .status(500)
            .json({ message: "Internal server error", error: error.message });
        }
        if (results.length === 0) {
          return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json(results[0]);
      }
    );
  } catch (error) {
    console.error("Error retrieving task:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// update task

const updateTask = async (req, res) => {
  try {
    const id = req.params.id;
    const { title, description, deadline, priority, email } = req.body;

    // Update task in the database
    pool.query(
      "UPDATE tasks SET title = ?, description = ?, deadline = ?, priority = ?, email = ? WHERE id = ?",
      [title, description, deadline, priority, email, id],
      (error, results, fields) => {
        if (error) {
          console.error("Error updating task:", error);
          return res
            .status(500)
            .json({ message: "Internal server error", error: error.message });
        }
        if (results.affectedRows === 0) {
          return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json({ message: "Task updated successfully" });
      }
    );
  } catch (error) {
    console.error("Error updating task:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// update status

const updateStatus = async (req, res) => {
  try {
    const id = req.params.id;
    const { status } = req.body;

    // Update task status in the database
    pool.query(
      "UPDATE tasks SET status = ? WHERE id = ?",
      [status, id],
      (error, results, fields) => {
        if (error) {
          console.error("Error updating task status:", error);
          return res
            .status(500)
            .json({ message: "Internal server error", error: error.message });
        }
        if (results.affectedRows === 0) {
          return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json({ message: "Task status updated successfully" });
      }
    );
  } catch (error) {
    console.error("Error updating task status:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

module.exports = {
  createTask,
  findAllTasks,
  deleteTask,
  getSingleTask,
  updateTask,
  updateStatus,
  findTasks
};
