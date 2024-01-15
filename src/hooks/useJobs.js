import { collection, getDocs } from 'firebase/firestore';
import { useQuery } from 'react-query'
import { db } from '../../firebaseConfig';

const fetchJobs = async()=>{
    let list = []
    try {
      const querySnapShot = await getDocs(collection(db , "jobs"));
      querySnapShot.forEach((doc)=>{
        list.push({job_id: doc.id ,...doc.data()})
      })
      return list
    } catch (error) {
      console.log(error)
    }
  }

 export const useJobs = () =>{
    return useQuery('jobs', fetchJobs,{
        cacheTime:500000 ,staleTime:50000,refetchOnMount:true,refetchOnWindowFocus:true,keepPreviousData:true
    })
}