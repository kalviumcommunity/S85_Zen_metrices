import React, { useEffect, useState } from "react";
import "./WorkoutsList.css"; // Ensure you have this CSS file

const WorkoutsList = () => {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/workouts")
      .then((res) => res.json())
      .then((data) => setWorkouts(data))
      .catch((err) => console.error("Error fetching workouts:", err));
  }, []);

  return (
    <div className="workout-container">
      <h2 className="workout-title">Workouts List</h2>

      <div className="workout-list">
        {workouts.map((workout) => (
          <div key={workout._id} className="workout-box">
            <h3>{workout.name}</h3>
            <p><strong>Category:</strong> {workout.category}</p>
            <p><strong>Duration:</strong> {workout.duration} minutes</p>
            <p><strong>Equipment:</strong> {workout.equipment || "None"}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkoutsList;
