'use client'
import {doc, getDoc } from 'firebase/firestore';
import { useQuery } from 'react-query'
import { db } from '../../firebaseConfig';

const fetchSinglePeople = async ({queryKey}) =>{
    const user_id = queryKey[1]
    let user ={}
    console.log(user_id)
    console.log("function calling...")
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
 export const useSinglePeoples = (user_id) =>{
    return useQuery(['user',user_id] ,fetchSinglePeople,{cacheTime:500000})
}