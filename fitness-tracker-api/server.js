import express from "express";
import cors from "cors";
import workoutRoutes from "./routes/workouts.js";
//require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5002;

/*const workoutRoutes = require("./routes/workouts");
app.use("/api/workouts", workoutRoutes);*/


app.use(cors());
app.use(express.json());

app.use('/', express.static('public'));

app.use("/api/workouts", workoutRoutes);

/*app.get("/", (req, res) => {
    res.send("Fitness Tracker API is running!");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Something went wrong!" });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Something went wrong!" });
});*/

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});