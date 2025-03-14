const express = require("express");
const verifyToken = require("../middleware/authMiddleware");
const {
    createTask,
    getTasks,
    getTask,
    updateTask,
    deleteTask
} = require("../controllers/taskController");

const taskRouter = express.Router();
taskRouter.post("/", verifyToken, createTask); 
taskRouter.get("/", verifyToken, getTasks); 
taskRouter.get("/:taskId", verifyToken, getTask); 
taskRouter.put("/:taskId", verifyToken, updateTask); 
taskRouter.delete("/:taskId", verifyToken, deleteTask); 

module.exports = taskRouter;
