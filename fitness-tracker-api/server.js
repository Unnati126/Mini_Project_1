const express = require("express");
const cors = require("cors");
require('dotenv').config();
const workoutRoutes = reuired('./workouts.js'); 

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(json());

app.use("/workouts", workoutRoutes);

app.get('/', (req, res) => {
    res.send('Fitness Tracker API is running!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});