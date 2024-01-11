'use client'
import BottomTab from '@/components/BottomTab'
import TabNav from '@/components/TabNav'
import React, { Suspense, useState } from 'react'

const Jobs = ({params}) => {
    const [value , setValue] = useState(0)
    console.log(params)
  return (
    <div className='relative '>
         {/* <div className='sticky z-50 top-0 w-full'>
        <Header/>
        </div> */}
          <div className='w-full'>
          <TabNav />
          </div>

         <div className='w-full fixed bottom-0 left-0'>
          <BottomTab value={1}/>
          </div>
    </div>
  )
}

export default Jobs