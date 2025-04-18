import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import for navigation
import "./WorkoutsList.css"; // Ensure you have this CSS file

const WorkoutsList = () => {
  const [workouts, setWorkouts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/workouts")
      .then((res) => res.json())
      .then((data) => setWorkouts(data))
      .catch((err) => console.error("Error fetching workouts:", err));
  }, []);

  // DELETE Workout
  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/workouts/${id}`, { method: "DELETE" });
      setWorkouts(workouts.filter((workout) => workout._id !== id)); // Remove from UI
    } catch (error) {
      console.error("Error deleting workout:", error);
    }
  };
 
  return (
    <div className="workout-container">
      <h2 className="workout-title">Workouts List</h2>

      <div className="workout-list">
        {workouts.length > 0 ? (
          workouts.map((workout) => (
            <div key={workout._id} className="workout-box">
              <h3>{workout.name}</h3>
              <p><strong>Category:</strong> {workout.category}</p>
              <p><strong>Duration:</strong> {workout.duration} minutes</p>
              <p><strong>Equipment:</strong> {workout.equipment || "None"}</p>
              <button onClick={() => navigate(`/edit/${workout._id}`)}>Edit</button>
              <button onClick={() => handleDelete(workout._id)}>Delete</button>
            </div>
          ))
        ) : (
          <p>No workouts available.</p>
        )}
      </div>
    </div>
  );
};

export default WorkoutsList;
