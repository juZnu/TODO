import React from 'react'
import axios from 'axios'
import { backend } from './Variables';
export default function Home() {
  const onSubmitHandling = (event) =>{
    event.preventDefault();
    const data = new FormData(event.target)
    const formObject = {};
    data.forEach((value, key) => {

      if(key === 'taskPriority'){
        formObject[key] = parseInt(value)
      }
      else if (key === 'scheaduledDate' || key === 'time') {
      const dateValue = data.get('scheaduledDate');
      const timeValue = data.get('time');
      formObject['scheaduleDateTime'] = `${dateValue}T${timeValue}`;
    }
      else{
        formObject[key] = value;
      }
    });
    formObject.taskDone = false
    axios.post(backend+'add_task/',formObject)
      .then(response => console.log(response))
      .catch(
        error => console.log(error,JSON.stringify(formObject))
      )
  }
  return (
    <div>
      <form onSubmit={onSubmitHandling}>
        <label htmlFor='input-task'>Task</label>
        <input type='text' id='input-task' name ='task' />
        <label htmlFor='input-description'>Description</label>
        <textarea id="input-description" name="taskDescription"></textarea>
        <label htmlFor='input-date'>Scheaduled Date</label>
        <input type='date' id='input-date' name ='scheaduledDate' />
        <label htmlFor='input-time'>time</label>
        <input type='time' id='input-time' name ='time' />
        <label htmlFor='input-priority'>Priority</label>
        <select name='taskPriority' id ='input-priority'>
          <option value='1'>High</option>
          <option value='2'>Normal</option>
          <option value='3'>Low</option>
        </select>
        <input type='submit' value='add'/>
      </form>
    </div>
  )
}
