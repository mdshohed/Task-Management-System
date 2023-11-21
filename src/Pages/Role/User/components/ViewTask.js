import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useTaskInfo from '../../../../hooks/useTaskInfo';
import UserContext from '../../../../context/UserContext';

const ViewAllTask = () => {
  const [task, setTask] = useTaskInfo();
  const {DeleteTask} = useContext(UserContext);
  console.log(task, "viewPage");

  const handleTaskDelete = (id) => {
    DeleteTask(id)
  };

  return (
    <div className='mx-10 my-20'>
      <div class="bg-gray-100 ">
        <table class=" text-left left w-full ">
          <thead className='text-left bg-gray-50 border-b-2 border-gray-200 '>
            <tr >
              <th>#</th>
              <th>Task Name</th>
              <th>Task Description</th>
              <th>Action</th>
            </tr>
          </thead>
            {task.map((val,index)=>( 
              <tbody className='m-4'>
                <tr className='bg-white-800  p-5 rounded-md shadow'>
                  <td className='text-sm text-gray-700 p-3'>{index+1}</td>
                  <td className='p-3'>{val.taskName}</td>
                  <td>{val.taskDescription}</td>
                  <Link to={`/userTask/view-task/${val._id}`} type='button' className='mt-2 text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-1.5 py-1.5 text-center mr-2 mb-2'>Update</Link>
                  <button onClick={()=>handleTaskDelete(val._id)} type='button' className='mt-2 text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-1.5 py-1.5 text-center mr-2 mb-2'>Delete</button>
                </tr>
                </tbody>
              ))
            }
        </table>
      </div>
    </div>
  );
};

export default ViewAllTask;