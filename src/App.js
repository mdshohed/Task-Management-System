import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Register from "./Pages/Login/Register";
import Login from "./Pages/Login/Login";
import NotFound from "./Pages/Shared/NotFound";
import UserLayout  from "./Pages/Role/User/Layout/UserLayout";
import ProtectedUser from "./Pages/ProtectedRouter/ProtectedUser";
import AddTask from "./Pages/Role/User/components/AddTask";
import ViewTask from "./Pages/Role/User/components/ViewTask";
import ViewSingleTask from "./Pages/Role/User/components/ViewSingleTask";
import AdminLayout from "./Pages/Role/Admin/Layout/AdminLayout";
import AdminDashboard from "./Pages/Role/Admin/components/AdminDashboard";
import ProtectedAdmin from "./Pages/ProtectedRouter/ProtectedAdmin";
import UserDashboard from "./Pages/Role/User/components/UserDashboard";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path='/signup' element={<Register></Register>}/>
        <Route path='/userTask' element={<ProtectedUser><UserLayout><UserDashboard></UserDashboard></UserLayout></ProtectedUser>}></Route>
        <Route path="/userTask/add-task" element={<ProtectedUser><UserLayout><AddTask></AddTask></UserLayout></ProtectedUser>}></Route>
        <Route path="/userTask/view-task" element={<ProtectedUser><UserLayout><ViewTask></ViewTask></UserLayout></ProtectedUser>}></Route>
        <Route path="/userTask/view-task/:id" element={<ProtectedUser><UserLayout><ViewSingleTask></ViewSingleTask></UserLayout></ProtectedUser>}></Route>
        <Route path='/adminTask' element={<ProtectedAdmin><AdminLayout><AdminDashboard></AdminDashboard></AdminLayout></ProtectedAdmin>}></Route>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </div>
  );
}

export default App;
