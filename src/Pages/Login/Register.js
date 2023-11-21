import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

const Register = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const[role, setRole] = useState('user');
  // const [error, setError] = useState("");

  async function handleSubmit(e){
    e.preventDefault();
    if (
      userName &&
      email &&
      password &&
      rePassword) {
      if (password !== rePassword ) {
        swal('Password not match');
      } else {
        await axios.post("http://localhost:5000/api/users",{userName,email,password, role})
        .then(res=>{
          console.log(res.data);
          if(res.data.status===false){
            swal(res.data.error); 
          }
          else if(res.data.status===true){
            navigate("/login");
            swal(res.data.success);
            e.target.reset();
          }
        })
        .catch(e=>{
          swal("Server Error"); 
          console.log(e); 
        })
      }
    }
  }

  return (
    <div className='flex flex-col items-center mt-[100px]'>
      <div className='w-1/2 bg-[#f5f5f5] flex flex-col p-20  items-center max-w-[600px]'>
        <form onSubmit={handleSubmit} className="w-96 mx-auto">
          <div className='w-full flex flex-col'>
            <div className='w-full flex flex-col mb-2'>
              <h3 className='text-3xl font-semibold mb-2'>SignUP</h3>
              {/* <p className='text-base mb-2'>Welcome! Please enter yours Details</p> */}
            </div>
            
            <div className='w-full flex flex-col'>
              <input 
                type="text" 
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Full Name" 
                required
                className='w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none' />
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
              <input 
                type="password" 
                onChange={(e) => setRePassword(e.target.value)}
                placeholder="Confirm Password" 
                className='w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none' />
            </div>

            <div className='w-full flex flex-col my-4'>
              <button className='w-full text-white my-2 bg-[#060606] rounded-md p-4 text-center flex items-center justify-center'>
                Register
              </button>
              <button className='w-full text-[#060606] my-1 bg-white border-2 border-black rounded-md p-4 text-center flex items-center justify-center'>
                <Link to="/login">Login</Link> 
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

export default Register;