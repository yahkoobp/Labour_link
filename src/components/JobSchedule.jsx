import React from 'react'

const JobSchedule = () => {
  return (
    <div className='flex flex-col items-center justify-center gap-4 w-full'>
          <h1 className='font-semibold text-md text-gray-800'>Work Schedule</h1>
          {/* <div className='flex flex-col items-center justify-center gap-2 w-full p-5 '>
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
          </div> */}

         <div className='flex items-center justify-center font-semibold text-[14px]'>
            <div className='flex flex-col items-start justify-start border-r border-r-gray-200 p-4'>
               <p className='p-1'>Work title</p>
               <p className='p-1'>Work location</p>
               <p className='p-1'>Address</p>
               <p className='p-1'>Start date</p>
               <p className='p-1'>End date</p>
               <p className='p-1'>Time</p>
               <p className='p-1'>Labourer</p>
               <p className='p-1'>Labourer address</p>
               <p className='p-1'>Labourer Mob</p>
               <p className='p-1'>Work status</p>
               
            </div>
            <div className='flex flex-col items-start justify-start p-4'>
                <p className='p-1'>Carpenter</p>
                <p className='p-1'>Perinthalmanna</p>
                <p className='p-1'>Pulikkal , elamkulam perumpara 678654</p>
                <p className='p-1'>10 /10/2024</p>
                <p className='p-1'>12/10/2024</p>
                <p className='p-1'>10.am to 3.pm</p>
                <p className='p-1'>Suhail M</p>
                <p className='p-1'>Pulikkal(h),elamkilam , prumpara 876543</p>
                <p className='p-1'>987654311</p>
                <p className='p-1'>Upcoming</p>
            </div>
         </div>
    </div>
  )
}

export default JobSchedule