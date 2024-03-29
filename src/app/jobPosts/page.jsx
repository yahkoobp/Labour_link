'use client'
import React, { useEffect, useState } from 'react'
import WorkIcon from '@mui/icons-material/Work';
import CloseIcon from '@mui/icons-material/Close';
import PlaceIcon from '@mui/icons-material/Place';
import QuickreplyIcon from '@mui/icons-material/Quickreply';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import Link from 'next/link';
import { useUserAuthContext } from '../context/userAuthContext';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';
import { useRouter } from 'next/navigation';
import { useJobPosts } from '@/hooks/useJobPosts';



const JobPosts = () => {
  const {user} = useUserAuthContext()
  const router = useRouter()
  const {data:jobPosts} = useJobPosts(user?.uid)
  console.log(jobPosts)
  return (
     <>
    <div className='h-[50px] shadow-md p-3 sticky top-0 bg-white'>
            <CloseIcon onClick={(e)=>{
                router.back()
                // e.preventDefault()
            }} sx={{color:'gray',cursor:"pointer"}}/>
        </div>
    <div className='p-6'>
      <h1 className='font-semibold text-[15px]'>Your job posts({jobPosts?.length})</h1>
       
      <div  className='flex flex-col bg-gray-50 rounded-md md:grid md:grid-cols-3 mt-3 gap-4'>
        {
        jobPosts?.map((job)=>(
      <Link key={job.id} href={`/jobPosts/${job.id}`}>
        <div className='flex flex-col shadow-md  rounded-md p-6 gap-3 border border-gray-100 hover:border hover:border-blue-900'>
          <div className='flex items-center justify-between'>
            <div className='flex gap-2'>
                <WorkIcon sx={{color:"teal",width:20,height:20}}/>
            <h1 className='font-semibold text-[15px] '>{job.job_title}</h1>
            </div>
            <div className='flex justify-end'>
            <EditOutlinedIcon sx={{color:"darkBlue"}}/>
          </div>
            </div>
            <div className='flex gap-2'>
                <PlaceIcon sx={{color:"teal",width:20,height:20}}/>
            <h2 className='font-semibold text-sm text-gray-500'>{job.job_location}</h2>
            </div>

           <div className='flex gap-2'>
            <div className='bg-green-100 w-[150px] px-2 py-1 rounded-md'>
               <h3 className='text-green-800 font-bold text-[12px]'>Rs {job.daily_wage} / day</h3>
            </div>
            <div className='bg-gray-200 w-[150px] px-2 py-1 rounded-md'>
               <h3 className='text-green-800 font-bold text-[12px]'>{job.work_time} time</h3>
            </div>
            </div>

            <div className='flex gap-2 justify-between items-center'>
                <p className='font-semibold text-blue-900 text-[13px]'>Posted on {job.time_stamp}</p>
                <p className='font-bold text-[12px] text-green-900'>Active now</p>
            </div>
            <div className='flex gap-2 justify-start items-center'>
                <QuickreplyIcon sx={{width:"20px",color:"teal"}}/>
                <p className='font-bold text-[12px] text-green-900'>{job.responses.length} Responses</p>
            </div>

        </div>
        </Link>
))}
  </div>
    </div>
    </>
  )
}

export default JobPosts