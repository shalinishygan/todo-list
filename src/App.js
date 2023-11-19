import React, { useState } from 'react';
import './App.css';


function App() {
const [tasks, setTasks] = useState([]);
const [newTask, setNewTask] = useState('');
const addTask = () => {
   if (newTask.trim() === '') {
     return; // Do not add empty tasks
   }
   setTasks([...tasks, { id: Date.now(), text: newTask, done: false }]);
   setNewTask('');
};
const handleKeyPress = (e) => {
   if (e.key === 'Enter') {
     addTask();
   }
};
const markTaskAsDone = (id) => {
   setTasks((prevTasks) =>
     prevTasks.map((task) =>
       task.id === id ? { ...task, done: !task.done } : task
     )
   );
};
const deleteTask = (id) => {
   setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
};
const renderIcon = (task) => {
   if (task.done) {
     return <span className="icon icon-return">&#8617;</span>; // Return icon for undo
   } else {
     return <span className="icon">&#10003;</span>; // Tick icon for done
   }
};



return (
   <div className="App">
     <h1>To-Do List</h1>
     <div>
       <input
         type="text"
         value={newTask}
         onChange={(e) => setNewTask(e.target.value)}
         onKeyPress={handleKeyPress}
         placeholder="Enter a new task"
       />
       <button onClick={addTask}>Add Task</button>
     </div>
     <ul>
       {tasks.map((task) => (
         <li key={task.id} className={task.done ? 'done' : ''}>
           <span>{task.text}</span>
           <div>
             <span className="icon" onClick={() => markTaskAsDone(task.id)}>
               {renderIcon(task)}
             </span>
             <span className="icon" onClick={() => deleteTask(task.id)}>
               &#128465; {/* Bin icon for delete */}
             </span>
           </div>
         </li>
       ))}
     </ul>
   </div>
);
}
export default App;