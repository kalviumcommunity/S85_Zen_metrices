import React, { useState } from "react";

const AddWorkout = ({ onWorkoutAdded }) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [duration, setDuration] = useState("");
  const [equipment, setEquipment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!duration || isNaN(duration) || duration <= 0) {
      setError("Please enter a valid duration.");
      return;
    }

    const newWorkout = {
      name,
      category,
      duration: parseInt(duration), // Ensure it's a valid number
      equipment,
    };

    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const res = await fetch("http://localhost:5000/api/workouts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newWorkout),
      });

      if (!res.ok) throw new Error("Failed to add workout");

      const data = await res.json();
      console.log("Workout added successfully:", data);

      setSuccessMessage("Workout added successfully!");
      onWorkoutAdded(); // 🔥 Call the refresh function
      setName("");
      setCategory("");
      setDuration("");
      setEquipment("");
    } catch (error) {
      console.error("Error adding workout:", error);
      setError("Failed to add workout. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Add a New Workout</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Workout Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Duration (min)"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Equipment"
          value={equipment}
          onChange={(e) => setEquipment(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Workout"}
        </button>
      </form>
    </div>
  );
};

export default AddWorkout;
