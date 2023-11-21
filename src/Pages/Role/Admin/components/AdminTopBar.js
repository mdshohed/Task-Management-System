import React, { Fragment } from 'react';
import {Bars3CenterLeftIcon,ChevronDownIcon,Cog8ToothIcon,} from "@heroicons/react/24/solid";
import { Menu, Transition, Popover } from "@headlessui/react";
import { Link, useNavigate } from 'react-router-dom';


const AdminTopBar = ({ showNav, setShowNav }) => {
  const navigate = useNavigate();
  const logOut = () => {
    localStorage.clear();
    navigate('/login');
  }
  return (
    <div className={`bg-[#85C206] fixed w-full h-16 flex justify-between items-center transition-all duration-[400ms]  ${showNav ? "pl-56" : ""}`}>
      <div className="pl-4 ">
        <Bars3CenterLeftIcon
          className="h-8 w-8 text-gray-700 cursor-pointer"
          onClick={() => setShowNav(!showNav)}
        />
      </div>
      <div className='flex items-center pr-4 md:pr-16'>
        <Popover className='relative' >
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform scale-95"
            enterTo="transform scale-100"
            leave="transition ease-in duration=75"
            leaveFrom="transform scale-100"
            leaveTo="transform scale-95">
          </Transition>
        </Popover>
        <Menu as="div" className="relative inline-block text-left ">
          <div>
            <Menu.Button className='inline-flex w-full justify-center items-center '>
              <span className=' font-medium text-gray-700'>Admin</span>
              <ChevronDownIcon className='ml-2 h-4 w-4 text-gray-700' />
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform scale-95"
            enterTo="transform scale-100"
            leave="transition ease-in duration=75"
            leaveFrom="transform scale-100"
            leaveTo="transform scale-95">

            <Menu.Items className="absolute right-0 w-56 z-50 mt-2 origin-top-right bg-white rounded shadow-sm">
              <div className="p-1">
                <Menu.Item>
                  <Link to="/login" onClick={logOut} className="flex hover:bg-[#85C206] hover:text-white text-gray-700 rounded p-2 text-sm group transition-colors items-center">
                    <Cog8ToothIcon className="h-4 w-4 mr-2" />Logout
                  </Link>
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  );
};

export default AdminTopBar;