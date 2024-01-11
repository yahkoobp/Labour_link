'use client'
import PeopleCard from '@/components/PeopleCard'
import BottomTab from '@/components/BottomTab'
import { usePeoples } from '@/hooks/usePeoples'


const Peoples = () => {
  
  const {data} = usePeoples()
  console.log(data)
  return (
    <div className='flex flex-col items-center justify-center '>
        <div className='sticky z-50 top-0 w-full'>
           
        </div>
       <div className='flex items-center justify-center px-6 py-2 border border-gray-100 shadow-sm w-full'>
        <p className=' font-semibold text-md'>Peoples from your locality , search for more peoples</p>
       </div>
        <div className='flex flex-wrap gap-3 px-2 py-2 items-center justify-center bg-gray-50'>
         {
          data?.map((user)=>(
            <PeopleCard key={user.id} user={user}/>
          ))
         }
         </div>

        <div className='w-full fixed bottom-0 left-0'>
          <BottomTab value={2}/>
          </div>
    </div>
  )
}

export default Peoples