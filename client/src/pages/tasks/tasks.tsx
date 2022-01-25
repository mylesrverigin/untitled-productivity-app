import {useState,useEffect} from 'react';
import InputForm from '../../components/form/inputForm';
import createTaskForm from '../../utils/formSchema/taskFormSchema';
import { getTasks,deleteTask,updateTask } from '../../utils/endpointRequests/taskEndpoints';
import './tasks.scss'

interface taskInfo {
    _id:string,
    name:string,
    details:string,
    startDate:number,
    endDate:number,
    completed:boolean
}

const refreshTasks = (updatehook:Function) => {
    getTasks()
    .then(res=>{
        console.log('res',res);
        updatehook(res.data);
    })
    .catch(err=>{
        console.log('error getting tasks ',err)
    });
}

function Tasks() {
    const [showCreateTask,setShowCreateTask] = useState(false);
    const [taskState,setTaskState] = useState([]);

    useEffect(()=>{
        refreshTasks(setTaskState);
    },[])

    const handleComplete = async (task:taskInfo,evt:any) => {
        let isComplete = evt.target.checked;
        task.completed = isComplete;
        let serverResponse = await updateTask(task);
        console.log(serverResponse);
        refreshTasks(setTaskState);
    }
    
    const handleDelete = async (task:taskInfo,evt:any) => {
        let serverResponse = await deleteTask(task);
        console.log(serverResponse);
        refreshTasks(setTaskState);
    }

  return (
    <div className='tasks'>
        <button className='show-form' onClick={()=>{setShowCreateTask(c=>!c)}}>{showCreateTask? 'Create Task':'Hide'}</button>
        {showCreateTask && <InputForm {...createTaskForm('task')}/>}
        {taskState.length > 0 && taskState.map((task:taskInfo)=>{
            return (
                <div key={task._id} className={`task ${task.completed?'task-complete':''}`}>
                    <label htmlFor={`${task._id}-completed`}>complete</label>
                    <input type='checkbox' name={`${task._id}-completed`} checked={task.completed}  onChange={(event)=>{handleComplete(task,event)}}></input>
                    <p>{task.name}</p>
                    <p>{task.details}</p>
                    {/* <p>{new Date(task.startDate).toLocaleDateString()}</p>
                    <p>{new Date(task.endDate).toLocaleDateString()}</p> */}
                    <label htmlFor={`${task._id}-delete`}>delete</label>
                    <input type='checkbox' name={`${task._id}-delete`} onChange={(event)=>{handleDelete(task,event)}}></input>
                </div>
            );
        })}
    </div>
  );
}

export default Tasks;
