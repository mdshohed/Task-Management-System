import axios from 'axios';
import React, { useEffect, useState } from 'react';

const useTaskInfo = () => {
  const [task, setTask] = useState([]); 
  useEffect(()=>{
    axios.get('task-manager-server-rust.vercel.app')
    .then((res) => {
      setTask(res.data);
    });
  },[task])
  return [task, setTask]; 
};

export default useTaskInfo;



