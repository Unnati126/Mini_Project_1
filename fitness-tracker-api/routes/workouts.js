const express = require("express");
const router = express.Router();

let workouts = [];
let idCounter = 1;

// Create workouts
router.post('/', (req, res) => {
    const { exercise, duration, caloriesburned, date} = req.body;
    const newWorkout = { id: idCounter++, exercise, duration, caloriesburned, date };
    workouts.push(newWorkout);
    res.status(201).json(newWorkout);
});

// Read workouts
router.get('/', (req, res) => {
    res.json(workouts);
});

//Update workout
router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { exercise, duration, caloriesburned, date } = req.body;

    const workout = workouts.find(w => w.id === parseInt(id));
    if (!workout) return res.status(404).json({ message: "Workout not found" });

    workout.exercise = exercise;
    workout.duration = duration;
    workout.caloriesburned = caloriesburned;
    workout.date = date;

    res.json(workout);
});

// Delete workout
router.delete("/:id", (req, res) => {
    workouts = workouts.filter(w => w.id !== parseInt(req.params.id));
    res.status(204).send();
});

module.exports = router;
//export default router;