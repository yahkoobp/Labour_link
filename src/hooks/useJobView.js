import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { useQuery } from 'react-query'
import { db } from '../../firebaseConfig';

const fetchJob = async({queryKey})=>{
    const job_id = queryKey[1]
    try {
        const jobdocRef = doc(db, "jobs", job_id);
       const jobdocSnap = await getDoc(jobdocRef);
  
      if (jobdocSnap.exists()) {
       return jobdocSnap.data()
      } else {
        console.log("No such document!");
      }
        
      } catch (error) {
        console.log(error)
      }
  }

 export const useJobView = (job_id) =>{
    return useQuery(['jobView',job_id],fetchJob,{
        cacheTime:500000 ,staleTime:50000,refetchOnMount:true,refetchOnWindowFocus:true,keepPreviousData:true
    })
}