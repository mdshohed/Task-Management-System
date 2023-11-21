import axios from 'axios';
import { useEffect, useState } from 'react';

const useTaskDetails = (id) => {
  const [taskDetail, setTaskDetail] = useState({}); 

  useEffect(()=>{
    const url = `http://localhost:5000/api/task/${id}`; 
    axios.get(url)
    .then(res=>{
      setTaskDetail(res.data)
    })
    .then(er=>{
      console.log(er);
    }); 
  },[id])
  return {taskDetail,setTaskDetail}; 
};

export default useTaskDetails;