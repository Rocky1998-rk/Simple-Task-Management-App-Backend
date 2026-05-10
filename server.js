import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import taskRoutes from "./routes/taskRoutes.js";
import authRoutes from "./routes/authRoutes.js";


dotenv.config({ quiet: true });
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

app.use(cors({
     origin:["https://simple-task-management-app-gamma.vercel.app"],
     credentials:true,
     methods:["GET","POST","PUT","PATCH","DELETE"],
     exposedHeaders:["Authorization"],
     
}));

// ================= Routes ==============
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);


const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
};

startServer();

export default app;
