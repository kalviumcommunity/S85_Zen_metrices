import React from "react";
import WorkoutCard from "./WorkoutCard";
import AddWorkout from "../AddWorkout";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <h1>Welcome to ZENMATICE</h1>
      <p>Your personalized fitness assistant for smarter workouts!</p>
      <p>Start your fitness journey with customized workouts and expert guidance.</p>
      
      <WorkoutCard />
      <AddWorkout />
    </div>
  );
}

export default App;
