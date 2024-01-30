'use client'
import React from 'react'
import PlaceIcon from '@mui/icons-material/Place';

const HomePeopleCard = (props) => {
//   const user_data = props.user
  return (
   
        <div className='flex flex-col items-center justify-center  gap-1 p-2 border border-blue-200 bg-white rounded-lg h-[180px]'>
        <div className=' w-[40px] h-[40px] rounded-full'>
            <img src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=740&t=st=1701156585~exp=1701157185~hmac=ac68d03b1add36a89081d098324072530d782a1bd6a57a0eebb5ff7e6ae9cea8" className='w-full h-full rounded-full object-cover' alt="" />
        </div>
        <h2 className='font-bold text-[12px]'>Yahkoob P</h2>
        <p className='text-[10px] font-semibold text-gray-600'>Carpenter</p>
        
        <div className='flex gap-1 px-2 items-center justify-center rounded-md'>
                <PlaceIcon sx={{color:"black",width:15}}/>
            <h2 className='font-semibold text-[10px] text-gray-900'>Perinthalmanna</h2>
            </div>
        <button className='px-10 py-1 border border-gray-300 font-semibold text-blue-800 rounded-md hover:scale-90 duration-500 text-[12px]'>View</button>
    </div>
  )
}

export default HomePeopleCard
//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