import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataFilePath = path.join(__dirname, "../data/workouts.json");


// Helper: Read workouts
export const readWorkouts = () => {
    if (!fs.existsSync(dataFilePath)) return [];
    const data = fs.readFileSync(dataFilePath, "utf-8");
    return JSON.parse(data);
  };
  
  // Helper: Write workouts
  export const writeWorkouts = (workouts) => {
    fs.writeFileSync(dataFilePath, JSON.stringify(workouts, null, 2));
  };
