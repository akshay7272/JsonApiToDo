import React, { useState } from "react";

function InputSubmit({ addTask }) {
  const [newTask, setNewTask] = useState("");

  const handleInputChange = (e) => {
    setNewTask(e.target.value);
  };

  const handleAddClick = () => {
    // Call the addTask function with the new task title
    addTask(newTask);
    setNewTask(""); // Clear the input field after adding the task
  };

  return (
    <div className="form-data">
      <label className="custom-field one">
        <input
          type="text"
          placeholder=" "
          required
          value={newTask}
          onChange={handleInputChange}
        />
        <span className="placeholder">Enter Todo</span>
      </label>
      <button type="submit" onClick={handleAddClick} className="button-17">
        Add Todo
      </button>
    </div>
  );
}

export default InputSubmit;
