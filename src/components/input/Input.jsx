import React, { useEffect, useState } from 'react';

import styled from './input.module.css';
import axios from 'axios';

function Input(props) {
  const [newTask, setNewTask] = useState({
    content: '',
    checked: false,
  });
  const [reloadPage, setReloadPage] = useState(false);

  const handleInputChange = (e) => {
    setNewTask((prevState) => ({ ...prevState, content: e.target.value }));
  };

  const handleAddTask = () => {
    if (props.id === '') {
      axios.get('http://localhost:8000/tasks').then((response) => {
        const allTasks = response.data;
        const lastTask = allTasks[allTasks.length - 1];
        const lastTaskID = parseInt(lastTask.id);

        axios
          .post('http://localhost:8000/tasks', {
            id: (lastTaskID + 1).toString(),
            content: newTask.content,
            checked: newTask.checked,
          })
          .then(() => {
            setNewTask((prevState) => ({ ...prevState, content: '' }));
            setReloadPage(true);
          });
      });
    } else {
      axios
        .put(`http://localhost:8000/tasks/${props.id}`, {
          content: newTask.content,
          checked: newTask.checked,
        })
        .then((response) => {
          setReloadPage(true);
        });
    }
  };

  useEffect(() => {
    if (reloadPage) {
      window.location.reload();
    }
  }, [reloadPage]);

  return (
    <div className={styled.inputcontainer}>
      <input
        type='text'
        onChange={handleInputChange}
        value={newTask.content || props.value}
        id={props.id}
      />
      <div className={styled.addTask}>
        <button onClick={handleAddTask}>Add Task</button>
      </div>
    </div>
  );
}

export default Input;
