'use client'
import React, { useEffect, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import WorkIcon from '@mui/icons-material/Work';
import PlaceIcon from '@mui/icons-material/Place';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../../firebaseConfig';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useUserAuthContext } from '@/app/context/userAuthContext';
import { useJobView } from '@/hooks/useJobView';
import { useSinglePeoples } from '@/hooks/useSinglePeople';

const JobView = () => {
    const {user} = useUserAuthContext()
    const pathname = usePathname()
    const [isApplied,setIsApplied] = useState(false)
    const router = useRouter()
    const job_id = pathname.split("/")[2]

      const {data:jobDetails} = useJobView(job_id)
      const job_poster_id = jobDetails?.job_poster
      const {data:jobPoster} = useSinglePeoples(job_poster_id)

      useEffect(()=>{
        if(jobDetails){
        if(jobDetails?.responses.includes(user.uid)){
          setIsApplied(true)
         }
      }},[jobDetails])
      

  return (
    <div className='flex flex-col relative'>
        <div className='h-[55px] shadow-md p-3 sticky top-0 bg-white'>
            <CloseIcon onClick={(e)=>{
                router.back()
                // e.preventDefault()
            }} sx={{color:'gray',cursor:"pointer"}}/>
        </div>
        <div className='flex flex-col gap-3 mt-4 p-5 shadow-sm'>
        <div className='flex gap-2'>
                <WorkIcon sx={{color:"teal"}}/>
            <h1 className='font-heading text-lg'>{jobDetails?.job_title}</h1>
            </div>
          <div className='flex items-center gap-2'>
            <PlaceIcon sx={{color:"green"}}/>
            <i className='font-semibold text-[14px]'>{jobDetails?.job_location}</i>
        </div>
        <div className='flex gap-2'>
            <div className='bg-green-100 w-[150px] px-2 py-1 rounded-md'>
               <h3 className='text-green-800 font-bold text-[12px]'>Rs {jobDetails?.daily_wage} / day</h3>
            </div>
            <div className='bg-gray-200 w-[150px] px-2 py-1 rounded-md'>
               <h3 className='text-green-800 font-bold text-[12px]'>{jobDetails?.work_time} time</h3>
            </div>
            </div>
        <div className='flex gap-2 justify-between items-center'>
                <p className='fonr-bold text-gray-500 text-[13px]'>Posted on {jobDetails?.time_stamp}</p>
                <p className='font-bold text-[12px] text-green-900'>Active now</p>
            </div>
    </div>

    <div className='px-5 py-3'>
        <div className='flex flex-col'>
       <p className='font-semibold'>About Labourer</p>
       <div className='flex items-center justify-start gap-4 mt-3'>
       <div className=' w-[60px] h-[60px] rounded-full'>
            <img src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=740&t=st=1701156585~exp=1701157185~hmac=ac68d03b1add36a89081d098324072530d782a1bd6a57a0eebb5ff7e6ae9cea8" className='w-full h-full rounded-full object-cover' alt="" />
        </div>
       <div className='mt-1 px-3'>
            <h1 className='font-semibold text-sm'>{jobPoster?.firstname} {jobPoster?.lastname}</h1>
            <div className='text-sm font-semibold text-gray-500'>
            <p>{jobPoster?.address}</p>
            <p>Mob :{jobPoster?.phonenumber}</p>
            </div>
        </div>
        </div>
        <div className='flex gap-6'>
        <button className=' mt-6 rounded-full py-1 px-6 items-center justify-center cursor-pointer bg-teal-600 font-semibold text-white hover:bg-teal-500'>
              View Profile
            </button>

            <button className=' mt-6 rounded-full py-1 px-6 items-center justify-center cursor-pointer  bg-teal-600 font-semibold text-white hover:bg-teal-500'>
              Message
            </button>
            
       </div>
    </div>
    </div>
    <div className='px-5 py-3 shadow-sm'>
        <div className='flex flex-col'>
       <p className='font-semibold'>About the job</p>
       <p className='font-semibold text-[13px] px-3 mt-1'>{jobDetails?.description}</p>
    </div>
    </div>

    <div className='w-full h-[4px] bg-gray-200 shadow-md'></div>
    <div className='px-5 py-3 shadow-sm'>
        <div className='flex flex-col'>
       <p className='font-semibold'>More related jobs</p>
       </div>
       <div className='flex flex-col gap-1 px-3 py-2 shadow-sm'>
        <div className='flex gap-2'>
                <WorkIcon sx={{color:"teal"}}/>
            <h1 className='text-md'>Carpenter</h1>
            </div>
          <div className='flex items-center gap-2'>
            <PlaceIcon sx={{color:"green"}}/>
            <i className='font-semibold text-[14px]'>Perinthalmanna</i>
        </div>
        <div className='flex gap-2 justify-between items-center'>
                <p className='fonr-semibold text-gray-500 text-[14px]'>Posted on 10/10/2023</p>
                <p className='font-bold text-[12px] text-green-900'>Active now</p>
            </div>
    </div>

    <div className='flex flex-col gap-1 px-3 py-2 shadow-sm'>
        <div className='flex gap-2'>
                <WorkIcon sx={{color:"teal"}}/>
            <h1 className='text-md'>Carpenter</h1>
            </div>
          <div className='flex items-center gap-2'>
            <PlaceIcon sx={{color:"green"}}/>
            <i className='font-semibold text-[14px]'>Perinthalmanna</i>
        </div>
        <div className='flex gap-2 justify-between items-center'>
                <p className='fonr-semibold text-gray-500 text-[14px]'>Posted on 10/10/2023</p>
                <p className='font-bold text-[12px] text-green-900'>Active now</p>
            </div>
    </div>

    <div className='flex flex-col gap-1 px-3 py-2 shadow-sm'>
        <div className='flex gap-2'>
                <WorkIcon sx={{color:"teal"}}/>
            <h1 className='text-md'>Carpenter</h1>
            </div>
          <div className='flex items-center gap-2'>
            <PlaceIcon sx={{color:"green"}}/>
            <i className='font-semibold text-[14px]'>Perinthalmanna</i>
        </div>
        <div className='flex gap-2 justify-between items-center'>
                <p className='fonr-semibold text-gray-500 text-[14px]'>Posted on 10/10/2023</p>
                <p className='font-bold text-[12px] text-green-900'>Active now</p>
            </div>
    </div>
       
    </div>
    <div className='px-5 flex items-start justify-center gap-2 sticky bottom-0 left-0 mt-2 w-full'>
      {isApplied?<div className='flex items-center justify-center px-4 py-3 bg-green-700 text-white font-semibold rounded-md w-full'>You are already applied for this work</div>
        :<Link className='w-full' href={`${pathname}/apply-form`}><button id='int-btn' className='px-4 py-3 bg-blue-400 text-white font-semibold rounded-md w-full'>Show interest</button></Link>
     }
    </div>
    </div>
  )
}

export default JobView