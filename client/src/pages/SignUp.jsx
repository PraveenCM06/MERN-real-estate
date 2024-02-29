import React from 'react'
import {Link} from 'react-router-dom'
function SignUp() {
  return (
    <div className='px-7 max-w-lg mx-auto'>
      <h1 className='font-mono text-3xl text-center font-semibold my-7'>SIGN UP</h1>
    <form className='flex flex-col gap-4'>
      <input 
        type="text" 
        placeholder='Username'
        className='border p-3 rounded-lg'
        id='username'
      />
      <input 
        type="email" 
        placeholder='Email'
        className='border p-3 rounded-lg'
        id='email'
      />
      <input 
        type="password" 
        placeholder='Password'
        className='border p-3 rounded-lg'
        id='password'
      />
      <button
        className='bg-slate-700 text-white p-3 rounded-lg hover:opacity-90 hover:-translate-y-0.5 transition-all disabled:opacity-50'
      >SIGN UP</button>
      <button
        className='bg-red-700 text-white p-3 rounded-lg hover:opacity-90 hover:-translate-y-0.5 transition-all disabled:opacity-50'
      >Continue with Google</button>
    </form>
      <div className='flex gap-2 mt-5'>
        <p>Have an account? </p>
        <Link to='/signin' className='text-blue-600'> Sign in</Link>
      </div>
    </div>
  )
}

export default SignUp