import "./Todo.css";
import { useEffect, useState } from 'react';
function Todolist() {
    const [input, setInput] = useState(''); 
    const [task, setTasks] = useState([]);
    const [editInfo, setEditInfo] = useState(false);
    const [currentList, setCurrentList] = useState(null);
    
    useEffect(() => {
      const stored = JSON.parse(localStorage.getItem("task"));
      if(stored) {
        setTasks(stored)
      }
   }, []);
  
    const handleSubmit = () => {
      if (editInfo) {
      
        const updatedTasks = task.map((task, index) => 
          index === currentList ? input : task
        );
        setTasks(updatedTasks);
        setEditInfo(false); 
        setCurrentList(null);
      } else {
  
        setTasks(prevTasks => [...prevTasks, input]);
      }
      setInput(''); 
    };
  
    const handleEdit = (index) => {
      setEditInfo(true);
      setCurrentList(index);
      setInput(task[index]); 
    };
  
    const handleDelete = (index) => {
      const newTasks = task.filter((_, i) => i !== index); 
      setTasks(newTasks);
      
    
      if (editInfo && index === currentList) {
        setEditInfo(false);
        setInput('');
      }
    };
     
   
    return (
      <div className='todo-container'>
        <h3>To do list</h3> 
        <div className="add-todo">      
        <input type='text' placeholder='what is the task today?' 
          value={input} 
          onChange={e => setInput(e.target.value)} 
        />
        
        <button className="btn-submit" onClick={handleSubmit}>
          {editInfo ? 'Update' : 'Add'}
        </button>
        </div>  
        <div className="btn-todolist">
        <ul style={{height: 150}}>
          {task.map((task, index) => (
            <li key={index}>
              {task}
              <button  onClick={() => handleEdit(index)}>Edit</button> 
              <button onClick={() => handleDelete(index)}>Delete</button>
            </li>
          ))}
        </ul>
        </div>
      </div>
    );
  }
  

export default Todolist;