import express from "express";
const router = express.Router();

let workouts = [];
let idCounter = 1;

// Create a new workout
router.post("/", (req, res) => {
  const { exercise, duration, caloriesBurned, date } = req.body;
  const newWorkout = {
    id: idCounter++,
    exercise,
    duration,
    caloriesBurned,
    date
  };
  workouts.push(newWorkout);
  res.status(201).json(newWorkout);
});

// Get all workouts
router.get("/", (req, res) => {
  res.json(workouts);
});

// Get single workout (optional for editing)
router.get("/:id", (req, res) => {
  const workout = workouts.find(w => w.id === parseInt(req.params.id));
  if (!workout) {
    return res.status(404).json({ message: "Workout not found" });
  }
  res.json(workout);
});

// Update a workout
router.put("/:id", (req, res) => {
  const { exercise, duration, caloriesBurned, date } = req.body;
  const workout = workouts.find(w => w.id === parseInt(req.params.id));

  if (!workout) {
    return res.status(404).json({ message: "Workout not found" });
  }

  workout.exercise = exercise;
  workout.duration = duration;
  workout.caloriesBurned = caloriesBurned;
  workout.date = date;

  res.json(workout);
});

// Delete a workout
router.delete("/:id", (req, res) => {
  workouts = workouts.filter(w => w.id !== parseInt(req.params.id));
  res.status(204).send();
});

export default router;
