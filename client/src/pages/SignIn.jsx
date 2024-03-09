import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {signInStart, signInSuccess, signInFailure} from '../redux/user/userSlice.js';
function SignIn() {
  const [formData, setFormData] = useState({});
  const {loading, error}= useSelector((state)=>state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e)=>{
    setFormData({
      ...formData,
      [e.target.id]:e.target.value,
    })
    console.log(formData);
  };
  const handleSubmit= async (e)=>{
    e.preventDefault();
    try {
      dispatch(signInStart);
      const config = {
        method : "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(formData)
      }
      const res = await fetch ('/api/auth/signin', config );
      const data = await res.json();
      if(data.success === false){
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate('/')
      alert("Sign in Successful")
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
   
  };
  return (
    <div className='px-7 max-w-lg mx-auto'>
      <h1 className='font-mono text-3xl text-center font-semibold my-7'>SIGN IN</h1>
    <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
      <input 
        type="email" 
        placeholder='Email'
        className='border p-3 rounded-lg'
        id='email'
        onChange={handleChange}
      />
      <input 
        type="password" 
        placeholder='Password'
        className='border p-3 rounded-lg'
        id='password'
        onChange={handleChange}
      />
      <button
        disabled = {loading}
        className='bg-slate-700 text-white uppercase p-3 rounded-lg hover:opacity-90 hover:-translate-y-0.5 transition-all disabled:opacity-50'
      >{loading? 'loading..' : 'Sign In'}</button>
      <button
        className='bg-red-700 text-white p-3 rounded-lg hover:opacity-90 hover:-translate-y-0.5 transition-all disabled:opacity-50'
      >Continue with Google</button>
    </form>
      <div className='flex gap-2 mt-5'>
        <p>New here? </p>
        <Link to='/signup' className='text-blue-600'> Create Account</Link>
      </div>
      {error&& <p className='text-red-500 font-semibold'>{error}</p>}
    </div>
  )
}

export default SignIn