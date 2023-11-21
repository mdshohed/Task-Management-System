import axios from 'axios';
import { useEffect, useState } from 'react';

const useTaskInfo = () => {
  const [task, setTask] = useState([]); 
  useEffect(()=>{
    axios.get('https://task-manager-server-rust.vercel.app')
    .then((res) => {
      setTask(res.data);
    });
  },[task])
  return [task, setTask]; 
};

export default useTaskInfo;



