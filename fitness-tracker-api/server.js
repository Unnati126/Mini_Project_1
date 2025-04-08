import express, { json } from "express";
import cors from "cors";
//require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(json());

app.use('/', express.static('public'));

/*app.get("/", (req, res) => {
    res.send("Fitness Tracker API is running!");
});*/

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Something went wrong!" });
});



