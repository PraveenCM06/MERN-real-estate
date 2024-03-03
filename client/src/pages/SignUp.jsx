import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
function SignUp() {
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
      const res = await fetch ('/api/auth/signup', config );
      const data = await res.json();
      if(data.success === false){
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate('/signin')
    } catch (error) {
      setLoading(false);
      console.log(data);
      setError(error.message);
    }
   
  };
  return (
    <div className='px-7 max-w-lg mx-auto'>
      <h1 className='font-mono text-3xl text-center font-semibold my-7'>SIGN UP</h1>
    <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
      <input 
        type="text" 
        placeholder='Username'
        className='border p-3 rounded-lg'
        id='username'
          onChange={handleChange}
      />
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
      >{loading? 'loading..' : 'Sign Up'}</button>
      <button
        className='bg-red-700 text-white p-3 rounded-lg hover:opacity-90 hover:-translate-y-0.5 transition-all disabled:opacity-50'
      >Continue with Google</button>
    </form>
      <div className='flex gap-2 mt-5'>
        <p>Have an account? </p>
        <Link to='/signin' className='text-blue-600'> Sign in</Link>
      </div>
      {error&& <p className='text-red-500'>{error}</p>}
    </div>
  )
}

export default SignUp