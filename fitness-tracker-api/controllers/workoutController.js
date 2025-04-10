// workoutController.js

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// JSON file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const workoutsFilePath = path.join(__dirname, '../data/workouts.json');

// Read workouts
const readWorkouts = () => {
  try {
    const data = fs.readFileSync(workoutsFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('❌ Error reading workouts.json:', err);
    return [];
  }
};

// Write workouts
const writeWorkouts = (data) => {
  try {
    fs.writeFileSync(workoutsFilePath, JSON.stringify(data, null, 2));
    console.log('✅ Saved workouts to workouts.json');
  } catch (err) {
    console.error('❌ Error writing workouts.json:', err);
  }
};

// GET all workouts
export const getWorkouts = (req, res) => {
  const workouts = readWorkouts();
  res.json(workouts);
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

// DELETE a workout
export const deleteWorkout = (req, res) => {
  const { id } = req.params;
  let workouts = readWorkouts();

  const newWorkouts = workouts.filter(w => w.id !== Number(id));
  writeWorkouts(newWorkouts);

  res.status(204).send();
};

// PUT update workout
export const updateWorkout = (req, res) => {
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
};
