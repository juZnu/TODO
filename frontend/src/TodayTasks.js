/* eslint-disable import/no-anonymous-default-export */
import React, { useEffect, useState } from 'react'
import Task from './Task/Task'
import axios from 'axios'
import { backend } from './Variables'
import Home from './Home'

export default function () {
    const [data,setData] = useState({})
    useEffect(()=>{
        fetchTasks();
    },[Home]);

    const fetchTasks = () => {
    axios
      .get(backend + 'task_today/')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
        {Object.keys(data).sort((a,b) => a.taskPriority - b.taskPriority).map(
            key => <Task key ={key} task = {data[key]} fetchTasks={fetchTasks}/>
        )}
        
    </div>
  )
}
