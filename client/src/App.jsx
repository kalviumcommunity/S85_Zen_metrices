import React from "react";
import WorkoutCard from "./WorkoutCard"; // Import WorkoutCard component\
import AddWorkout from "../AddWorkout";

function App() {

  return (
    <>
    
    
    
    
      <h1>Welcome to ZENMATICE</h1>
      <div>

      <p>Your personalized fitness assistant for smarter workouts!</p>
      <p>Start your fitness journey with customized workouts and expert guidance.</p>
      </div>
        <WorkoutCard/>
        <AddWorkout />

    </>
  );
}

export default App;
