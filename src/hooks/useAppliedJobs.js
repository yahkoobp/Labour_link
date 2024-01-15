import { collection, getDocs, query, where } from 'firebase/firestore';
import { useQuery } from 'react-query'
import { db } from '../../firebaseConfig';

const fetchAppliedJobs = async({queryKey})=>{
    const user_id = queryKey[1]
    let list = []
    try {
        const jobsQuery = query(
          collection(db,"jobs"),
          where("responses","array-contains",user_id)
        )
        const querySnapshot = await getDocs(jobsQuery);
        querySnapshot.forEach((doc) => {
        list.push({id: doc.id ,...doc.data()})
});   
      console.log(list)
      return list
    } catch (error) {
      console.log(error)
    }
  }

 export const useAppliedJobs = (user_id) =>{
    return useQuery(['appliedJobs',user_id],fetchAppliedJobs,{
        cacheTime:500000 ,staleTime:50000,refetchOnMount:true,refetchOnWindowFocus:true,keepPreviousData:true
    })
}