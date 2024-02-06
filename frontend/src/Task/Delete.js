import axios from 'axios'
import React from 'react'
import { backend } from '../Variables'

export default function Delete({pk,fetchTasks}) {
    const onClickHandler = ()=>{
        axios.delete(backend+'update_task/'+pk+'/').then(
           ()=> fetchTasks()
        )
        .catch(error => console.error(backend+'update_task/'+{pk}+'/'))
    }
  return (
    <div>
        <button onClick={onClickHandler}>Delete</button>
    </div>
  )
}
