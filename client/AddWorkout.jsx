import { useState } from "react";
import axios from "axios";

const AddWorkout = () => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    duration: "",
    equipment: "",
    difficulty: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://your-backend-api.com/workouts", formData);
      console.log(response.data);
      alert("Workout added successfully!");
      setFormData({ name: "", category: "", duration: "", equipment: "", difficulty: "" });
    } catch (error) {
      console.error("Error adding workout:", error);
    }
  };

  return (
    <div>
      <h2>Add a New Workout</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Workout Name" value={formData.name} onChange={handleChange} required />
        <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleChange} required />
        <input type="number" name="duration" placeholder="Duration (min)" value={formData.duration} onChange={handleChange} required />
        <input type="text" name="equipment" placeholder="Equipment" value={formData.equipment} onChange={handleChange} />
        <input type="text" name="difficulty" placeholder="Difficulty Level" value={formData.difficulty} onChange={handleChange} required />
        <button type="submit">Add Workout</button>
      </form>
    </div>
  );
};

export default AddWorkout;
