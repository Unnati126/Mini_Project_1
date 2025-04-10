import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// __dirname workaround in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// JSON file path
const dataFilePath = path.join(__dirname, "../data/workouts.json");

// Read workouts
function readWorkouts() {
  if (!fs.existsSync(dataFilePath)) return [];
  const data = fs.readFileSync(dataFilePath, "utf-8");
  return JSON.parse(data);
}

// Write workouts
function writeWorkouts(workouts) {
  fs.writeFileSync(dataFilePath, JSON.stringify(workouts, null, 2));
}

// GET all workouts
export const getWorkouts = (req, res) => {
  const workouts = readWorkouts();
  res.json(workouts);
};

// GET workout by ID
export const getWorkoutById = (req, res) => {
  const workouts = readWorkouts();
  const workout = workouts.find(w => w.id === parseInt(req.params.id));
  if (!workout) return res.status(404).json({ message: "Workout not found" });
  res.json(workout);
};

// POST new workout
export const createWorkout = (req, res) => {
  const { exercise, duration, caloriesBurned, date } = req.body;
  const workouts = readWorkouts();

  const newWorkout = {
    id: Date.now(),
    exercise,
    duration,
    caloriesBurned,
    date,
  };

  workouts.push(newWorkout);
  writeWorkouts(workouts);

  res.status(201).json(newWorkout);
};

// PUT update workout
export const updateWorkout = (req, res) => {
  const { id } = req.params;
  const { exercise, duration, caloriesBurned, date } = req.body;

  let workouts = readWorkouts();
  const index = workouts.findIndex(w => w.id === parseInt(id));
  if (index === -1) return res.status(404).json({ error: "Workout not found" });

  workouts[index] = { ...workouts[index], exercise, duration, caloriesBurned, date };
  writeWorkouts(workouts);
  res.json(workouts[index]);
};

// DELETE a workout
export const deleteWorkout = (req, res) => {
  const { id } = req.params;
  const workouts = readWorkouts();
  const filtered = workouts.filter(w => w.id !== parseInt(id));
  writeWorkouts(filtered);
  res.status(204).end();
};
