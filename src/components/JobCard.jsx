'use client'
import React, { useState } from 'react'
import WorkIcon from '@mui/icons-material/Work';
import PlaceIcon from '@mui/icons-material/Place';
import QuickreplyIcon from '@mui/icons-material/Quickreply';
import { Fade } from '@mui/material';
import Link from 'next/link';

const JobCard = (props) => {
  const job = props.job
    const j_id = props.job.job_id
  return (
    <div className='rounded-md'>
      <Fade in={true} timeout={1000}>
      <Link href={`/jobs/${j_id}`}>
        <div className='flex flex-col shadow-md mt-2 rounded-md p-6 gap-3 border border-gray-200'>
            <div className='flex gap-2 items-center'>
                <WorkIcon sx={{color:"black",width:20,height:20}}/>
            <h1 className='font-heading text-md'>{job.job_title}</h1>
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
              <div className='flex items-center justify-center gap-3'>
               <div className='h-[7px] w-[7px] bg-green-600 rounded-full'></div>
                <p className='font-bold text-blue-900 text-[13px]'>Posted on {job.time_stamp}</p>
              </div>
                <p className='font-bold text-[12px] text-green-900'>Active now</p>
            </div>
            <div className='flex gap-2 justify-start items-center'>
                <QuickreplyIcon sx={{width:"20px"}}/>
                <p className='font-bold text-[12px] text-green-800'>14 Interests</p>
            </div>

        </div>
        </Link>
        </Fade>
    </div>
  )
}

export default JobCard