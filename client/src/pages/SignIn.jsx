import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
function SignIn() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
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
      setLoading(true);
      const config = {
        method : "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(formData)
      }
      const res = await fetch ('/api/auth/signin', config );
      const data = await res.json();
      if(data.success === false){
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate('/')
      alert("Sign in Successful")
    } catch (error) {
      setLoading(false);
      console.log(data);
      setError(error.message);
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