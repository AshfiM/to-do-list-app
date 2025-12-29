
import './App.css';
import { useState } from 'react';

function App() {
  const [task, setTask] = useState("")
  const [taskList, setTaskList] = useState([])
  const insertTask = (e) => {
    e.preventDefault()
    setTaskList((oldtaskList) => [...oldtaskList, task] )
    setTask("")
  }

  return (
    <div className="App">
        <form onSubmit={insertTask} className='app'>
          <h1>To Do List App</h1>
          <label htmlFor='task'>Task
            <input type='text' id='task' placeholder='add task' value={task} onChange={(e) => setTask(e.target.value)}></input>
          </label>
          <button >Add Task</button>
        </form>
        {taskList.length > 0 && (
          <ul>
            {taskList.map((item, id) => {
             return( <li id={id}>{item}</li>)
            })}
          </ul>
        ) }
    </div>
  );
}

export default App;
