const API_URL = "http://localhost:5002/api/workouts"; // Backend API URL

document.addEventListener("DOMContentLoaded", fetchWorkouts);

const form = document.getElementById("workout-form");

const readWorkouts = () => {
    try {
      const data = fs.readFileSync(workoutsFilePath, "utf-8");
      return JSON.parse(data);
    } catch (err) {
      console.error("❌ Error reading workouts.json:", err);
      return [];
    }
  };
  
  const writeWorkouts = (data) => {
    try {
      fs.writeFileSync(workoutsFilePath, JSON.stringify(data, null, 2));
      console.log("✅ Data saved to workouts.json");
    } catch (err) {
      console.error("❌ Error writing workouts.json:", err);
    }
  };
  

// Create workout (POST request)
form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const exercise = document.getElementById("exercise").value;
    const duration = document.getElementById("duration").value;
    const caloriesBurned = document.getElementById("calories").value;
    const date = document.getElementById("date").value;

    const newWorkout = { exercise, duration, caloriesBurned, date };

    const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newWorkout),
    });

    if (response.ok) {
        fetchWorkouts();  // Refresh list
        form.reset();     // Clear form
    }
});

// READ and display workouts (GET request)
async function fetchWorkouts() {
    const response = await fetch(API_URL);
    const workouts = await response.json();

    const workoutList = document.getElementById("workout-list");
    workoutList.innerHTML = ""; // Clear existing list

    let totalDuration = 0;
    let totalCalories = 0;

    workouts.forEach((workout) => {
        totalDuration += Number(workout.duration);
        totalCalories += Number(workout.caloriesBurned);
    });

document.getElementById("total-workouts").textContent = workouts.length;
document.getElementById("total-duration").textContent = totalDuration;
document.getElementById("total-calories").textContent = totalCalories;

    workouts.forEach((workout) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <span><strong>${workout.exercise}</strong> - ${workout.duration} min - ${workout.caloriesBurned} cal - ${workout.date}</span>
            <button class="edit-btn" onclick="updateWorkout(${workout.id})">Update</button>
            <button class="delete-btn" onclick="deleteWorkout(${workout.id})">Delete</button>
        `;
        workoutList.appendChild(li);
    });
}

// Update an existing workout (PUT request)
async function updateWorkout(id) {
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


// Add listener
document.getElementById("filter").addEventListener("input", async (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const response = await fetch(API_URL);
    const workouts = await response.json();

    const filtered = workouts.filter(workout =>
        workout.exercise.toLowerCase().includes(searchTerm) ||
        workout.date.includes(searchTerm)
    );

    renderWorkoutList(filtered);
});

// Refactor this out of fetchWorkouts()
function renderWorkoutList(workouts) {
    const workoutList = document.getElementById("workout-list");
    workoutList.innerHTML = "";
    workouts.forEach((workout) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <span><strong>${workout.exercise}</strong> - ${workout.duration} min - ${workout.caloriesBurned} cal - ${workout.date}</span>
            <button class="edit-btn" onclick="updateWorkout(${workout.id})">Update</button>
            <button class="delete-btn" onclick="deleteWorkout(${workout.id})">Delete</button>
        `;
        workoutList.appendChild(li);
    });
}