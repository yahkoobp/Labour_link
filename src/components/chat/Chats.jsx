"use client"
import { ChatContext } from "@/app/context/chatContext";
import { useUserAuthContext } from "@/app/context/userAuthContext";
import { useSinglePeoples } from "@/hooks/useSinglePeoples";
import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { db } from "../../../firebaseConfig";

const Chats = () => {
  const [chats, setChats] = useState([]);
  
  const{user} = useUserAuthContext()
  const{data:currentUser} = useSinglePeoples(user?.uid)
  const { dispatch,setShowChatBar,setShowSideBar } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser?.id), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUser?.id && getChats();
  }, [currentUser?.id]);

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
    setShowChatBar(true)
    setShowSideBar(false)

  };

  return (
    <div className="chats">
      {Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat) => (
        <div
          className="userChat"
          key={chat[0]}
          onClick={() => handleSelect(chat[1]?.userInfo)}
        >
          <img src={chat[1]?.userInfo.photoURL} alt="" />
          <div className="userChatInfo">
            <span>{chat[1]?.userInfo.displayName}</span>
            <p>{chat[1]?.lastMessage?.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Chats;
