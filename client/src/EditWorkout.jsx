import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditWorkout = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [workout, setWorkout] = useState({
    name: "",
    category: "",
    duration: "",
    equipment: ""
  });

  // Fetch Existing Workout
  useEffect(() => {
    fetch(`http://localhost:5000/api/workouts/${id}`)
      .then((res) => res.json())
      .then((data) => setWorkout(data))
      .catch((err) => console.error("Error fetching workout:", err));
  }, [id]);

  // Handle Input Changes
  const handleChange = (e) => {
    setWorkout({ ...workout, [e.target.name]: e.target.value });
  };

  // Handle Form Submit (Update Workout)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(`http://localhost:5000/api/workouts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(workout),
      });
      navigate("/"); // Redirect to home
    } catch (error) {
      console.error("Error updating workout:", error);
    }
  };

  return (
    <div>
      <h2>Edit Workout</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={workout.name} onChange={handleChange} required />
        <input type="text" name="category" value={workout.category} onChange={handleChange} required />
        <input type="number" name="duration" value={workout.duration} onChange={handleChange} required />
        <input type="text" name="equipment" value={workout.equipment} onChange={handleChange} required />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditWorkout;
