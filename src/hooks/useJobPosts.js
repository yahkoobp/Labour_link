import { collection, getDocs, query, where } from 'firebase/firestore';
import { useQuery } from 'react-query'
import { db } from '../../firebaseConfig';

const fetchJobPosts = async({queryKey})=>{
    const user_id = queryKey[1]
    let list = []
    try {
        const jobsQuery = query(
          collection(db,"jobs"),
          where("job_poster","==",user_id)
        )
        const querySnapshot = await getDocs(jobsQuery);
        querySnapshot.forEach((doc) => {
        list.push({id: doc.id ,...doc.data()})
});
      return list
    } catch (error) {
      console.log(error)
    }
  }

 export const useJobPosts = (user_id) =>{
    return useQuery(['jobPosts',user_id],fetchJobPosts,{
        cacheTime:500000 ,staleTime:50000,refetchOnMount:true,refetchOnWindowFocus:true,
    })
}