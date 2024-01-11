'use client'
import {doc, getDoc } from 'firebase/firestore';
import { useQueries } from 'react-query'
import { db } from '../../firebaseConfig';
import { use } from 'react';

const fetchJobResponses = async (user_id) =>{
    let user ={}
    if(user_id){
    const docRef = doc(db, "users", user_id);
    const docSnap = await getDoc(docRef);
    console.log("working.......")
    
    if (docSnap.exists()) {
        user = docSnap.data()
        console.log(user)
        return user
    } else {
      console.log("No such document!");
    }
  }
}
 export const useJobResponses = (ids) =>{
        console.log(ids)
        useQueries(
        ids?.map((id)=>{
            return {
                queryKey :['response',id],
                queryFn: ()=>fetchJobResponses(id)
            }   
        })
    )
}