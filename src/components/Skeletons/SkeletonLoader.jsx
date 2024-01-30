import React from 'react'
import Skeleton from '@mui/material/Skeleton';

const SkeletonLoader = () => {
  return (
    <div className='w-full h-[100vh]'>
        <Skeleton variant="rectangular" sx={{bgcolor: 'grey.900' ,height:"100%"}}  />
    </div>
  )
}

export default SkeletonLoader