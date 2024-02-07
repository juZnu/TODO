import React, { useContext } from 'react'
import axios from 'axios'
import {backend} from '../Variables'
import {MyContext} from '../Context/MyContext'
export default function Delete({pk}) {
  const {fetchTasks} = useContext(MyContext)
  const onClickHandler = ()=>{
    axios.delete(`${backend}update_task/${pk}/`)
    .then(()=>fetchTasks())
    .catch(error => console.error('error'))
  }
  return (
    <div>
        <button onClick={onClickHandler}>Delete</button>
    </div>
  )
}
