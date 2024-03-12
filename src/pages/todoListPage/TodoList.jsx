import React, { useEffect, useState } from 'react';
import styled from './todoList.module.css';
import { MdRocketLaunch } from 'react-icons/md';
import Input from '../../components/input/Input';
import Task from '../../components/task/Task';
import axios from 'axios';

function TodoList() {
  const [task, setTask] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [taskID, setTaskID] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:8000/tasks')
      .then((response) => {
        setTask(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleEditTask = (e) => {
    axios.get(`http://localhost:8000/tasks/${e.target.id}`).then((response) => {
      setInputValue(response.data.content);
      setTaskID(e.target.id);
    });
  };
  return (
    <div className={styled.page}>
      <div className={styled.circleContainer}>
        <div className={styled.circle1}>
          <MdRocketLaunch />
        </div>
        <div className={styled.circle2}></div>
        <div className={styled.circle3}></div>
      </div>
      <div className={styled.inputHolderContainer}>
        <div className={styled.inputHolder}>
          <Input value={inputValue} id={taskID} />

          {task.map((result) => {
            return (
              <Task
                key={result.id}
                id={result.id}
                content={result.content}
                checked={result.checked}
                edit={handleEditTask}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default TodoList;
