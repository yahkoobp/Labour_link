import React, { useEffect, useState } from 'react'
import WorkIcon from '@mui/icons-material/Work';
import PlaceIcon from '@mui/icons-material/Place';
import QuickreplyIcon from '@mui/icons-material/Quickreply';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { useUserAuthContext } from '@/app/context/userAuthContext';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import Link from 'next/link';


const JobPosts = () => {
  const [jobPosts , setJobPosts] = useState([])
  const {user} = useUserAuthContext()
  useEffect(()=>{
    let unSubscribe = false
    let list = []
    try {
      const fetchData = async()=>{
        const jobsQuery = query(
          collection(db,"jobs"),
          where("job_poster","==",user.uid)
        )
        const querySnapshot = await getDocs(jobsQuery);
        querySnapshot.forEach((doc) => {
          list.push({id: doc.id ,...doc.data()})
});
      setJobPosts(list)
      console.log(jobPosts)
    }
    if(unSubscribe == false){
    fetchData()
    }
      
    } catch (error) {
      console.log(error)
    }

    return () =>{ unSubscribe = true}
  },[])

  return (
    <div>
      <h1 className='font-heading'>Your job posts({jobPosts.length})</h1>
      { 
        jobPosts.map((job)=>(
        <div key={job.id} className=' bg-gray-50 rounded-md'>
      <Link href={`/jobPosts/${job.id}`}>
        <div className='flex flex-col shadow-sm mt-2 rounded-md p-6 gap-3'>
          <div className='flex items-center justify-between'>
            <div className='flex gap-2'>
                <WorkIcon sx={{color:"black",width:20,height:20}}/>
            <h1 className='font-semibold text-md'>{job.job_title}</h1>
            </div>
            <div className='flex justify-end'>
            <EditOutlinedIcon sx={{color:"blue"}}/>
          </div>
            </div>
            <div className='flex gap-2'>
                <PlaceIcon sx={{color:"black",width:20,height:20}}/>
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
                <p className='fonr-semibold text-gray-500 text-[13px]'>Posted on {job.time_stamp}</p>
                <p className='font-bold text-[12px] text-green-900'>Active now</p>
            </div>
            <div className='flex gap-2 justify-start items-center'>
                <QuickreplyIcon sx={{width:"20px"}}/>
                <p className='font-bold text-[12px] text-green-900'>14 responses</p>
            </div>

        </div>
        </Link>
    </div>
    
))}
    </div>
  )
}

export default JobPosts