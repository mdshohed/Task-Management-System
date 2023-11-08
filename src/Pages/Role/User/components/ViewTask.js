import React, { useEffect, useState } from 'react';
import useTask from '../../../../hooks/useTask';
import axios from 'axios';
import swal from 'sweetalert';
import { Link, useNavigate } from 'react-router-dom';

const ViewAllTask = () => {
  const navigate = useNavigate();
  const [task, setTask] = useState([]);

  useEffect(()=>{
  axios.get('http://localhost:5000/api/task').then((response) => {
    setTask(response.data);
  });
  },[task])

  const handleOrderDelete = id =>{
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this task!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((flag) => {
      if (flag) {
          const url = `http://localhost:5000/api/task/${id}`;
          axios.delete(url)
          .then(data=>{  
            const remaining = task.filter(item=>item._id !== id);
            swal('Successfully deleted'); 
            setTask(remaining); 
        })
      }else{}
    });
  }

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
          {/* <tbody> */}
            {task.map((task,index)=>( 
              <tbody className='m-4'>
                <tr className='bg-white-800  p-5 rounded-md shadow'>
                  <td className='text-sm text-gray-700 p-3'>{index+1}</td>
                  <td className='p-3'>{task.taskName}</td>
                  <td>{task.taskDescription}</td>
                  <Link to={`/task/view-task/${task._id}`} type='button' className='mt-2 text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-1.5 py-1.5 text-center mr-2 mb-2'>Update</Link>
                  <button onClick={()=>handleOrderDelete(task._id)} type='button' className='mt-2 text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-1.5 py-1.5 text-center mr-2 mb-2'>Delete</button>
                </tr>
                </tbody>
              ))
            }
          {/* </tbody> */}
        </table>
      </div>
    </div>
  );
};

export default ViewAllTask;