import React, { useEffect, useState } from 'react';
import {
  TbEditCircle,
  TbTrashX,
  TbCircle,
  TbCircleCheckFilled,
} from 'react-icons/tb';

import styled from './task.module.css';
import axios from 'axios';

function Task(props) {
  const [isDone, setIsDone] = useState(props.checked || false);
  const [checked, setChecked] = useState(false);
  const [reloadPage, setReloadPage] = useState(false);

  const handleTaskDone = () => {
    isDone ? setIsDone(false) : setIsDone(true);
    isDone ? setChecked(false) : setChecked(true);
    axios
      .put(`http://localhost:8000/tasks/${props.id}`, {
        content: props.content,
        checked: !checked,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDeleteTask = (e) => {
    axios
      .delete(`http://localhost:8000/tasks/${e.target.id}`)
      .then((response) => {
        setReloadPage(true);
      });
  };

  useEffect(() => {
    setChecked(isDone);
    if (reloadPage) {
      window.location.reload();
    }
  });
  return (
    <>
      <div className={styled.taskContainer}>
        <div className={styled.editDeleteContainer}>
          <TbTrashX
            className={styled.trashIcon}
            onClick={handleDeleteTask}
            id={props.id}
          />
          <TbEditCircle
            className={styled.editIcon}
            onClick={props.edit}
            id={props.id}
          />
        </div>
        <div className={styled.pTagContainer}>
          <p>{props.content}</p>
        </div>
        {checked ? (
          <TbCircleCheckFilled
            className={styled.tbCircleCheckFilled}
            onClick={handleTaskDone}
          />
        ) : (
          <TbCircle className={styled.tbCircle} onClick={handleTaskDone} />
        )}
      </div>
    </>
  );
}

export default Task;
