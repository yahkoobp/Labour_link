import Chat from '@/components/chat/Chat'
import Sidebar from '@/components/chat/Sidebar'
import React from 'react'

const Chatpage = () => {
  return (
    <div className='chat-home'>
         <Sidebar/>
         <Chat/>
    </div>
  )
}

export default Chatpage