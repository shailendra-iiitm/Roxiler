import express from "express";
import cors from "cors";
import db from "./config/db.js";

import routes from "./routes/index.js";


const app = express();
const PORT = Number(process.env.PORT || 5000);

const allowedOrigin = process.env.CORS_ORIGIN || 'http://localhost:5173';

app.use(cors({ origin: allowedOrigin }));
app.use(express.json());
app.use("/api", routes);

app.get("/", (req, res) => {
    res.send("Roxiler Backend is running");
});


db.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err);
        process.exit(1);
    }

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
        console.log("MySQL Connected");
    });
});

