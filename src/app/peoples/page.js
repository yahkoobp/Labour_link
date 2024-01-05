'use client'
import React, { useEffect, useState } from 'react'
import { useUserAuthContext } from '../context/userAuthContext'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../../firebaseConfig'
import PeopleCard from '@/components/PeopleCard'
import BottomTab from '@/components/BottomTab'

const fetchUsers = async () =>{
  let list = []
  try {
    const querySnapShot = await getDocs(collection(db , "users"));
    querySnapShot.forEach((doc)=>{
      list.push({id: doc.id ,...doc.data()})
    })

    return list
  } catch (error) {
    console.log(error)
  }
}

const Peoples = () => {
  const {user , logout} = useUserAuthContext()
  const [users , setUsers] = useState([])
  const [loading , setLoading] = useState(false)
  console.log(users)

  useEffect(()=>{
      setLoading(true)
      const fetchData = async()=>{
      const result = await fetchUsers()
      setUsers(result)
      setLoading(false)
    }
    fetchData()
  },[])
  return (
    <div className='flex flex-col items-center justify-center '>
        <div className='sticky z-50 top-0 w-full'>
           
        </div>
       <div className='flex items-center justify-center px-6 py-2 border border-gray-100 shadow-sm w-full'>
        <p className=' font-semibold text-md'>Peoples from your locality , search for more peoples</p>
       </div>
        <div className='flex flex-wrap gap-3 px-2 py-2 items-center justify-center bg-gray-50'>
         {
          users.map((user)=>(
            <PeopleCard key={user.id} user={user}/>
          ))
         }
         </div>

        <div className='w-full fixed bottom-0 left-0'>
          <BottomTab value={2}/>
          </div>
    </div>
  )
}

export default Peoples