import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import swal from 'sweetalert';

const ViewSingleTask = () => {
  const {id} = useParams(); 
  const [taskdetails, setTaskdetails] = useState({
    id: id,
    taskName: '',
    taskDescription: ''
  });
  
  useEffect(()=>{
    const url = `http://localhost:5000/api/task/${id}`; 
    axios.get(url)
    .then(res=>{
      setTaskdetails({...taskdetails, taskName: res.data.taskName, taskDescription: res.data.taskDescription});
    })
    .catch(err=>console.log(err)) 
  },[id])


  const navigate = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();
    const url = `http://localhost:5000/api/task/${id}`; 
    await axios.post(url, taskdetails)
    .then(res=>{
        swal("Successfully Updated!");
        navigate('/task/view-task')
    })
    .catch(e=>{ 
      console.log(e);
    })
  }

  return (
    <div className="md:flex justify-center items-center mt-10">
    <div className="mx-auto md:flex mb-20 justify-between items-center animate-zoomIn  bg-white px-20 py-6 rounded-lg shadow-2xl">
      <form onSubmit={handleSubmit} className="w-96 mx-auto"> 
        <h2 className="mb-6 mt-4 text-3xl font-bold text-center ">Add Task</h2>

        {/* <div className="grid md:grid-cols-2 md:gap-6"> */}
          <div className="relative z-0 mb-6 w-full group">
            <input
              type="text"
              placeholder="Task Name"
              id='taskName'
              value={taskdetails.taskName}
              onChange={(e) => setTaskdetails({...taskdetails, taskName: e.target.value})}
              className="block  px-0 w-full text-md text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              required
            />
          </div>
        {/* </div> */}

        <div className="relative z-0 mb-6 w-full group">
          <textarea 
            type="text"
            name="course-title"
            rows="4" cols="40"
            id="task_description"
            value={taskdetails.taskDescription}
            onChange={(e) => setTaskdetails({...taskdetails, taskDescription: e.target.value})}
            className="block py-2.5 px-0 w-full text-md text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder="Description"
            required
          />
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 disabled:cursor-not-allowed hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center">
          Update Task
        </button>
      </form>
    </div>
  </div>
  );
};

export default ViewSingleTask;