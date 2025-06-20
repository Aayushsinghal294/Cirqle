import React, { useContext, useState } from 'react'
import assets from '../assets/assets'
import { AuthContext } from '../../context/AuthContext'

const Login = () => {
  const [currState, setCurrState] = useState('SignUp')
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [bio, setBio] = useState('')
  const [isDataSubmitted, setIsDataSubmitted] = useState(false);


const {login} = useContext(AuthContext);


  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (currState === 'SignUp' && !isDataSubmitted) {
     setIsDataSubmitted(true);
     return;
    } 
    login(currState==="SignUp" ? "signup" : "login", {
      fullName,
      email,
      password,
      bio
    });
  }


  return (
    <div className='min-h-screen bg-cover bg-center flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl'>
<img src={assets.logocq} alt="" className='w-[min(30vw,250px)]'/>
<form onSubmit={onSubmitHandler} className='border-2 bg-white/7 text-white border-gray-500 p-6 flex flex-col gap-6 rounded-lg shadow-lg'>
  <h2 className='font-medium text-2xl flex justify-between items-center'>
    {currState}
    {isDataSubmitted && currState === 'SignUp' && (
      <img onClick={() => setIsDataSubmitted(false)} src={assets.arrow_icon} alt="" className='w-5 cursor-pointer' />
    )}
  </h2>

  {!isDataSubmitted && (
    <>
      {currState === 'SignUp' && (
        <input onChange={(e) => setFullName(e.target.value)} value={fullName}
          type="text" placeholder='Full Name'
          className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500' required />
      )}

      <input onChange={(e) => setEmail(e.target.value)} value={email}
        type="email" placeholder='Email Address' required
        className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500' />

      <input onChange={(e) => setPassword(e.target.value)} value={password}
        type="password" placeholder='Password' required
        className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500' />
    </>
  )}


  {currState === 'SignUp' && isDataSubmitted && (
    <textarea onChange={(e) => setBio(e.target.value)} value={bio}
      rows={4} placeholder='Provide a short bio...'
      className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500' required></textarea>
  )}

  
<button type='submit' className='py-3 bg-gradient-to-r from-purple-400 to-violet-600 text-white rounded-md cursor-pointer '>
    {currState === 'SignUp'
      ? isDataSubmitted ? "Create Account" : "Create Account"
      : 'Login Now'}
  </button> 

  <div className='flex items-center gap-2 text-sm text-gray-500'>
    <input type="checkbox" />
    <p>Agree to the terms of use & privacy policy.</p>
  </div>

  <div className='flex flex-col gap-2'>
    {currState === 'SignUp' ? (
      <p className='text-sm text-gray-600'>Already have an account?
        <span onClick={() => { setCurrState('Login'); setIsDataSubmitted(false) }} className='font-medium text-violet-500 cursor-pointer'> Login</span>
      </p>
    ) : (
      <p className='text-sm text-gray-600'>Don't have an account?
        <span onClick={() => setCurrState('SignUp')} className='font-medium text-violet-500 cursor-pointer'> Sign Up</span>
      </p>
    )}
  </div>
</form>

    </div>
  )
}

export default Login
