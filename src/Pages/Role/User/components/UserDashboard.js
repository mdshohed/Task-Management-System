import React, { useContext, useEffect, useState } from 'react';
import useTaskInfo from '../../../../hooks/useTaskInfo';
import UserContext from '../../../../context/UserContext';

const UserDashboard = () => {
  const [task, DeleteTask] = useTaskInfo(); 

  return (
    <>
      <div className="flex items-center mt-10">
          <div className="mx-auto justify-between items-center animate-zoomIn  bg-white px-20 py-5 rounded-lg shadow-2xl">
            <div><h2 className="mb-2 mt-4 text-3xl font-bold text-center ">Total Task</h2></div><br/>
            <div><h1 className="mb-6 text-3xl font-bold text-center ">{task?.length}</h1></div>
          </div>
      </div>
    </>
  );
};

export default UserDashboard;