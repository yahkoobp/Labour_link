import React from 'react'

const JobSchedule = () => {
  return (
    <div className='flex flex-col items-center justify-center gap-4 w-full'>
          <h1 className='font-semibold text-md text-gray-800'>Work Schedule</h1>
          <div className='flex flex-col items-center justify-center gap-2 w-full p-5 '>
              <div className='grid grid-cols-3 gap-8 text-gray-600 '>
                 <h2 className='font-semibold text-[14px]'>Work type</h2>
                 <span className='text-center'>:</span>
                 <p className='text-[14px]'> Carpenter</p>
              </div>
              <div className='grid grid-cols-3 content-center gap-8 text-gray-600 border '>
                 <h2 className='font-semibold text-[14px] border'>Work location</h2>
                 <span className='text-center'>:</span>
                 <p className='text-[14px]'> Perinthalmanna</p>
              </div>
              <div className='grid grid-cols-3 items-center justify-between gap-8 text-gray-600 border'>
                 <h2 className='font-semibold text-[14px]'>Start date</h2>
                 <span className='text-center'>:</span>
                 <p className='text-[14px]'>10/10/2024</p>
              </div>
              <div className='grid grid-cols-3 items-center justify-center gap-8 text-gray-600 border'>
                 <h2 className='font-semibold text-[14px]'>End date</h2>
                 <span className='text-center'>:</span>
                 <p className='text-[14px]'>14/10/2024</p>
              </div>
              <div className='grid grid-cols-3 items-center justify-center gap-8 text-gray-600'>
                 <h2 className='font-semibold text-[14px]'>Time</h2>
                 <span className='text-center'>:</span>
                 <p className='text-[14px]'>Day</p>
              </div>
              <div className='grid grid-cols-3 items-center justify-center gap-8 text-gray-600'>
                 <h2 className='font-semibold text-[14px]'>Labourer</h2>
                 <span className='text-center'>:</span>
                 <p className='text-[14px]'>Yahkoob P</p>
              </div>
              <div className='grid grid-cols-3 items-center justify-center gap-8 text-gray-600'>
                 <h2 className='font-semibold text-[14px]'>Labourer address</h2>
                 <span className='text-center'>:</span>
                 <p className='text-[14px]'>Pulikkal(h) , elamkulam</p>
              </div>
              <div className='grid grid-cols-3 items-center justify-center gap-8 text-gray-600'>
                 <h2 className='font-semibold text-[14px]'>Labourer Mob</h2>
                 <span className='text-center'>:</span>
                 <p className='text-[14px]'>8943871306</p>
              </div>
              <div className='grid grid-cols-3 items-center justify-center gap-8 text-gray-600'>
                 <h2 className='font-semibold text-[14px]'>Status</h2>
                 <span className='text-center'>:</span>
                 <p className='text-[14px]'>Upcoming</p>
              </div>
          </div>
    </div>
  )
}

export default JobSchedule