import { useUser } from "@clerk/clerk-react";
import { createContext, useContext, useEffect, useState } from "react";
import * as moment from "moment";

export interface Record {
  _id?: string;
  userId: string;
  date: Date;
  show: string;
  rating: number;
  company: string;
  matchType: string;
  match: string;
}

interface RecordsContextType {
  records: Record[];
  addRecord: (record: Record) => void;
  updateRecord: (id: string, newRecord: Record) => void;
  deleteRecord: (id: string) => void;
}

export const RecordsContext = createContext<
  RecordsContextType | undefined
>(undefined);

export const RecordsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [records, setRecords] = useState<Record[]>([]);
  const { user } = useUser();

  const fetchRecords = async () => {
    if (!user) return;
    const response = await fetch(
      `http://localhost:3001/records/getAllByUserID/${user.id}`
    );

    if (response.ok) {
      const records = await response.json();
      console.log(records);
      setRecords(records);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, [user]);

  const addRecord = async (record: Record) => {
    const response = await fetch("http://localhost:3001/records", {
      method: "POST",
      body: JSON.stringify(record),
      headers: {
        "Content-Type": "application/json",
        // date: moment(record.date).format('DD-MM-YYYY'),
      },
    });

    try {
      if (response.ok) {
        const newRecord = await response.json();
        // newRecord.date = moment(newRecord.date, 'DD-MM-YYYY').toDate();
        setRecords((prev) => [...prev, newRecord]);
      }
    } catch (err) {}
  };

  const updateRecord = async (id: string, newRecord: Record) => {
    const response = await fetch(
      `http://localhost:3001/records/${id}`,
      {
        method: "PUT",
        body: JSON.stringify(newRecord),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    try {
      if (response.ok) {
        const newRecord = await response.json();
        setRecords((prev) =>
          prev.map((record) => {
            if (record._id === id) {
              return newRecord;
            } else {
              return record;
            }
          })
        );
      }
    } catch (err) {}
  };

  const deleteRecord = async (id: string) => {
    const response = await fetch(
      `http://localhost:3001/records/${id}`,
      {
        method: "DELETE",
      }
    );

    try {
      if (response.ok) {
        const deletedRecord = await response.json();
        setRecords((prev) =>
          prev.filter((record) => record._id !== deletedRecord._id)
        );
      }
    } catch (err) {}
  };

  return (
    <RecordsContext.Provider
      value={{ records, addRecord, updateRecord, deleteRecord }}
    >
      {children}
    </RecordsContext.Provider>
  );
};

export const useRecords = () => {
  const context = useContext<RecordsContextType | undefined>(
    RecordsContext
  );

  if (!context) {
    throw new Error(
      "useRecords must be used within a RecordsProvider"
    );
  }

  return context;
};