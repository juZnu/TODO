import { useState } from "react"
import axios from 'axios'
import {backend} from '../Variables'
import { MyContext } from "./MyContext"
export const MyProvider = ({children}) =>{
    const [tasks,setTasks] = useState({})
    const fetchTasks = ()=>{
        axios.get(backend+'task_today/')
        .then(response => setTasks(response.data))
        .catch(error => console.error(error))
    }
    return(
        <MyContext.Provider value={{tasks,setTasks,fetchTasks}}>
            {children}
        </MyContext.Provider>
    );
}