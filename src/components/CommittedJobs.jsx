import React, { useEffect, useState } from 'react'
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useUserAuthContext } from '@/app/context/userAuthContext';
import { db } from '../../firebaseConfig';
import { useQuery } from 'react-query';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import JobSchedule from './JobSchedule';

const CommittedJobs = () => {
  const {user} = useUserAuthContext()
  const fetchJobs = async()=>{
    let list = []
    try {
      const jobRef = collection(db , "jobs");
      const q = query(jobRef ,where("confirmations" ,"array-contains",user?.uid ))
      const querySnapShot = await getDocs(q)
      querySnapShot.forEach((doc)=>{
        list.push({job_id: doc.id ,...doc.data()})
      })
      return list
    } catch (error) {
      console.log(error)
    }
  }

  const {data:committedJobs , isLoading} = useQuery('committed-jobs', fetchJobs,{
    cacheTime:500000 ,staleTime:50000,refetchOnMount:true,refetchOnWindowFocus:true,keepPreviousData:true
})
  console.log(committedJobs)

  if(isLoading){ 
    return(
    <div>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 ,fontWeight:"bold",}}
        open={true}
      > <div className='flex flex-col items-center justify-center gap-4'>
        <CircularProgress/>
        <span style={{marginLeft:10}}>Loading...</span>
        </div>
      </Backdrop>
    </div>
  )
  }

  return (
    <div>
      {committedJobs?.length ?
      committedJobs?.map((job)=>(
        <JobSchedule key={job?.id} job={job}/>
      )):
      <div><p>You don&apos;t have any committed jobs</p></div>
            
}
    </div>
      
  )
}

export default CommittedJobs