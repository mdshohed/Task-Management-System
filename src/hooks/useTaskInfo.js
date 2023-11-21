import axios from 'axios';
import React, { useEffect, useState } from 'react';

const useTaskInfo = () => {
  const [task, setTask] = useState([]); 
  useEffect(()=>{
    axios.get('https://task-manager-server-n5ozh8y4l-mdshohed.vercel.app/api/task')
    .then((res) => {
      setTask(res.data);
    });
  },[task])
  return [task, setTask]; 
};

export default useTaskInfo;



