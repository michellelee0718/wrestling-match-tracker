import express, { Express } from "express";
import mongoose from "mongoose";
import RecordRouter from "./routes/records";
import cors from "cors";

const app: Express = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

const mongoURI: string = "mongodb+srv://michellehlee07:LCJC9eU6VRoi57hb@wrestlingtracker.mjuxn.mongodb.net/"

mongoose
  .connect(mongoURI)
  .then(() => console.log("CONNECTED TO MONGODB!"))
  .catch((err) => console.error("Failed to Connect to MongoDB:", err));

app.use("/records", RecordRouter);

app.listen(port, () => {
  console.log(`Server Running on Port ${port}`);
});