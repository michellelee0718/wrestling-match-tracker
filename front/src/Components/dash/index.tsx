import { useUser } from "@clerk/clerk-react";
import { RecordForm } from "./record-form";
import { RecordList } from "./record-list"
import "./record.css";
import { useRecords } from "../../contexts/record-context";
import { useMemo } from "react";
export const Dashboard = () => {
  const { user } = useUser();
  const { records } = useRecords();

  const avgRating = useMemo(() => {
    let totalAmount = 0;
    let totalShows = 0;
    records.forEach((record) => {
        totalAmount += record.rating;
        totalShows += 1;
    });
    if (totalShows == 0) {
      return 0;
    } else {
      return totalAmount/totalShows;
    }
  }, [records]);

  return (
    <div className="dashboard-container">
      <h1>Hi {user?.firstName}! Enter a match you watched:</h1>
      <RecordForm />
      <div>Average Match Rating: {avgRating}</div>
      <RecordList />
    </div>
  );
};