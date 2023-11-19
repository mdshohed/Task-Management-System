import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import swal from 'sweetalert';

export const UserContext = React.createContext();
export default UserContext;

export const UserContextProvider = ({ children }) => {
  const [signedIn, setSignedIn] = useState(null);
  const signIn = localStorage.getItem("role");
  const [task, setTask] = useState([]);

  axios.defaults.withCredentials= true;
  useEffect(()=>{
    axios.get('http://localhost:5000/api/task')
    .then((res) => {
      setTask(res.data);
    });
  },[task])
    
  
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
    <UserContext.Provider value={{signIn, signedIn, setSignedIn, task, UpdateData, DeleteTask}}>
      {children}
    </UserContext.Provider>
  );
};

