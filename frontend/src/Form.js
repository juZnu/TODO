/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import './CSS/Form.css'

export default function Form({onSubmitHandler,task,edit,setEditOn}) {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [formColor, setFormColor] = useState('#f0f4f8'); // Default color

  useEffect(() => {
    // Set date and time if task is provided
    if (task) {
      const [date_, time_] = task['scheaduleDateTime'].split('T');
      setDate(date_);
      setTime(time_);
    } else {
      // Set default date and time
      const now = new Date();
      const [date_, time_] = now.toISOString().split('T');
      setDate(date_);
      setTime(time_);
    }

    // Update form color based on task priority
    if (edit && task) {
      switch (task.taskPriority) {
        case 1:
          setFormColor('#ffcccc'); // High priority color
          break;
        case 2:
          setFormColor('#ffffcc'); // Normal priority color
          break;
        case 3:
          setFormColor('#ccffcc'); // Low priority color
          break;
        default:
          setFormColor('#f0f4f8'); // Default color
      }
    }
  }, [task, edit]);

  const onClickHandler = () => {
    setEditOn(false);
  };
    return (
    <div className="form-container" style={{ backgroundColor: formColor }}>
      <form onSubmit={onSubmitHandler}>
        <div className="form-row">
          <div className="input-group">
            <label htmlFor='input-task'>Task</label>
            <input type='text' id='input-task' name='task' defaultValue={edit ? task.task : ''} />
          </div>
          <div className="input-group">
            <label htmlFor='input-date'>Scheduled Date</label>
            <input type='date' id='input-date' name='scheaduledDate' defaultValue={date} />
          </div>
          <div className="input-group">
            <label htmlFor='input-time'>Time</label>
            <input type='time' id='input-time' name='time' defaultValue={time.slice(0, 5)} />
          </div>
          <div className="input-group">
            <label htmlFor='input-priority'>Priority</label>
            <select name='taskPriority' id='input-priority' defaultValue={edit ? `${task.taskPriority}` : '1'}>
              <option value='1'>High</option>
              <option value='2'>Normal</option>
              <option value='3'>Low</option>
            </select>
          </div>
           <input type='submit' name='action' value={edit ?'Edit': 'Add'} />
        </div>
        <div className="textarea-row">
          <label htmlFor='input-description'>Description</label>
          <textarea id="input-description" name="taskDescription" defaultValue={edit ? task.taskDescription : ''}></textarea>
        </div>
        <div className="actions-row">
          {edit ? (
            <>
              <button onClick={onClickHandler}>Cancel</button>
            </>
          ) : ''}
        </div>
      </form>
    </div>
  )
}
