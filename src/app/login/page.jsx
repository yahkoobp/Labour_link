"use client"
import React, { useState } from 'react'
import { useUserAuthContext } from '../context/userAuthContext'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

function LoginPage() {
  const [email , setEmail] = useState("")
  const [password , setPassword] = useState("")
  const [error , setError] = useState("")
  const {login} = useUserAuthContext()
  const [loading , setLoading] = useState(false)
  const route = useRouter()
  const handleSubmit = async (e)=>{

    e.preventDefault()
    setError("")
    try {
      setLoading(true)
      await login(email,password)
      setLoading(false)
      
      route.replace("/home")
    } catch (error) {
      setError(error.message)
      setLoading(false)
    }

  }

  return (
    <div>
    <div className="flex flex-col items-center w-full px-1 mt-1 h-screen">
        <div className='py-2'>
           <div className='w-full'>
              <h2 className='font-semibold text-2xl text-gray-900 text-center my-4'>Log in</h2>
              {error && <span className='text-red-700 text-sm'>{error}</span>}
              <form className='flex flex-col gap-6 mt-8' action="" onSubmit={handleSubmit}>
              <div className='flex flex-col gap-2'>
                  <label className='font-semibold' htmlFor="email">Enter your email</label>
                <input className='py-2 px-4 rounded-md bg-gray-100 focus:outline-none focus:border focus:border-gray-200' type="email" name="email" id="" placeholder='Email' required
                onChange={(e)=>{
                   setEmail(e.target.value)
                }}/>
                </div>
                <div className='flex flex-col gap-2'>
                <label className='font-semibold' htmlFor="email">Password</label>
                <input  className='py-2 px-4 rounded-md w-full bg-gray-100 focus:outline-none focus:border focus:border-gray-200'type="password" name="password" id="" placeholder='password' required
                 onChange={(e)=>{
                  setPassword(e.target.value)
                  
               }}/>
               </div>
               
               <button type='submit' className='bg-gray-900 rounded-full text-white py-2 hover:scale-105 duration-300 w-full'>{loading?"Loging...":"Login"}</button>
              </form>

              <div className='mt-10 text-gray-500 grid grid-cols-3 items-center'>
                <hr className='border-gray-400'/>
                <p className="text-center text-[12px]">continue with</p>
                <hr className='border-gray-400'/>
              </div>

             <div className='flex gap-4 items-center justify-center mt-6'>
         <div className=' bg-gray-100 px-12 py-2 rounded-full'>
         <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 48 48">
<path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
</svg>
         </div>
         <div className='bg-gray-100 px-12 py-2 rounded-full'>
         <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 48 48">
<linearGradient id="Ld6sqrtcxMyckEl6xeDdMa_uLWV5A9vXIPu_gr1" x1="9.993" x2="40.615" y1="9.993" y2="40.615" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#2aa4f4"></stop><stop offset="1" stop-color="#007ad9"></stop></linearGradient><path fill="url(#Ld6sqrtcxMyckEl6xeDdMa_uLWV5A9vXIPu_gr1)" d="M24,4C12.954,4,4,12.954,4,24s8.954,20,20,20s20-8.954,20-20S35.046,4,24,4z"></path><path fill="#fff" d="M26.707,29.301h5.176l0.813-5.258h-5.989v-2.874c0-2.184,0.714-4.121,2.757-4.121h3.283V12.46 c-0.577-0.078-1.797-0.248-4.102-0.248c-4.814,0-7.636,2.542-7.636,8.334v3.498H16.06v5.258h4.948v14.452 C21.988,43.9,22.981,44,24,44c0.921,0,1.82-0.084,2.707-0.204V29.301z"></path>
</svg>
         </div> 
      </div>
        <div className='mt-5 text-xs border-b py-4 border-gray-300 font-semibold'>Forgot your password?</div>
           <div className='text-sm flex gap-2 justify-between items-center mt-3'>
            <p>If you dont have an account  </p>
            <Link href='/register'><button className='py-2 px-5 bg-white border rounded-md hover:scale-105 duration-300 hover:bg-[#002D74] hover:text-white '>Register</button></Link>
           </div>
           </div>
        </div>
    </div>
    </div>
  )
}

export default LoginPage 