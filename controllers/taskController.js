import Task from "../models/Task.js";

// =================== CREATE Task ============================

export const createTask = async (req, res) => {

  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: "All fields required" });
    }

    const task = await Task.create({ title, description, user: req.user._id });

    res.status(201).json({ message: "Task created successfully", task: task });

  } catch (error) {
    
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};


//====================== GET All Tasks =================================

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user._id } ).sort({ createdAt: -1 });
    res.status(200).json({ success: true, message: "Get all tasks", count: tasks.length, tasks: tasks });

  } catch (error) {

    console.error("Get Tasks Error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch tasks"});
  }
};


//============================= UPDATE Task ============================

export const updateTask = async (req, res) => {

  try {

    const task = await Task.findByIdAndUpdate({ _id: req.params.id, user: req.user._id }, req.body,{ new: true, runValidators: true });

    if (!task) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }

    res.status(200).json({ success: true, message: "Task updated successfully", task: task});

  } catch (error) {

    console.error("Update Task Error:", error);
    res.status(500).json({ success: false, message: "Failed to update task" });
  }
};


// =========================== DELETE Task ===================================

export const deleteTask = async (req, res) => {

  try {
    const task = await Task.findByIdAndDelete({_id: req.params.id, user: req.user._id  });

    if (!task) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }

    res.status(200).json({ success: true, message: "Task deleted successfully" });

  } catch (error) {

    console.error("Delete Task Error:", error);
    res.status(500).json({ success: false, message: "Failed to delete task" });
  }
};

