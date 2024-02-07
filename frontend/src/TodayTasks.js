/* eslint-disable import/no-anonymous-default-export */
import React, { useContext, useEffect } from 'react';
import Task from './Task/Task';
import { MyContext } from './Context/MyContext';

export default function () {
  const { tasks, fetchTasks } = useContext(MyContext);

  useEffect(() => {
    fetchTasks();
  }, []); // Fetch tasks only once on component mount

  const compareTasks = (a, b) => {
    // Convert scheduled date strings to Date objects
    const dateA = new Date(a.scheaduleDateTime);
    const dateB = new Date(b.scheaduleDateTime);

    // Compare scheduled dates
    if (dateA > dateB) return 1;
    if (dateA < dateB) return -1;

    // If scheduled dates are the same, compare priorities
    return a.taskPriority - b.taskPriority;
  };

  return (
    <div>
      {Object.values(tasks).sort(compareTasks).map((task, index) => (
        <Task key={index} task={task} />
      ))}
    </div>
  );
}
