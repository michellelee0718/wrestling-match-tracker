import mongoose from "mongoose";

interface Record {
  userId: string;
  date: Date;
  show: string;
  rating: number;
  company: string;
  matchType: string;
  match: string;
}

const RecordSchema = new mongoose.Schema<Record>({
  userId: { type: String, required: false },
  date: { type: Date, required: true },
  show: { type: String, required: true },
  rating: { type: Number, required: true },
  company: { type: String, required: true },
  matchType: { type: String, required: true },
  match: { type: String, required: true }
});

const RecordModel = mongoose.model<Record>(
  "Record",
  RecordSchema
);

export default RecordModel;