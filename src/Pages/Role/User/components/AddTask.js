import axios from 'axios';
import React, { useEffect, useState } from 'react';
import swal from 'sweetalert';
import useTaskInfo from '../../../../hooks/useTaskInfo';

const AddTask = () => {
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [task] = useTaskInfo()

  async function handleSubmit(e) {
    e.preventDefault();
    if (taskName && taskDescription) {
      await axios.post("https://task-manager-server-n5ozh8y4l-mdshohed.vercel.app/api/task",{
        taskName, taskDescription
      })
      .then(res=>{
        if(res.data.status==="ok"){
          swal("Added Task");
          e.target.reset(); 
        }
      })
      .catch(e=>{
        swal("Server Error", e);  
      })
    }
  }

  return (
   <>
    <div className="md:flex justify-center items-center mt-10">
      <div className="mx-auto md:flex mb-20 justify-between items-center animate-zoomIn  bg-white px-20 py-6 rounded-lg shadow-2xl">
        <form onSubmit={handleSubmit} className="w-96 mx-auto"> 
          <h2 className="mb-6 mt-4 text-3xl font-bold text-center ">Add Task</h2>

            <div className="relative z-0 mb-6 w-full group">
              <input
                type="text"
                placeholder="Task Name"
                id='taskName'
                onChange={(e) => setTaskName(e.target.value)}
                className="block  px-0 w-full text-md text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                required
              />
            </div>

          <div className="relative z-0 mb-6 w-full group">
            <textarea 
              type="text"
              rows="3" cols="40"
              name="course-title"
              id="task_description"
              onChange={(e) => setTaskDescription(e.target.value)}
              className="block py-2.5 px-0 w-full text-md text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder="Description"
              required
            />
          </div>
          <button
            type="submit"
            className="text-white bg-blue-700 disabled:cursor-not-allowed hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center">
            Add Task
          </button>
        </form>
      </div>
    </div>

    <div className='ml-20 mr-20 mb-20'>
      <div class="bg-gray-100 ">
        <table class=" text-left left w-full ">
          <thead className='text-left bg-gray-50 border-b-2 border-gray-200 '>
            <tr >
              <th>#</th>
              <th>Task Name</th>
              <th>Task Description</th>
            </tr>
          </thead>
          {/* <tbody> */}
            {task.map((task,index)=>( 
              <tbody className='m-4'>
                <tr className='bg-white-800  p-5 rounded-md shadow'>
                  <td className='text-sm text-gray-700 p-3'>{index+1}</td>
                  <td className=' p-3'>{task.taskName}</td>
                  <td>{task.taskDescription}</td>
                </tr>
                </tbody>
              ))
            }
          {/* </tbody> */}
        </table>
      </div>
    </div>
    </>
  );
};

export default AddTask;