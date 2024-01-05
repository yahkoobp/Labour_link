'use client'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import WorkIcon from '@mui/icons-material/Work';
import PlaceIcon from '@mui/icons-material/Place';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../../../firebaseConfig';

const ApplyForm = () => {
  const pathname = usePathname()
  const j_id = pathname.split('/')[2]
  const [jobDetails , setJobDetails] = useState({})
  const router = useRouter()
  useEffect(()=>{
    console.log("useeffect 1 is running....")
    const fetchData = async()=>{
      try {
        const jobdocRef = doc(db, "jobs", j_id);
       const jobdocSnap = await getDoc(jobdocRef);
  
      if (jobdocSnap.exists()) {
        setJobDetails(jobdocSnap.data())
      } else {
        console.log("No such document!");
      }
        
      } catch (error) {
        console.log(error)
      }
    }
      fetchData()
  },[])
  return (
    <div className='flex flex-col relative h-[100vh]'>
        <div className='h-[55px] shadow-md p-3 sticky top-0 bg-white'>
            <CloseIcon onClick={(e)=>{
                router.back()
                // e.preventDefault()
            }} sx={{color:'gray',cursor:"pointer"}}/>
        </div>
        <div className='flex flex-col gap-3 mt-4 p-5 shadow-sm'>
        <div className='flex gap-2'>
                <WorkIcon sx={{color:"teal"}}/>
            <h1 className='font-heading text-lg'>{jobDetails.job_title}</h1>
            </div>
          <div className='flex items-center gap-2'>
            <PlaceIcon sx={{color:"green"}}/>
            <p className='font-semibold text-[14px]'>{jobDetails.job_location}</p>
        </div>
        <div className='flex gap-2'>
            <div className='bg-green-100 w-[150px] px-2 py-1 rounded-md'>
               <h3 className='text-green-800 font-bold text-[12px]'>Rs {jobDetails.daily_wage} / day</h3>
            </div>
            <div className='bg-gray-200 w-[150px] px-2 py-1 rounded-md'>
               <h3 className='text-green-800 font-bold text-[12px]'>{jobDetails.work_time} time</h3>
            </div>
            </div>
        <div className='flex gap-2 justify-between items-center'>
                <p className='fonr-bold text-gray-500 text-[13px]'>Posted on {jobDetails.time_stamp}</p>
                <p className='font-bold text-[12px] text-green-900'>Active now</p>
            </div>
    </div>

     <div className='absolute bottom-0 left-0 w-full h-[50px] bg-blue-800 flex items-center justify-end px-4'>
         <button className='bg-white px-6 py-2 rounded-full font-bold'>Apply</button>
     </div>
    </div>
  )
}

export default ApplyForm