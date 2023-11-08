import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Register from "./Pages/Login/Register";
import Login from "./Pages/Login/Login";
import NotFound from "./Pages/Shared/NotFound";
import UserLayout  from "./Pages/Role/User/Layout/UserLayout";
import ProtectedUser from "./Pages/ProtectedRouter/ProtectedUser";
import AddTask from "./Pages/Role/User/components/AddTask";
import { UserContext } from "./hooks/ReactHook";
import ViewTask from "./Pages/Role/User/components/ViewTask";
import ViewSingleTask from "./Pages/Role/User/components/ViewSingleTask";
import UserDashboard from "./Pages/Role/User/components/UserDashboard";

function App() {
  const signIn = useContext(UserContext);
  
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path='/signup' element={<Register></Register>}/>
        {/* <Route path='/task' element={<ProtectedUser signIn={signIn}><UserLayout><AddTask></AddTask></UserLayout></ProtectedUser>}></Route> */}
        <Route path="/task" element={<UserLayout><UserDashboard></UserDashboard></UserLayout>}></Route>
        <Route path="/task/add-task" element={<UserLayout><AddTask></AddTask></UserLayout>}></Route>
        <Route path="/task/view-task" element={<UserLayout><ViewTask></ViewTask></UserLayout>}></Route>
        <Route path="/task/view-task/:id" element={<UserLayout><ViewSingleTask></ViewSingleTask></UserLayout>}></Route>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </div>
  );
}

export default App;
