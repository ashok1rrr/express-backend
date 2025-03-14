const Task = require("../models/Task");

const ApiResponse = (success, message, data = null, error = null) => {
  return { success, message, data, error };
};

// 📌 Create a new task
exports.createTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json(ApiResponse(false, "Title is required"));
    }

    const task = new Task({
      title,
      description,
      user: req.user.userId,
    });

    await task.save();
    res.status(201).json(ApiResponse(true, "Task created successfully", task));
  } catch (error) {
    console.error("❌ Task Creation Error:", error);
    res.status(500).json(ApiResponse(false, "Server Error", null, error));
  }
};

// 📌 Get all tasks of logged-in user
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.userId });
    res.json(ApiResponse(true, "Tasks retrieved successfully", tasks));
  } catch (error) {
    console.error("❌ Fetching Tasks Error:", error);
    res.status(500).json(ApiResponse(false, "Server Error", null, error));
  }
};

// 📌 Get a single task by ID
exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user.userId });

    if (!task) {
      return res.status(404).json(ApiResponse(false, "Task not found"));
    }

    res.json(ApiResponse(true, "Task retrieved successfully", task));
  } catch (error) {
    console.error("❌ Fetching Task Error:", error);
    res.status(500).json(ApiResponse(false, "Server Error", null, error));
  }
};

// 📌 Update a task by ID
exports.updateTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user.userId },
      { title, description },
      { new: true, runValidators: true }
    );

    if (!task) {
      return res.status(404).json(ApiResponse(false, "Task not found or unauthorized"));
    }

    res.json(ApiResponse(true, "Task updated successfully", task));
  } catch (error) {
    console.error("❌ Updating Task Error:", error);
    res.status(500).json(ApiResponse(false, "Server Error", null, error));
  }
};

// 📌 Delete a task by ID
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user.userId });

    if (!task) {
      return res.status(404).json(ApiResponse(false, "Task not found or unauthorized"));
    }

    res.json(ApiResponse(true, "Task deleted successfully"));
  } catch (error) {
    console.error("❌ Deleting Task Error:", error);
    res.status(500).json(ApiResponse(false, "Server Error", null, error));
  }
};
