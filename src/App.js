
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [task, setTask] = useState({id:-1, task:"",date:""})
  const [taskList, setTaskList] = useState([])
  const [isModify, setIsModify] = useState(false)
  const [id, setId] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const insertTask = (e) => {
    e.preventDefault()
    const newId = id + 1
    const newtask = {...task, id:newId}
    setId(newId)
    setTaskList((oldtaskList) => [...oldtaskList, newtask] )
    setTask({id:-1, task:"",date:""})
  }
  const updateTask = () => {
    setTaskList((oldtaskList) => oldtaskList.map(
      (item) => item.id === task.id ? {...item, name:task.task, date:task.date}: item
    ))
    setIsModify(false)
    setTask({id:-1, task:"",date:""})

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
  const checkFields = () => {
    if (task.task.length === 0 || task.date.length === 0) {
      alert("fill the fields")
      return false;
    }
    return true
    
  }

  const url = "http://localhost:8080/app"
  
  //getList
  const getTaskList = async () => {
    try{
      const response = await fetch(url+"/taskList")
      const data = await response.json()
      setTaskList(data)
    }
    catch (e) {
      console.log(e)
    }
      
    }
  //insertList
  const insertTaskToDb = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    if (!checkFields()) {return}
    try{
      const response = await fetch(url + "/addTask", {
        method:"POST",
        headers:{"content-type":"application/json"},
        body:JSON.stringify(task)
    })
      const data = await response.json()
      console.log(data);
      getTaskList()
      setTask({id:-1, task:"",date:""})
      setIsLoading(false)
    }
    catch (e) {
      console.log(e)
    } 
    }

  //updateTask
  const updateTaskInDb = async() => {
    if (!checkFields()) return
    try {
      const response = await fetch(url +"/updateTask", {
        method:"PUT",
        headers:{"content-type":"application/json"},
        body:JSON.stringify(task)
      })
      const data = await response.json()
      console.log(data)
      getTaskList()
      setTask({id:-1, task:"",date:""})
      setIsModify(false)
    }
    catch (e) {
      console.log(e)
    }
  }
  //deleteTask
  const deleteTaskInDb = async(id) => {
    try {
      const response = await fetch(url+"/deleteTask"+`/${id}`,{
        method:"DELETE"
        
      })
      const data = await response.json()
      console.log(data)
      getTaskList()
    }
    catch (e) {
      console.log(e)
    } 
  }
  useEffect(() => {
      getTaskList()
    }, [])
  return (
    <div className="App">
      <div className='formDiv'>
        <form className='app'>
          <h1>To Do List App</h1>
          <label htmlFor='task'>Task
            <input type='text' 
            id='task' 
            placeholder='add task' 
            value={task.task} 
            onChange={(e) => setTask((oldTask) => {
              const tempTask = {...oldTask, task:e.target.value}
              return tempTask
            })}
            required
            ></input>
          </label>
          <label htmlFor='date'>Select Last Date
            <input type='date' 
            id="date"
            value={task.date}
            onChange={(e) => {
              const tempTask = {...task}
              tempTask.date = e.target.value
              setTask(tempTask)
            }} required></input>
          </label>
        </form>
        <button disabled={isModify} onClick={insertTaskToDb}>Add Task</button>
        <button disabled={!isModify} onClick={updateTaskInDb}>updateTask</button>
      </div>
        
        {/*taskList.length > 0 && (
          <ul>
            {taskList.map((item, id) => {
             return( <li key={item.id}>{item.name} {item.date} 
             <button onClick={()=> modifyTask(item.id)}>Modify task</button>
             <button onClick={() => deleteTask(item.id)}>Delete task</button>
             </li>)
            })}
          </ul>
        ) */}
        {taskList.length > 0 && (<table>
          <thead>
            <tr>
              <th>Task</th>
              <th>Last date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody >
            {taskList.map((item) => {          
              return (
              <tr key={item.id}>
                <td>{item.task}</td>
                <td>{item.date}</td>
                <td>
                  <button onClick={() => modifyTask(item.id)}>Modify</button>
                  <button onClick={() => deleteTaskInDb(item.id)}>Delete</button>
                </td>
              </tr>
              )  
            })}
            {/*<tr>
              <td>row1 data 1</td>
              <td>row1 data 2</td>
            </tr>
            <tr>
              <td>row2 data1</td>
              <td>row2 data2</td>
            </tr>*/}
          </tbody>
        </table>
        )}
    </div>
  );
}

export default App;
