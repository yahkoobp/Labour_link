'use client'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import WorkIcon from '@mui/icons-material/Work';
import PlaceIcon from '@mui/icons-material/Place';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../../../../firebaseConfig';
import { useUserAuthContext } from '@/app/context/userAuthContext';
import ApplicationSuccess from '@/components/ApplicationSuccess';

const ApplyForm = () => {
  const pathname = usePathname()
  const {user} = useUserAuthContext()
  const j_id = pathname.split('/')[2]
  const [jobDetails , setJobDetails] = useState({})
  const [responses , setResponses] = useState([])
  const [loading , setLoading] = useState(false)
  const [success , setSuccess] = useState(false)
  const [toggler , setToggler] = useState(false)
  const router = useRouter()
  console.log(responses)
  console.log('component is re renderd')
  useEffect(()=>{
    console.log("useeffect 1 is running....")
    const fetchData = async()=>{
      try {
        const jobdocRef = doc(db, "jobs", j_id);
        const jobdocSnap = await getDoc(jobdocRef);
  
      if (jobdocSnap.exists()) {
        setJobDetails(jobdocSnap.data())
        setResponses(jobdocSnap.data().responses)
      } else {
        console.log("No such document!");
      }
        
      } catch (error) {
        console.log(error)
      }
    }
      fetchData()
  },[toggler])

  const handleSubmit = async (e) =>{
    e.preventDefault()
    const data = new FormData(e.target)
    const finalData = Object.fromEntries(data.entries())
    try {
      // setResponses([...responses,{...finalData,user_id:user.uid}])
      setLoading(true)
      const job_data = doc(db,"jobs",j_id)
      const updatedData = await updateDoc(job_data ,{
        responses:[...responses,user.uid]
      })
      setLoading(false)
      setToggler(!toggler)
      setSuccess(true)
     console.log(job_data)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
    {
      !success?
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
    <div className='mt-3 p-5 flex w-full'>
          <form action="" className='flex flex-col w-full gap-6' onSubmit={handleSubmit}>
            <div className='flex flex-col gap-2'>
            <label className='font-medium' htmlFor="full_name">Your full name</label>
            <input type='text' name="full_name" required 
            className='bg-gray-200 p-2 border-none focus:outline-none focus:border focus:border-gray-500 rounded-md font-medium'></input>
            </div>
            <div className='flex flex-col gap-2'>
            <label className='font-medium' htmlFor="full_name">Your email</label>
            <input type='email' name="email" required
            className='bg-gray-200 p-2 border-none focus:outline-none focus:border focus:border-gray-500 rounded-md font-medium'></input>
            </div>
            <div className='flex flex-col gap-2'>
            <label className='font-medium' htmlFor="full_name">Your mobile number</label>
            <input type='number' name="mobile_number" required
            className='bg-gray-200 p-2 border-none focus:outline-none focus:border focus:border-gray-500 rounded-md font-medium'></input>
            </div>
            <div className='absolute bottom-0 left-0 w-full h-[50px] bg-blue-800 flex items-center justify-end px-4'>
            <button type='submit' className='bg-white px-6 py-2 rounded-full font-bold'>Apply</button>
           </div>
          </form>

        </div>
    </div>:<ApplicationSuccess/>
}
    </>
  )
}

export default ApplyForm