import React, { useState, useEffect } from "react";

const AddWorkout = ({ onWorkoutAdded }) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [duration, setDuration] = useState("");
  const [equipment, setEquipment] = useState("");
  const [createdBy, setCreatedBy] = useState(""); // 🆕 New state for user ID
  const [users, setUsers] = useState([]); // 🆕 All users for dropdown

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // 🆕 Fetch users for the dropdown
  useEffect(() => {
    fetch("http://localhost:5000/api/users")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched users:", data); // 👈 check this in browser console
        setUsers(data);
      })
      .catch((err) => console.error("Failed to load users", err));
  }, []);
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!duration || isNaN(duration) || duration <= 0) {
      setError("Please enter a valid duration.");
      return;
    }

    if (!createdBy) {
      setError("Please select a user.");
      return;
    }

    const newWorkout = {
      name,
      category,
      duration: parseInt(duration, 10),
      equipment,
      createdBy, // 🆕 Send the selected user's ID
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

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Failed to add workout");
      }

      await res.json();
      setSuccessMessage("Workout added successfully!");
      onWorkoutAdded?.();

      // Clear form
      setName("");
      setCategory("");
      setDuration("");
      setEquipment("");
      setCreatedBy("");
    } catch (err) {
      setError(err.message || "Failed to add workout. Please try again.");
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

        {/* 🆕 Created By Dropdown */}
        <select
          value={createdBy}
          onChange={(e) => setCreatedBy(e.target.value)}
          required
        >
          <option value="">Select a User</option>
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.name}
            </option>
          ))}
        </select>

        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Workout"}
        </button>
      </form>
    </div>
  );
};

export default AddWorkout;
