import React from "react";
import WorkoutCard from "./WorkoutCard"; // Import the component

function App() {
  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h1>Welcome to ZENMATICE</h1>
      <p>Your personalized fitness assistant for smarter workouts!</p>
      
      <img
        src="/vite.svg"
        alt="Zenmatice Logo"
        style={{ width: "150px", marginTop: "20px" }}
      />

      <p>Start your fitness journey with customized workouts and expert guidance.</p>

      {/* Render the WorkoutCard component */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
        <WorkoutCard />
      </div>
    </div>
  );
}

export default App;
