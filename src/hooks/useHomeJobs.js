import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { useQuery } from 'react-query'
import { db } from '../../firebaseConfig';
import { useSinglePeoples } from './useSinglePeoples';

const fetchJobs = async({queryKey})=>{
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
    } else {
      console.log("No such document!");
    }

    let jobs = []
    try {
      const jobRef = collection(db , "jobs")
      const q = query(jobRef, where('job_title', 'in', user?.work_areas));
      const querySnapShot = await getDocs(q);
      querySnapShot.forEach((doc)=>{
        jobs.push({job_id: doc.id ,...doc.data()})
      })
      return jobs
    } catch (error) {
      console.log(error)
    }
  }
  }

 export const useHomeJobs = (user_id) =>{
    return useQuery(['HomeJobs',user_id],fetchJobs,{
        cacheTime:500000 ,staleTime:50000,refetchOnMount:true,refetchOnWindowFocus:true,keepPreviousData:true
    })
}