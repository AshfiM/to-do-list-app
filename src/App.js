
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [task, setTask] = useState({id:-1, name:"",date:""})
  const [taskList, setTaskList] = useState([])
  const [isModify, setIsModify] = useState(false)
  const [id, setId] = useState(0)
  const insertTask = (e) => {
    e.preventDefault()
    const newId = id + 1
    const newtask = {...task, id:newId}
    setId(newId)
    setTaskList((oldtaskList) => [...oldtaskList, newtask] )
    setTask({id:-1, name:"",date:""})
  }
  const updateTask = () => {
    setTaskList((oldtaskList) => oldtaskList.map(
      (item) => item.id === task.id ? {...item, name:task.name, date:task.date}: item
    ))
    setIsModify(false)
    setTask({id:-1, name:"",date:""})

  }
  const deleteTask = (id) => {
    setTaskList((oldList) => {
      return oldList.filter(item => item.id !== id)
    } )

  }
  const modifyTask = (id) => {
    setIsModify(true)
    const updateTask = taskList.find((item) => item.id === id)
    setTask(updateTask)
    
  }
  // const url = "http://localhost:8080"
  // const client = new RestClient(url)
  // client.getTask("/taskList").then((data) => setTaskList(data))
  useEffect(() => {
    console.log(taskList)
  }, [taskList])

  return (
    <div className="App">
        <form onSubmit={insertTask} className='app'>
          <h1>To Do List App</h1>
          <label htmlFor='task'>Task
            <input type='text' 
            id='task' 
            placeholder='add task' 
            value={task.name} 
            onChange={(e) => setTask((oldTask) => {
              const tempTask = {...oldTask}
              tempTask.name = e.target.value
              return tempTask
            })}></input>
          </label>
          <label htmlFor='date'>Select Last Date
            <input type='date' 
            id="date"
            value={task.date}
            onChange={(e) => {
              const tempTask = {...task}
              tempTask.date = e.target.value
              setTask(tempTask)
            }}></input>
          </label>
          <button type="submit" disabled={isModify}>Add Task</button>
          <button disabled={!isModify} onClick={updateTask}>updateTask</button>
        </form>
        {taskList.length > 0 && (
          <ul>
            {taskList.map((item, id) => {
             return( <li key={item.id}>{item.name} {item.date} 
             <button onClick={()=> modifyTask(item.id)}>Modify task</button>
             <button onClick={() => deleteTask(item.id)}>Delete task</button>
             </li>)
            })}
          </ul>
        ) }
    </div>
  );
}

export default App;
