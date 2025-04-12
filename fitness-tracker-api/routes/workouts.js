import express from "express";
import {
  getWorkouts,
  getWorkoutById,
  createWorkout,
  updateWorkout,
  deleteWorkout,
} from "../controllers/workoutController.js";

const router = express.Router();

// GET all workouts
router.get("/", (_req, res) => {
  const workouts = getWorkouts();
  res.send(workouts); // Send the workouts as a response
});


//router.get("/", getWorkouts);

// GET a single workout by ID
router.get("/:id", getWorkoutById);

// POST a new workout
router.post("/", createWorkout);

// PUT (update) a workout
router.put("/:id", updateWorkout);

// DELETE a workout
router.delete("/:id", deleteWorkout);

export default router;