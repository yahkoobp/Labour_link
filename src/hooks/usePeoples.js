import { collection, getDocs } from 'firebase/firestore';
import { useQuery } from 'react-query'
import { db } from '../../firebaseConfig';

const fetchUsers = async () =>{
    let list = []
    try {
      const querySnapShot = await getDocs(collection(db , "users"));
      querySnapShot.forEach((doc)=>{
        list.push(doc.data())
      })
  
      return list
    } catch (error) {
      console.log(error)
    }
  }

 export const usePeoples = (filter) =>{
    return useQuery('peoples', fetchUsers ,{
        cacheTime:500000 ,staleTime:50000,refetchOnMount:true,refetchOnWindowFocus:true,select:filter,keepPreviousData:true
    })
}