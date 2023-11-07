import React from "react";
import { Routes, Route } from "react-router-dom";
import Register from "./Pages/Login/Register";
import Login from "./Pages/Login/Login";
import NotFound from "./Pages/Shared/NotFound";
import UserLayout from "./Pages/Role/User/Layout/UserLayout";
import ProtectedUser from "./Pages/ProtectedRouter/ProtectedUser";

function App() {
  const signIn = localStorage.getItem("role");
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Register></Register>}/>
        <Route path="/task" element={<ProtectedUser signIn={signIn}><UserLayout></UserLayout></ProtectedUser>}></Route>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </div>
  );
}

export default App;
