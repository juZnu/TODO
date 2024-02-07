/* eslint-disable import/no-anonymous-default-export */
import React, { useContext, useEffect } from 'react'
import Task from './Task/Task'
import { MyContext } from './Context/MyContext'


export default function () {
  const {tasks,fetchTasks} = useContext(MyContext)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => fetchTasks(),[])
  return (
    <div>
        {Object.keys(tasks).sort((a,b) => a.taskPriority - b.taskPriority).map(
            key => <Task key ={key} task = {tasks[key]} />
        )}
    </div>
  )
}
