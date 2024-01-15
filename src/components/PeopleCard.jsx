'use client'
import React from 'react'
import PlaceIcon from '@mui/icons-material/Place';
import Link from 'next/link';

const PeopleCard = (props) => {
  const user_data = props.user
  return (
   
        <div className='flex flex-col items-center justify-center  gap-2 p-4 border border-gray-200 bg-white rounded-md h-[200px]'>
        <div className=' w-[60px] h-[60px] rounded-full'>
            <img src={user_data.image?user_data.image:"https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=740&t=st=1701156585~exp=1701157185~hmac=ac68d03b1add36a89081d098324072530d782a1bd6a57a0eebb5ff7e6ae9cea8"} className='w-full h-full rounded-full object-cover' alt="" />
        </div>
        <h2 className='font-heading text-sm'>{user_data?.firstname} {user_data?.lastname?.slice(0,2)}{user_data?.lastname?.length>2&&"..."}</h2>
        <p className='text-[12px] font-semibold text-gray-500'>{user_data.bio?.slice(0,20)}{user_data.bio?.length>20&&"..."}</p>
        
        <div className='flex gap-1 bg-gray-100 px-2 items-center justify-center rounded-md'>
                <PlaceIcon sx={{color:"black",width:20}}/>
            <h2 className='font-semibold text-[12px] text-gray-900'>{user_data?.city?.slice(0,10)}{user_data?.city?.length>10&&"..."}</h2>
            </div>
       <Link href={`/peoples/${user_data?.id}`}> <button className='px-10 py-1 border border-gray-300 font-semibold text-blue-800 rounded-md hover:scale-90 duration-500'>View</button></Link>
       
    </div>
  )
}

export default PeopleCard