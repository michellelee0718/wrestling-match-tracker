import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Dashboard } from "./Components/dash";
import { Auth } from "./Components/authorization";
import { RecordsProvider } from "./contexts/record-context";
import { SignedIn, UserButton } from "@clerk/clerk-react";
// import { dark } from "@clerk/themes";

function App() {
  return (
    <Router>
      <div className="app-container">
        <div className="navbar">
          <Link to="/auth"> Dashboard</Link>
          <SignedIn>
            <UserButton showName/>
          </SignedIn>
        </div>
        <Routes>
          <Route
            path="/"
            element={
              <RecordsProvider>
                <Dashboard />
              </RecordsProvider>
            }
          />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;