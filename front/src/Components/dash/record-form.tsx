import { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { useRecords } from "../../contexts/record-context";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


export const RecordForm = () => {
  const [show, setShow] = useState<string>("");
  const [rating, setRating] = useState<string>("");
  const [company, setCompany] = useState<string>("");
  const [matchType, setMatchType] = useState<string>("");
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [match, setMatch] = useState<string>("");
  const { addRecord } = useRecords();

  const { user } = useUser();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newRecord = {
      userId: user?.id ?? "",
      date: startDate,
      show: show,
      rating: parseFloat(rating),
      company: company,
      matchType: matchType,
      match: match
    };

    addRecord(newRecord);
    setShow("");
    setRating("");
    setCompany("");
    setMatchType("");
    setMatch("");
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
      <div className="form-field">
          <label>Date:</label>
          
          <DatePicker className="datePicker"
          selected={startDate} 
          onChange={(date: Date) => setStartDate(date)} />
           
        </div>
        <div className="form-field">
          <label>Company:</label>
          <select
            required
            className="input"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          >
            <option value="">Select a Company</option>
            <option value="AEW">AEW</option>
            <option value="NJPW">NJPW</option>
            <option value="Stardom">Stardom</option>
            <option value="DDT">DDT</option>
            <option value="WWE">WWE</option>
            <option value="Indies">Indies</option>
          </select>
        </div>
        <div className="form-field">
          <label>Show:</label>
          <input
            type="text"
            required
            className="input"
            value={show}
            onChange={(e) => setShow(e.target.value)}
          />
        </div>
        <div className="form-field">
          <label>Match:</label>
          <input
            type="text"
            required
            className="input"
            value={match}
            onChange={(e) => setMatch(e.target.value)}
          />
        </div>
        <div className="form-field">
          <label>Match Type:</label>
          <select
            required
            className="input"
            value={matchType}
            onChange={(e) => setMatchType(e.target.value)}
          >
            <option value="">Match Type</option>
            <option>Singles</option>
            <option>Tag Team</option>
            <option>Six Man Tag</option>
            <option>Eight Man Tag</option>
            <option>TLC</option>
            <option>No DQ</option>
            <option>Iron Man</option>
            <option>Deathmatch</option>
          </select>
        </div>
        <div className="form-field">
          <label>Rating:</label>
          <input
            type="number"
            required
            className="input"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
        </div>
        <button type="submit" className="button">
          Add Record
        </button>
      </form>
    </div>
  );
};