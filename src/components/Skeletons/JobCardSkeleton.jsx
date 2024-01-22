import React from 'react'
import Skeleton from '@mui/material/Skeleton';

const JobCardSkeleton = () => {
  return (
    <div>
        <h2>Loading......................</h2>
        <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
    </div>
  )
}

export default JobCardSkeleton