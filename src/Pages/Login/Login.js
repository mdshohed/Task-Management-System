import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import UserContext from '../../context/UserContext';

const Login = () => {
  const { setSignedIn} = useContext(UserContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState('off');
  const[error, setError] = useState('off');

  axios.defaults.withCredentials= true;
  async function handleSubmit(e) { 
    e.preventDefault();
    try{
      await axios.post("https://task-manager-server-n5ozh8y4l-mdshohed.vercel.app/api/users/login",{
        email, password
      })
      .then(res=>{ 
        if(res.data.login===true){
          console.log(res.login, res.data.role);
          if(res.data.user.role==="user"){
            setSignedIn("user");
            localStorage.setItem("role","user");
            navigate("/userTask");
          }
          else if(res.data.user.role==="admin"){
            setSignedIn("admin");
            localStorage.setItem("role","admin");
            navigate("/adminTask");
          }
          else {
            swal("User Not Found"); 
          }
        }
        else{
          swal(res.data.error); 
        }
      }).catch(e=>{
        swal("Server Error"); 
      })
    }
    catch(e){
      console.log(e); 
    } 
  }

  return (
    <div className='flex flex-col items-center mt-[100px]'>
      <div className='w-1/2 bg-[#f5f5f5] flex flex-col p-20  items-center max-w-[600px]'>
        <form onSubmit={handleSubmit} className="w-96 mx-auto">
          <div className='w-full flex flex-col'>
            <div className='w-full flex flex-col mb-2'>
              <h3 className='text-3xl font-semibold mb-2'>Login</h3>
              {/* <p className='text-base mb-2'>Welcome! Please enter yours Details</p> */}
            </div>
            
            <div className='w-full flex flex-col'>
              <input 
              type="email" 
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email" 
              required
              className='w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none' />
            
            <input 
              type="password" 
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password" 
              required
              className='w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none' />
            </div>

            <div className='w-full flex items-center justify-between'>
              <div className='w-full flex items-center'>
                <input 
                type="checkbox" 
                onChange={(e) => setRemember(e.target.value)}
                className="w-4 h-4 mr-2"/>
                <p className='text-sm'>Remember me</p>
              </div>
              <p className='text-sm font-medium whitespace-nowrap cursor-pointer underline underline-offset-2'>Forgot Password ?</p>
            </div>

            <div className='w-full flex flex-col my-4'>
              {error==="off" ? 
              <button  className='w-full text-white my-2 bg-[#060606] rounded-md p-4 text-center flex items-center justify-center'>
                Log in
              </button> :  
              <button className='w-full text-white my-2 bg-[#060606] rounded-md p-4 text-center flex items-center justify-center'>
                Log in
              </button>}
              <button className='w-full text-[#060606] my-1 bg-white border-2 border-black rounded-md p-4 text-center flex items-center justify-center'>
                <Link to="/signup">Register</Link> 
              </button>
            </div>

            <div className='w-full flex items-center justify-center relative py-4'>
              <div className='w-full h-[1px] bg-black'></div>
              <p className='text-lg absolute text-black/80 bg-[#f5f5f5]'>or</p>
            </div>
          </div>
        </form>

        <div className='w-full flex items-center justify-center'>
          <p className='text-sm font-normal text-[#060606'>Don't have a account ? <span className='font-semibold underline underline-offset-2 cursor-pointer'>Sign up for free</span></p>
        </div>
      </div>
    </div>
  );
};

export default Login;