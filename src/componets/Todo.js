import React, { useState, useEffect } from "react";
import axios from "axios";
import InputSubmit from "./InputSubmit";

function Todo() {
  const [Data, setData] = useState([]); // Initialize as an empty array
  const apiUrl = "https://jsonplaceholder.typicode.com/todos";

  //   Fetching data Using axios with api using useEffect hook
  useEffect(() => {
    // Check if data exists in localStorage, if not, fetch from API
    const storedData = JSON.parse(localStorage.getItem("todoData"));
    if (storedData) {
      setData(storedData);
    } else {
      axios
        .get(apiUrl)
        .then((response) => {
          setData(response.data);
          localStorage.setItem("todoData", JSON.stringify(response.data));
          console.log("Response Data:", response.data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, []);

  // Handling the tasks for completed / not completed
  const handleCheckboxChange = (taskId, completed) => {
    // Update the task status locally
    const updatedData = Data.map((item) =>
      item.id === taskId ? { ...item, completed } : item
    );
    setData(updatedData);

    // Send a PUT request to update the task status on the server
    axios
      .put(`https://jsonplaceholder.typicode.com/todos/${taskId}`, {
        completed,
      })
      .then((response) => {
        // Handle the response if needed
        console.log("Task status updated:", response.data);
      })
      .catch((error) => {
        // Handle errors if any
        console.error("Error updating task status:", error);
      });

    // Updating localStorage
    localStorage.setItem("todoData", JSON.stringify(updatedData));
  };

  // Adding New todo using prop
  const addTask = (newTaskTitle) => {
    // Send a POST request to add a new task
    if (newTaskTitle.trim() === "") {
      return alert("Input Field Must be Filled");
    }

    axios
      .post("https://jsonplaceholder.typicode.com/todos", {
        title: newTaskTitle,
        completed: false,
      })
      .then((response) => {
        const updatedData = [response.data, ...Data];
        setData(updatedData);
        console.log("New task added:", response.data);

        // Updating localStorage
        localStorage.setItem("todoData", JSON.stringify(updatedData));
      })
      .catch((error) => {
        console.error("Error adding task:", error);
      });
  };

  //   Handling delete functionality of data
  const handleDeleteClick = (taskId) => {
    // Sending a DELETE request to remove the task from the server
    axios
      .delete(`https://jsonplaceholder.typicode.com/todos/${taskId}`)
      .then(() => {
        // Update the UI by filtering out the deleted task
        const updatedData = Data.filter((item) => item.id !== taskId);
        setData(updatedData);

        // Updating localStorage
        localStorage.setItem("todoData", JSON.stringify(updatedData));
      })
      .catch((error) => {
        // Handle errors if any
        console.error("Error deleting task:", error);
      });
  };

  return (
    <>
      {/* use of props In Form for adding todo*/}
      <InputSubmit addTask={addTask} />
      {/*  accesing Table data using Map method and handling deleting task and checkbox tick/untick */}

      <table className="rwd-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Task</th>
          </tr>
        </thead>
        {Data.length > 0
          ? Data.map((item) => (
              <tbody key={item.id}>
                <tr>
                  <td>{item.title}</td>
                  <td>{item.completed ? "Completed" : "Not Completed"}</td>
                  <td>
                    <input
                      type="checkbox"
                      checked={item.completed}
                      onChange={() =>
                        handleCheckboxChange(item.id, !item.completed)
                      }
                    />
                  </td>
                  <td>
                    <button
                      onClick={() => handleDeleteClick(item.id)}
                      className="button-18 button-17"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            ))
          : null}
      </table>
      {Data.length === 0 && <p className="loading">Loading data...</p>}
    </>
  );
}

export default Todo;
