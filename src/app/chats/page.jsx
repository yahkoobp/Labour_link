"use client"
import Chat from '@/components/chat/Chat'
import Sidebar from '@/components/chat/Sidebar'
import { ChatContext } from '../context/chatContext';
import { useContext } from 'react';

const Chatpage = () => {
  const { data,showSideBar,showChatBar} = useContext(ChatContext);
  return (
    <div className='home'>
       <div className='container'>
         {showSideBar && <Sidebar/>}
         { showChatBar && <Chat/>}
         </div>
    </div>
  )
}

export default Chatpage