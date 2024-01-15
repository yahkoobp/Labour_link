"use client"
import React, { useContext } from "react";
// import Cam from "../img/cam.png";
// import Add from "../img/add.png";
// import More from "../img/more.png";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "@/app/context/chatContext";


const Chat = () => {
  const { data,setShowSideBar , setShowChatBar } = useContext(ChatContext);
  console.log(data.user)
  const handleBack = () =>{
    setShowSideBar(true)
    setShowChatBar(false)
  }
  return (
    <>
    <div className="chat">
      <div className="chatInfo">
        <button onClick={handleBack}>Go back</button>
        <span>{data.user?.displayName}</span>
        <div className="chatIcons">
          {/* <img src={Cam} alt="" />
          <img src={Add} alt="" />
          <img src={More} alt="" /> */}
        </div>
      </div>
      <Messages />
      <Input/>
    </div>
    </>
        
  );
};

export default Chat;