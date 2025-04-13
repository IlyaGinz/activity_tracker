require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const activitiesRouter = require("./routes/activities");

const app = express();

mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

app.use(cors());
app.use(express.json());
app.use("/activities", activitiesRouter);

app.listen(3001, () => console.log("Server started on port 3001"));
