'use client'
import PeopleCard from '@/components/PeopleCard'
import BottomTab from '@/components/BottomTab'
import CloseIcon from "@mui/icons-material/Close";
import { usePeoples } from '@/hooks/usePeoples'
import { useRouter } from 'next/navigation';
import { Suspense } from 'react';


const Peoples = () => {
  const router = useRouter()
  const {data} = usePeoples()
  console.log(data)
  return (
    <div className='flex flex-col items-center justify-center '>
        <div className='sticky z-50 top-0 w-full'>
           
        </div>
       <div className='flex items-center justify-between px-2 py-2 border border-gray-100 shadow-sm w-full gap-4'>
       <CloseIcon
          onClick={(e) => {
            router.back();
            // e.preventDefault()
          }}
          sx={{ color: "gray", cursor: "pointer" }}
        />
        <p className=' font-semibold text-md'>Peoples from your locality , search for more peoples</p>
        <div></div>
       </div>
       <div className='p-2 w-full'>
        <input type="text" placeholder='Search peoples...' 
        className='bg-gray-100 border-none focus:outline-none focus:border-gray-300 p-3 w-full rounded-md'/>
       </div>
       <div className='flex items-center justify-center w-full px-6 py-2'>
        <div className='flex flex-wrap gap-3 items-center justify-start md:justify-center bg-gray-50 w-full'>
         {
          data?.map((user)=>(
            <PeopleCard key={user.id} user={user}/>
          ))
         }
         </div>
         </div>

        <div className='w-full fixed bottom-0 left-0'>
          <BottomTab value={2}/>
          </div>
    </div>
  )
}

export default Peoples