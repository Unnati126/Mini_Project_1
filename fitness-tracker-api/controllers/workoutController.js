import { readWorkouts , writeWorkouts } from "../service/workouts.js";

export const getWorkouts = () => {
    return readWorkouts();
  };


// Controller: Get by ID
export const getWorkoutById = (req, res) => {
  const workouts = readWorkouts();
  const workout = workouts.find((w) => w.id === parseInt(req.params.id));
  if (!workout) return res.status(404).json({ message: "Workout not found" });
  res.json(workout);
};

// Controller: Create
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

// Controller: Update
export const updateWorkout = (req, res) => {
  const { id } = req.params;
  const { exercise, duration, caloriesBurned, date } = req.body;

  let workouts = readWorkouts();
  const index = workouts.findIndex((w) => w.id === parseInt(id));
  if (index === -1) return res.status(404).json({ message: "Workout not found" });

  workouts[index] = { ...workouts[index], exercise, duration, caloriesBurned, date };
  writeWorkouts(workouts);

  res.json(workouts[index]);
};

// Controller: Delete
export const deleteWorkout = (req, res) => {
  const { id } = req.params;
  const workouts = readWorkouts();
  const newWorkouts = workouts.filter((w) => w.id !== parseInt(id));
  writeWorkouts(newWorkouts);
  res.status(204).end();
};