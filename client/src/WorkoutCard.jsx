import React from "react";

const WorkoutCard = () => {
  // Dummy Data
  const workout = {
    name: "Full Body HIIT",
    duration: "30 Minutes",
    category: "HIIT",
    equipment: "Bodyweight Only"
  };

  return (
    <div className="border p-4 shadow-lg rounded-md bg-white w-64 text-center">
      <h2 className="text-xl font-bold text-gray-800">{workout.name}</h2>
      <p className="text-gray-600">Duration: {workout.duration}</p>
      <p className="text-gray-600">Category: {workout.category}</p>
      <p className="text-gray-600">Equipment: {workout.equipment}</p>
    </div>
  );
};

export default WorkoutCard;
