'use client'

import React, { useContext, useEffect, useMemo, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import EditIcon from '@mui/icons-material/Edit';
import WorkIcon from '@mui/icons-material/Work';
import PlaceIcon from '@mui/icons-material/Place';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import ShortcutIcon from '@mui/icons-material/Shortcut';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import { Chip } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { usePathname, useRouter } from 'next/navigation';
import { useSinglePeoples } from '@/hooks/useSinglePeoples';
import Link from 'next/link';
import { ChatContext } from '@/app/context/chatContext';

const Singlepeople = () => {
  // const [userDetails , setUserDetails] = useState({})
  const pathname = usePathname()
  const user_id = pathname.split('/')[2]
  console.log(user_id)
  const router = useRouter()
  const {data} = useSinglePeoples(user_id)
  const {setChatUser ,dispatch ,setShowChatBar,setShowSideBar} = useContext(ChatContext)

  const handleChatUser = () =>{
      setChatUser(data)
      // dispatch({ type: "CHANGE_USER", payload: data });
      // setShowChatBar(true)
      // setShowSideBar(false)
      router.push('/chats')
  }
  return (
    <div>
       <div className='h-[60px] p-3 sticky top-0 bg-white flex items-center justify-between'>
            <CloseIcon onClick={(e)=>{
                e.preventDefault()
                router.back()
            }} sx={{color:'gray',cursor:"pointer"}}/>
           <Link href='/updateProfile'><EditIcon sx={{color:"darkblue"}}/></Link>
        </div>
        <div className='flex flex-col p-4'>
        <div className='flex flex-col gap-2 items-center justify-center p-3 w-full'>
        
        <div className=' w-[60px] h-[60px] rounded-full bg-gray-200 flex items-center justify-center border border-gray-300 cursor-pointer'>
            <img src={data?.image}
             className='w-full h-full rounded-full object-cover' alt="bdhbhdbh" />
        </div>
        <h1 className='font-heading text-lg'>{data?.firstname} {data?.lastname}</h1>
        <p className='text-gray-600 font-semibold text-center text-sm'>{data?.bio}</p>
        <button onClick={handleChatUser} className='bg-teal-700 text-white font-semibold px-6 py-1 rounded-md'>Message</button>
        </div>

        <div className='flex flex-col items-center justify-center mt-4 rounded-md p-3 gap-3 bg-green-50'>
          <div className='flex items-center justify-between w-full'>
            <h2 className='font-bold text-md '>Basic details</h2>
            <EditIcon sx={{color:"darkblue"}}/>
          </div>
          <div className='flex justify-start items-center w-full gap-3'>
            <WorkIcon sx={{color:"gray",width:20,height:20}}/>
            <p className='font-semibold text-[14px]'>Carpenter</p>
          </div>
          <div className='flex justify-start items-center w-full gap-3'>
            <PlaceIcon sx={{color:"gray",width:20,height:20}}/>
            <p className='font-semibold text-[14px]'>{data?.city}</p>
          </div>
          <div className='flex justify-start items-center w-full gap-3'>
            <EmailIcon sx={{color:"gray",width:20,height:20}}/>
            <p className='font-semibold text-[14px]'>{data?.email}</p>
          </div>
          <div className='flex justify-start items-center w-full gap-3'>
            <PhoneIcon sx={{color:"gray",width:20,height:20}}/>
            <p className='font-semibold text-[14px]'>{data?.phonenumber}</p>
          </div>
        </div>

        <div className='flex flex-col items-center justify-center mt-4 rounded-md p-3 gap-3 border border-gray-200'>
          <div className='flex items-center justify-between w-full'>
            <h2 className='font-bold text-md '>Personal details</h2>
            <EditIcon sx={{color:"darkblue"}}/>
          </div>
          <div className='w-full'>
            <p className=' font-semibold text-[12px] text-gray-500'>First name</p>
            <p className=' font-semibold text-[14px] '>{data?.firstname}</p>
          </div>
          <div className='w-full'>
            <p className=' font-semibold text-[12px] text-gray-500'>Last name</p>
            <p className=' font-semibold text-[14px]'>{data?.lastname}</p>
          </div>
          <div className='w-full'>
            <p className=' font-semibold text-[12px] text-gray-500'>Address</p>
            <p className=' font-semibold text-[14px]'>{data?.address}</p>
          </div>
          
        </div>

        <div className='flex flex-col items-start justify-center mt-4 rounded-md p-3 gap-3 bg-yellow-50'>
          <div className='flex items-center justify-between w-full'>
            <h2 className='font-bold text-md '>Work areas</h2>
            <AddBoxIcon sx={{color:"darkblue"}}/>
          </div>
          <div className='flex gap-3 p-3 flex-wrap'>
            {data?.work_areas?.map((work)=>(
            <Chip key={work} label={work} size='' variant='outlined' sx={{color:"gray"}} onDelete={()=>{}}/>
            ))}
          </div>
        </div>

        <div className='flex flex-col justify-center mt-4 rounded-md p-3 gap-2 border border-gray-200'>
          <div className='flex items-center justify-between w-full'>
            <h2 className='font-bold text-md '>Previous works</h2>
            <ShortcutIcon/>
          </div>
          <p className='font-semibold text-[13px] text-gray-600'>See the previous works that you have completed</p>
         
        </div>
    </div>
    </div>
  )
}

export default Singlepeople