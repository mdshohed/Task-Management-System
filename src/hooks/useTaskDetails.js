import React, { useEffect, useState } from 'react';

const useTaskDetails = (id) => {
  const [task, setTask] = useState({}); 
  useEffect(()=>{
    const url = `http://localhost:5000/api/task/${id}`; 
    fetch(url)
    .then(res=>res.json())
    .then(data=>setTask(data)); 
  },[id])
  return [task, setTask]; 
};

export default useTaskDetails;