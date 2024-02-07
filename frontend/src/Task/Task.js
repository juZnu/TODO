/* eslint-disable import/no-anonymous-default-export */
import React, { useContext, useState } from 'react'
import EditButton from './EditButton'
import Delete from './Delete'
import Form from '../Form'
import axios from 'axios'
import { backend } from '../Variables'
import { MyContext } from '../Context/MyContext'
import '../CSS/Task.css'

export default function Task({task}) {
  const {fetchTasks} = useContext(MyContext)
  const [editOn, setEditOn] = useState(false)
  const onClickDone =()=>{
    const {id,...formobject} = task
    formobject.taskDone = true
    update_task(id,formobject,false)
    
  }
  const onSubmitHandler =(event)=>{
    event.preventDefault()
    const form = new FormData(event.target)
    form.forEach((value, key) => {
      if(key === 'taskPriority'){
        task[key] = parseInt(value)
      }
      else if (key === 'scheaduledDate' || key === 'time') {
      const dateValue = form.get('scheaduledDate');
      const timeValue = form.get('time');
      task['scheaduleDateTime'] = `${dateValue}T${timeValue}`;
    }
      else{
        task[key] = value;
      }
    }
    )
    const {id,...formobject} = task
    update_task(id,formobject,true)
    
  }
  const update_task = (id,formObject,done) =>{
    axios.put(`${backend}update_task/${id}/`,formObject)
      .then(()=> {
        if(done){
          setEditOn(prev => !prev)
        }
        })
        .then(()=>fetchTasks())
      .catch(error => console.error(JSON.stringify(task),`${backend}/update_task/${task.id}/`))
  }
  const getPriorityClassName = () => {

  switch (task.taskPriority) {
    case 1:
      return 'task-priority-high';
    case 2:
      return 'task-priority-normal';
    case 3:
      return 'task-priority-low';
    default:
      return 'task-priority-low'; // Default class if priority is not specified
  }
};

  return (
    <div className="tasks-container">
      <div >
        {editOn ? (
          <Form onSubmitHandler={onSubmitHandler} task={task} edit={editOn} setEditOn={setEditOn} />
        ) : (
          <div className={`task-container ${getPriorityClassName()}`}>
            <div className="task-details">
              <div className="task-content">
                <h3 className={`task-title ${getPriorityClassName()}`}>{task.task}</h3>
                <p className={`task-description ${getPriorityClassName()}`}>{task.taskDescription}</p>
              </div>
              <div className="task-buttons">
                <button onClick={onClickDone}>Done</button>
                <EditButton pk={task.id} setEditOn={setEditOn} />
                <Delete pk={task.id} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
