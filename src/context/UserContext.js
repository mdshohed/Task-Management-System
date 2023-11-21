import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import swal from 'sweetalert';
import useTaskInfo from '../hooks/useTaskInfo';

export const UserContext = React.createContext();
export default UserContext;

export const UserContextProvider = ({ children }) => {
  const signIn = localStorage.getItem("role"); 
  // const signIn = localStorage.getItem("role");
  const [task, setTask] = useTaskInfo();

    
  const UpdateData = (data) => {
    const url = `http://localhost:5000/api/task/${data.id}`; 
    axios.post(url, data)
    .then(res=>{
      swal("Successfully Updated!");
    }).catch(e=>{ 
      swal("Error Updated!", e);
    })
  };

  const DeleteTask = (id) => {
    console.log('delete Function');
    swal({ title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this task!",
      icon: "warning", buttons: true, dangerMode: true })
    .then((flag) => {
      if (flag) {
          const url = `http://localhost:5000/api/task/${id}`;
          axios.delete(url)
          .then(data=>{  
            const remaining = task.filter(item=>item._id !== id);
            swal('Successfully deleted'); 
            setTask(remaining); 
          }).catch(e=>{
            swal('Error Delete: ', e);
          })
      }else{}
    }); 
  };

  return (
    <UserContext.Provider value={{signIn, task, UpdateData, DeleteTask}}>
      {children}
    </UserContext.Provider>
  );
};

