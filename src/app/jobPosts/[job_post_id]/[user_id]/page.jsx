"use client"
import React, { useEffect, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { usePathname, useRouter } from 'next/navigation';
import { Rating } from '@mui/material';
import { rating_questions } from '@/data';
import { useSinglePeoples } from '@/hooks/useSinglePeoples';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../../../../firebaseConfig';


const LabourFeedBack = () => {
  const router = useRouter()
  const [ratings ,setRatings] = useState({
    overall_performance:0,
    effectiveness:0,
    punctuality:0,
    proffessionalism:0,
    output:0
  })
  const [allRatings , setAllRatings] = useState([])
  const pathname = usePathname()
  const user_id = pathname.split("/")[3]
  
  console.log(ratings)
  console.log(user_id)
  console.log(allRatings)
  useEffect(()=>{

    const fetchUser = async() =>{
      try {
        let user ={}
        const docRef = doc(db, "users", user_id);
        const docSnap = await getDoc(docRef);
        console.log("working.......")
        
        if (docSnap.exists()) {
            user = docSnap.data()
            setAllRatings(user?.ratings)
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchUser()
  },[ratings])
  const changeHandler = (event , newVal) =>{
    setRatings({...ratings,[event.target.name]:newVal})
  }
  const handleClick = async()=>{
    allRatings.push(ratings)
    try {
      const user_data = doc(db,"users",user_id)
      const updatedData = await updateDoc(user_data ,{
        ratings:allRatings
      })
    } catch (error) {
      console.log(error)
    }
    router.replace("/home")
  }
  return (
    <div>
    <div className='h-[55px] shadow-md p-3 sticky top-0 bg-white'>
            <CloseIcon onClick={(e)=>{
                router.back()
                // e.preventDefault()
            }} sx={{color:'gray',cursor:"pointer"}}/>
        </div>
        <div className='flex flex-col py-5 px-5 gap-6'>
         <h1 className='font-semibold text-lg'>Share your feedback about the labour</h1>
          <div className='flex flex-col items-start justify-center gap-4'>
            {rating_questions.map((question)=>(
               <div key={question?.id} className='flex gap-2 flex-col items-start justify-center'>
               <p className='text-[15px]'>{question.id} . {question?.question} ??</p>
              <Rating name={question.name} value={ratings[question.name] || 0} onChange={changeHandler} precision={0.5} size="large"/>
             </div>
            ))
           }
          </div>
          <button onClick={handleClick} className='px-6 py-2 bg-teal-800 text-white rounded-md'>Submit</button>
         </div>
    </div>
  )
}

export default LabourFeedBack