'use client'
import { usePathname, useRouter } from 'next/navigation'
import CloseIcon from '@mui/icons-material/Close';
import WorkIcon from '@mui/icons-material/Work';
import PlaceIcon from '@mui/icons-material/Place';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../../firebaseConfig';
import ResponseUsers from '@/components/ResponseUsers';
import { useJobView } from '@/hooks/useJobView';
import { useQueries } from 'react-query';

const fetchSinglePeople = async (id) =>{
  let user = {}
  console.log("data is fetching........")
  const docRef = doc(db, "users", id);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
      user = docSnap.data()
      return user
  } else {
    console.log("No such document!");
  }
}

const SelectedJobPost = () => {
  const pathname = usePathname()
  const router = useRouter()
  const j_id = pathname.split("/")[2]
  const {data:jobDetails} = useJobView(j_id)
  const responsesArray = jobDetails?.responses || []
  const responses =  useQueries(
          responsesArray?.map((id)=>{
          return {
              queryKey :['response',id],
              queryFn: ()=>fetchSinglePeople(id),
              staleTime:500000,
              cacheTime:500000,
              enabled:!!responsesArray
              
        }
    }))

  return (
    <div className='flex flex-col relative h-[100vh]'>
          <div className='h-[55px] shadow-md p-3 sticky top-0 bg-white'>
            <CloseIcon onClick={(e)=>{
                router.back()
                // e.preventDefault()
            }} sx={{color:'gray',cursor:"pointer"}}/>
        </div>

        <div className='flex flex-col gap-3 mt-4 p-5 shadow-sm'>
        <div className='flex gap-2'>
                <WorkIcon sx={{color:"teal"}}/>
            <h1 className='font-heading text-lg'>{jobDetails?.job_title}</h1>
            </div>
          <div className='flex items-center gap-2'>
            <PlaceIcon sx={{color:"green"}}/>
            <p className='font-semibold text-[14px]'>{jobDetails?.job_location}</p>
        </div>
        <div className='flex gap-2'>
            <div className='bg-green-100 w-[150px] px-2 py-1 rounded-md'>
               <h3 className='text-green-800 font-bold text-[12px]'>Rs {jobDetails?.daily_wage} / day</h3>
            </div>
            <div className='bg-gray-200 w-[150px] px-2 py-1 rounded-md'>
               <h3 className='text-green-800 font-bold text-[12px]'>{jobDetails?.work_time} time</h3>
            </div>
            </div>
        <div className='flex gap-2 justify-between items-center'>
                <p className='fonr-bold text-gray-500 text-[13px]'>Posted on {jobDetails?.time_stamp}</p>
                <p className='font-bold text-[12px] text-green-900'>Active now</p>
            </div>
    </div>
    <div className='p-5'>
      <h1 className='font-semibold'>Responses({jobDetails?.responses?.length})</h1>
      <div className='flex flex-col gap-4 mt-3'>
      {responses?.map((response)=>(
         <ResponseUsers  user={response.data}/>
      ))
       
      }
      </div>
    </div>


    </div>
  )}

export default SelectedJobPost