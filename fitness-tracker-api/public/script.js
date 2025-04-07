const API_URL = "http://localhost:5000/api/workouts"; // Backend API URL

document.addEventListener("DOMContentLoaded", fetchWorkouts);

const form = document.getElementById("workout-form");

// Create workout (POST request)
form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const exercise = document.getElementById("exercise").value;
    const duration = document.getElementById("duration").value;
    const caloriesburned = document.getElementById("calories").value;
    const date = document.getElementById("date").value;

    const newWorkout = { exercise, duration, caloriesburned: calories, date };

    const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newWorkout),
    });

    if (response.ok) {
        fetchWorkouts();  //refresh list
        form.reset();  //clear form
    }
});

// READ and display workouts (GET request)
async function fetchWorkouts() {
    const response = await fetch(API_URL);
    const workouts = await response.json();

    const workoutList = document.getElementById("workout-list");
    workoutList.innerHTML = ""; // Clear existing list

    workouts.forEach((workout) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <span><strong>${workout.exercise}</strong> - ${workout.duration} min - ${workout.caloriesBurned} cal - ${workout.date}</span>
            <button class="edit-btn" onclick="editWorkout(${workout.id})">Edit</button>
            <button class="delete-btn" onclick="deleteWorkout(${workout.id})">Delete</button>
        `;
        workoutList.appendChild(li);
    });
}

// Update an existing workout (PUT request)
async function editWorkout(id) {
    const response = await fetch(`${API_URL}/${id}`);
    const workout = await response.json();

    const newExercise = prompt("Enter new exercise name:", workout.exercise);
    const newDuration = prompt("Enter new duration (min):", workout.duration);
    const newCalories = prompt("Enter new calories burned:", workout.caloriesBurned);
    const newDate = prompt("Enter new date (YYYY-MM-DD):", workout.date);

    if (newExercise && newDuration && newCalories && newDate) {
        const updatedWorkout = {
            exercise: newExercise,
            duration: newDuration,
            caloriesBurned: newCalories,
            date: newDate,
        };

        await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedWorkout),
        });

        fetchWorkouts(); // Refresh list
    }
}

// DELETE a workout (DELETE request)
async function deleteWorkout(id) {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    fetchWorkouts(); // Refresh list
}