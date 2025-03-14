const Task = require("../models/taskModel");


const createTask = async (req, res) => {
    const { title, description, dueDate, status } = req.body;
    const userId = req.user.id;  

    try {
        const task = new Task({
            title,
            description,
            dueDate,
            status,
            user: userId,  
        });

        await task.save();
        res.status(201).json({ message: "Task created successfully", task });
    } catch (error) {
        res.status(500).json({ error: "Error creating task", error });
    }
};


const getTasks = async (req, res) => {
    const userId = req.user.id;

    try {
        const tasks = await Task.find({ user: userId }); 
        res.status(200).json({ tasks });
    } catch (error) {
        res.status(500).json({ error: "Error fetching tasks", error });
    }
};


const getTask = async (req, res) => {
    const userId = req.user.id;
    const { taskId } = req.params;

    try {
        const task = await Task.findOne({ _id: taskId, user: userId });

        if (!task) {
            return res.status(403).json({ error: "You do not have access to this task" });
        }

        res.status(200).json({ task });
    } catch (error) {
        res.status(500).json({ error: "Error fetching task", error });
    }
};


const updateTask = async (req, res) => {
    const userId = req.user.id;
    const { taskId } = req.params;
    const { title, description, dueDate, status } = req.body;

    try {
        const task = await Task.findOne({ _id: taskId, user: userId });

        if (!task) {
            return res.status(403).json({ error: "You do not have access to this task" });
        }

        task.title = title || task.title;
        task.description = description || task.description;
        task.dueDate = dueDate || task.dueDate;
        task.status = status || task.status;

        await task.save();
        res.status(200).json({ message: "Task updated successfully", task });
    } catch (error) {
        res.status(500).json({ error: "Error updating task", error });
    }
};


const deleteTask = async (req, res) => {
    const userId = req.user.id;
    const { taskId } = req.params;

    try {
        const task = await Task.findOne({ _id: taskId, user: userId });

        if (!task) {
            return res.status(403).json({ error: "You do not have access to this task" });
        }

        await task.remove();
        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error deleting task", error });
    }
};

module.exports = {
    createTask,
    getTasks,
    getTask,
    updateTask,
    deleteTask
};
