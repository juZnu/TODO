/* eslint-disable import/no-anonymous-default-export */
import React from 'react'
import EditButton from './EditButton'
import Delete from './Delete'

export default function Task({task,fetchTasks}) {
    
  return (
    <div>
        <div>
        <h3> {task.task}</h3>
        <EditButton/>
        <Delete pk = {task.id} fetchTasks ={fetchTasks}/>
        </div>
        <div>
        <p>{task.taskDescription}</p>
        </div>
    </div>
  )
}
