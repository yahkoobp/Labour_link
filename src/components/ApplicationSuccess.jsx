import Link from 'next/link'
import React from 'react'

const ApplicationSuccess = () => {
  return (
    <div className='flex h-[100vh] items-center justify-center relative p-3'>
      <h1 className='font-bold text-center'>Your application has been successfully submitted</h1>
      <div className='absolute bottom-0 left-0 w-full h-[50px] bg-blue-800 flex items-center justify-end px-4'>
           <Link href='/home'> <button type='submit' className='bg-white px-6 py-2 rounded-full font-bold'>Go to home</button> </Link>
           </div>
      </div>
  )
}

export default ApplicationSuccess