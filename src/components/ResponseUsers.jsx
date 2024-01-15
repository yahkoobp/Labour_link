'use client'
import { doc, updateDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../../firebaseConfig'
import { useJobView } from '@/hooks/useJobView'
import UserAccordion from './UserAccordion'

const ResponseUsers = (props) => {
    const user = props?.user
    const j_id = props?.job
    const [selections,setSelections] = useState([])
    console.log(j_id)
    const {data} = useJobView(j_id)
    console.log(user)
    console.log(data)

    useEffect(()=>{
      setSelections(data?.selections)
    },[])

    const handleSelect = async() =>{
    try {
      // setResponses([...responses,{...finalData,user_id:user.uid}])
      const job_data = doc(db,"jobs",j_id)
      const updatedData = await updateDoc(job_data ,{
        selections:[...selections,user.id]
      })
     console.log(job_data)
    } catch (error) {
      console.log(error)
    }
    }
  return (
       <div className='flex items-center justify-between gap-4 border-b border-b-gray-200 py-1'>
        {/* <div className='flex items-center justify-between gap-2'>
       <div className='w-[50px] h-[50px] rounded-full'>
            <img src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=740&t=st=1701156585~exp=1701157185~hmac=ac68d03b1add36a89081d098324072530d782a1bd6a57a0eebb5ff7e6ae9cea8" className='w-full h-full rounded-full object-cover' alt="" />
        </div>
       <div className='ml-6'>
            <h1 className='font-semibold text-md'>{user?.firstname}</h1>
            <div className='text-[12px] font-semibold'>
            <p>{user?.email}</p>
            <p>{user?.phonenumber}</p>
            </div>
        </div>
        </div>
        <div className='ml-0'>
          {data?.selections.includes(user?.id)?
          <button className='text-green-800 px-6 py-1'>Selected</button>:
          <button onClick={handleSelect} className='bg-teal-600 text-white px-6 py-1 rounded-md'>Select</button>
          }
        </div> */}
        <UserAccordion/>
        </div>
  )
}

export default ResponseUsers