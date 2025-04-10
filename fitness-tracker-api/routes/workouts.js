import express from "express";
import {
  getWorkouts,
  getWorkoutById,
  createWorkout,
  updateWorkout,
  deleteWorkout
} from "../controllers/workoutController.js";

const router = express.Router();

// Route to get all workouts
router.get("/", getWorkouts);

// Route to get a single workout by ID
router.get("/:id", getWorkoutById);

// Route to create a new workout
router.post("/", createWorkout);

// Route to update a workout by ID
router.put("/:id", updateWorkout);

// Route to delete a workout by ID
router.delete("/:id", deleteWorkout);

export default router;
