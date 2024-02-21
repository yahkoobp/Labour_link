'use client'
import React, { useState } from 'react'
import WorkIcon from '@mui/icons-material/Work';
import PlaceIcon from '@mui/icons-material/Place';
import QuickreplyIcon from '@mui/icons-material/Quickreply';
import { Fade } from '@mui/material';
import Link from 'next/link';

const HomeJobCard = (props) => {
  const job = props.job
  return (
    <div className=' bg-gray-50 rounded-md'>
      <Fade in={true} timeout={1000}>
      <Link href="/">
        <div className='flex flex-col shadow-md rounded-md p-3 gap-3 bg-whitw'>
            <div className='flex gap-2 items-center'>
                <WorkIcon sx={{color:"teal",width:20,height:20}}/>
            <h1 className='font-bold text-[15px]'>{job?.job_title}</h1>
            </div>
            <div className='flex gap-2'>
                <PlaceIcon sx={{color:"teal",width:20,height:20}}/>
            <h2 className='font-semibold text-[14px] text-gray-500'>{job?.job_location}</h2>
            </div>

           <div className='flex gap-2 items-center justify-start'>
            <div className='bg-green-100 w-[100px] px-2 py-1 rounded-md'>
               <h3 className='text-green-800 font-bold text-[12px]'>Rs {job?.daily_wage} / day</h3>
            </div>
            <div className='bg-gray-200 w-[100px] px-2 py-1 rounded-md'>
               <h3 className='text-green-800 font-bold text-[12px]'>{job?.work_time} time</h3>
            </div>
            </div>

            <div className='flex gap-4 justify-between items-center'>
              <div className='flex items-center justify-center gap-3'>
               <div className='h-[7px] w-[7px] bg-green-600 rounded-full'></div>
                <p className='font-bold text-blue-900 text-[13px]'>{job?.time_stamp}</p>
              </div>
                <p className='font-bold text-[12px] text-green-900'>Active now</p>
            </div>
            <div className='flex gap-2 justify-start items-center'>
                <QuickreplyIcon sx={{width:"20px",color:"teal"}}/>
                <p className='font-bold text-[12px] text-green-800'>14 Interests</p>
            </div>

        </div>
        </Link>
        </Fade>
    </div>
  )
}

export default HomeJobCard