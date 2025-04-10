import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Import controller functions using ES Modules
import { getWorkouts, createWorkout, deleteWorkout, updateWorkout } from '../controllers/workoutController.js';

// Initialize the express router
const router = express.Router();

// ✅ Handle __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ JSON file path
const workoutsFilePath = path.join(__dirname, '../workouts.json');

// ✅ Read workouts from JSON
const readWorkouts = () => {
  try {
    const data = fs.readFileSync(workoutsFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('❌ Error reading workouts.json:', err);
    return [];
  }
};

// ✅ Write workouts to JSON
const writeWorkouts = (data) => {
  try {
    fs.writeFileSync(workoutsFilePath, JSON.stringify(data, null, 2));
    console.log('✅ Saved workouts to workouts.json');
  } catch (err) {
    console.error('❌ Error writing workouts.json:', err);
  }
};

// ✅ GET all workouts
router.get('/', getWorkouts);

// ✅ GET workout by ID
router.get('/:id', (req, res) => {
  const workouts = readWorkouts();
  const workout = workouts.find(w => w.id === Number(req.params.id));
  if (!workout) {
    return res.status(404).json({ message: 'Workout not found' });
  }
  res.json(workout);
});

// ✅ POST new workout
router.post('/', (req, res) => {
  console.log('📥 Received workout:', req.body);

  const { exercise, duration, caloriesBurned, date } = req.body;
  const workouts = readWorkouts();

  const newWorkout = {
    id: Date.now(),
    exercise,
    duration,
    caloriesBurned,
    date
  };

  workouts.push(newWorkout);
  writeWorkouts(workouts);

  console.log('✅ Workout added:', newWorkout);
  res.status(201).json(newWorkout);
});

// ✅ PUT update workout
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { exercise, duration, caloriesBurned, date } = req.body;

  let workouts = readWorkouts();
  const index = workouts.findIndex(w => w.id === Number(id));

  if (index === -1) {
    return res.status(404).json({ message: 'Workout not found' });
  }

  workouts[index] = { id: Number(id), exercise, duration, caloriesBurned, date };
  writeWorkouts(workouts);

  res.json(workouts[index]);
});

// ✅ DELETE workout
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  let workouts = readWorkouts();

  const newWorkouts = workouts.filter(w => w.id !== Number(id));
  writeWorkouts(newWorkouts);

  res.status(204).send();
});

export default router;
