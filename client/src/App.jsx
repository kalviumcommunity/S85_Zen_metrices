import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import WorkoutsList from "./WorkoutCard";
import EditWorkout from "./EditWorkout"; // Handles workout editing
import AddWorkout from "./AddWorkout"; // Handles adding new workouts
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app-container">
        <h1>Welcome to ZENMATICE</h1>
        <p>Your personalized fitness assistant for smarter workouts!</p>
        <p>Start your fitness journey with customized workouts and expert guidance.</p>

        {/* Navigation Button */}
        <Link to="/add">
          <button className="add-workout-btn">Add Workout</button>
        </Link>

        <Routes>
          <Route path="/add" element={<AddWorkout />} />
          <Route path="/" element={<WorkoutsList />} />
          <Route path="/edit/:id" element={<EditWorkout />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
