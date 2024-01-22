import React from 'react'
import WorkIcon from '@mui/icons-material/Work';
import PlaceIcon from '@mui/icons-material/Place';

const MoreJobs = () => {
  return (
    <div>
        <div className='flex flex-col gap-2 px-3 py-4 shadow-md'>
        <div className='flex gap-2'>
                <WorkIcon sx={{color:"teal"}}/>
            <h1 className='text-[15px] font-semibold'>Carpenter</h1>
            </div>
          <div className='flex items-center gap-2'>
            <PlaceIcon sx={{color:"green"}}/>
            <p className='font-semibold text-[14px]'>Perinthalmanna</p>
        </div>
        <div className='flex gap-2 justify-between items-center'>
                <p className='font-semibold text-gray-500 text-[14px]'>Posted on 10/10/2023</p>
                <p className='font-bold text-[12px] text-green-900'>Active now</p>
            </div>
    </div>
    </div>
  )
}

export default MoreJobs