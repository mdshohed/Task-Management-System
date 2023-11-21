import axios from 'axios';
import { useEffect, useState } from 'react';

const useTaskInfo = () => {
  const [task, setTask] = useState([]); 

  useEffect(()=>{
    axios.get('https://task-manager-server-rust.vercel.app/api/task')
    .then((res) => {
      setTask(res.data);
    }).catch(er=>{
      console.log(er);
    })
  },[task])
  return [task, setTask]; 
};

export default useTaskInfo;



