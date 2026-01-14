import express from "express";
import { createTask, getTasks, updateTask, deleteTask } from "../controllers/taskController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// ======= Create Route ==========
router.post("/", protect, createTask);

// ======== Read Route ===========       
router.get("/", protect, getTasks);

// ======== Update Route =========         
router.put("/:id", protect, updateTask);

// ======== Delete Route ========    
router.delete("/:id", protect, deleteTask);  

export default router;
