import React from 'react';
import { forwardRef } from 'react';
import { useLocation } from 'react-router';
import { HomeIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';
import {AiOutlineFileAdd} from "react-icons/ai";
import {MdOutlineAssignmentInd} from "react-icons/md";

const AdminSideBar = forwardRef(({ showNav }, ref) => {
  const router = useLocation();
    return (
      <div ref={ref} className="bg-[#2D323E] fixed w-56 h-full shadow-lg border-r-1 border-gray-200">
         <div className='flex justify-center mt-6 mb-14'>
            <h1 className='text-white text-lg'>Task Management</h1>
        </div>

        <div className='flex flex-col'>
          <Link to='/adminTask'>
            <div className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors
            ${router.pathname === ""
                ? 'bg-[#85C206] text-white '
                : 'text-white hover:bg-[#85C206] hover:text-white'}`}>
              <div className='mr-2'>
                <HomeIcon className='w-5 h-5' />
              </div>
              <p>Home</p>
            </div>
          </Link>
          <Link to='/adminTask/view-task'>
            <div className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors
            ${router.pathname === ""
                ? 'bg-[#85C206] text-white'
                : 'text-white hover:bg-[#85C206] hover:text-white'}`}>
              <div className='mr-2'>
                <MdOutlineAssignmentInd className='w-5 h-5' />
              </div>
                <p>All Task</p>
            </div>
          </Link>
          <Link to='/adminTask/add-task'>
            <div className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors
            ${router.pathname === ""
                ? 'bg-[#85C206] text-white '
                : 'text-white hover:bg-[#85C206] hover:text-white'}`}>
              <div className='mr-2'>
                <AiOutlineFileAdd className='w-5 h-5' />
              </div>
              <p>Add Task</p>
            </div>
          </Link>
        </div>
      </div>
    );
});

export default AdminSideBar;