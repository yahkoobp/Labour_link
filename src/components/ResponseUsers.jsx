'use client'
import React from 'react'

const ResponseUsers = (props) => {
    const user = props?.user
  return (
       <div className='flex items-center justify-between gap-4 border-b border-b-gray-200 py-3'>
        <div className='flex items-center justify-between gap-4'>
       <div className=' w-[50px] h-[50px] rounded-full'>
            <img src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=740&t=st=1701156585~exp=1701157185~hmac=ac68d03b1add36a89081d098324072530d782a1bd6a57a0eebb5ff7e6ae9cea8" className='w-full h-full rounded-full object-cover' alt="" />
        </div>
       <div className='mt-1 px-3'>
            <h1 className='font-semibold text-md'>{user?.firstname}</h1>
            <div className='text-[12px] font-semibold'>
            <p>{user?.email}</p>
            <p>{user?.phonenumber}</p>
            </div>
        </div>
        </div>
        <div className='flex flex-col gap-4'>
          <button className='bg-teal-600 text-white px-6 py-1 rounded-md'>Hire</button>
        </div>
        </div>
  )
}

export default ResponseUsers