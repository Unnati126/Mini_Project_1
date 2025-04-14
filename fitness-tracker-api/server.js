import express from "express";
import cors from "cors";
import workoutRoutes from "./routes/workouts.js";


const app = express();
const PORT = process.env.PORT || 5002;

app.use(cors());
app.use(express.json());
app.use('/', express.static('public'));
app.use("/api/workouts", workoutRoutes);

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});