import React, { useState } from "react";
import { HiArchive } from "react-icons/hi";
import './Todo.css'; 


function Todolist() {
  
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(null);
   localStorage.setItem('tasks',JSON.stringify(tasks));
   let data = JSON.parse(localStorage.getItem('tasks'));
   console.log(data);
  

  function handleTitleChange(event) {
    setNewTaskTitle(event.target.value);
  }

 
  function handleDescriptionChange(event) {
    setNewTaskDescription(event.target.value);
  }

  
  function addTask() {
    try {
      if (newTaskTitle.trim() === "" || newTaskDescription.trim() === "") {
        throw new Error("Both title and description are empty.");
      }
      setTasks((prevTasks) => [
        ...prevTasks,
        { title: newTaskTitle, description: newTaskDescription, completed: false }
      ]);
  
      setNewTaskTitle("");
      setNewTaskDescription("");
    } catch (error) {
      console.log([]);
      alert(error.message);
    }
  }

  
  function deleteTask(index) {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  }


  function toggleTaskCompletion(index) {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task);
    setTasks(updatedTasks);
    }

 
  function editTask(index) {
    setIsEditing(true);
    setCurrentTaskIndex(index);
    setNewTaskTitle(tasks[index].title);
    setNewTaskDescription(tasks[index].description);
  }

  function saveTask() {
    const updatedTasks = [...tasks];
    updatedTasks[currentTaskIndex] = {
      title: newTaskTitle,
      description: newTaskDescription,
      completed: updatedTasks[currentTaskIndex].completed
    };
    setTasks(updatedTasks);
    setIsEditing(false);
    setNewTaskTitle("");
    setNewTaskDescription("");
    setCurrentTaskIndex(null);
  }

  const completedTask = tasks.filter((task) => task.completed).length;
  const totalTask = tasks.length;  
  
  return (
    <div className="to-do-list">
      <div className="TaskDone">
         <h4><HiArchive />ToDoList</h4>
         <div className="completed-Task">
            <section className="completed-section">
            <div>
              <h2 >Task Done</h2>
              <p >Keep it up</p>
            </div>
            <div>
              {completedTask}/{totalTask}
            </div>
          </section>
         </div>
      </div>
     
      <div className="todo-input">
        <div className="todo-input-item">  
       <label>Title:</label>
       <input
        
          type="text"
          placeholder="What is task today?"
          value={newTaskTitle}
          onChange={handleTitleChange}
        />
       
       </div>
        <div className="todo-input-item">
          <label>Description:</label>
        <input
          type="text"
          placeholder="Task Description"
          value={newTaskDescription}
          onChange={handleDescriptionChange}
        />
        </div>
       {isEditing ? (
          <button className="add-btn" onClick={saveTask}>Save</button>
        ) : (
          <button className="add-btn" onClick={addTask}>Add</button>
       )}
      </div>

      <ol>
        {tasks.map((task, index) => (
          <li key={index} className={task.completed ? "completed" : ""}>
            <span className="text">
              <strong className="strong-input">Title:{task.title}</strong>  <br />
              <strong className="strong-input">Description:{task.description}</strong> 
            </span>
          
            <button className="move-btn" onClick={() => toggleTaskCompletion(index)}>
              {task.completed ? "Unmark" : "Complete"}
            </button>
            <button className="edit-btn" onClick={() => editTask(index)}>Edit</button>
            <button className="delete-btn" onClick={() => deleteTask(index)}>Delete</button>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default Todolist;
