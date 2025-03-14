const express = require("express");
const { createTask, getTasks, getTaskById, updateTask, deleteTask } = require("../controllers/taskController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Task Routes (All are protected)
router.post("/", authMiddleware, createTask);
router.get("/", authMiddleware, getTasks);
router.get("/:id", authMiddleware, getTaskById);
router.put("/:id", authMiddleware, updateTask);
router.delete("/:id", authMiddleware, deleteTask);

module.exports = router;
