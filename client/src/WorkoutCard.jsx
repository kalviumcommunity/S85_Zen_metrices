import React, { useEffect, useState } from "react";
// import axios from "axios";

const WorkoutsList = () => {
    const [workouts, setWorkouts] = useState([]);

    useEffect(() => {
      fetch("http://localhost:5000/api/workouts")
        .then((res) => res.json())
        .then((data) => setWorkouts(data))
        .catch((err) => console.error("Error fetching workouts:", err));
    }, []);
    

    return (
        <div>
            <h2>Workouts List</h2>
          
                <ol>
                    {workouts.map((workout) => (
                        <li key={workout._id}>
                            <h3>{workout.name}</h3>
                            <p>Category: {workout.category}</p>
                            <p>Duration: {workout.duration} minutes</p>
                            <p>Equipment: {workout.equipment}</p>
                        </li>
                    ))}
                </ol>
           
        </div>
    );
};

export default WorkoutsList;
