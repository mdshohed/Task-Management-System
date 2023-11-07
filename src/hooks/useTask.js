import axios from 'axios';
import React, { useEffect, useState } from 'react';

const useTask = () => {
  const [task, setTask] = useState([]); 
  useEffect(()=>{
    axios.get('http://localhost:5000/api/task').then((response) => {
      setTask(response.data);
    });
  },[task])

  return [task]; 
};

export default useTask;