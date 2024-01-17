"use client"
import React, { useContext, useEffect, useState } from "react";
import {
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { useUserAuthContext } from "@/app/context/userAuthContext";
import { useSinglePeoples } from "@/hooks/useSinglePeoples";
import { db } from "../../../firebaseConfig";
import { ChatContext } from "@/app/context/chatContext";

const Search = () => {
  const [searchUser, setSearchUser] = useState(null);
  const [err, setErr] = useState(false);
  const {chatUser ,setChatUser} = useContext(ChatContext)
  console.log(searchUser)

  const {user} = useUserAuthContext()
  const {data:currentUser} = useSinglePeoples(user?.uid)
  console.log(currentUser)


  useEffect(()=>{
     setSearchUser(chatUser)
  },[])

  const handleSelect = async () => {
    //check whether the group(chats in firestore) exists, if not create
    const combinedId =
      currentUser?.id > searchUser?.id
        ? currentUser?.id + searchUser?.id
        : searchUser?.id + currentUser?.id;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        await setDoc(doc(db, "chats", combinedId), { messages: [] });
        await updateDoc(doc(db, "userChats", currentUser?.id), {
          [combinedId + ".userInfo"]: {
            uid: searchUser?.id,
            displayName: searchUser?.firstname,
            photoURL:searchUser?.image
           
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", searchUser?.id), {
          [combinedId + ".userInfo"]: {
            uid: currentUser?.id,
            displayName: currentUser?.firstname,
            photoURL:currentUser?.image
           
          },
          [combinedId + ".date"]: serverTimestamp()
        });
      }
    } catch (err) {
      console.log(err)
    }
    setChatUser(null);
    setSearchUser(null)
  };
  return (
    <div className="search">
      {err && <span>User not found!</span>}
      {searchUser && (
        <div className="userChat" onClick={handleSelect}>
          <img src={searchUser?.image} alt="" />
          <div className="userChatInfo">
            <span>{searchUser.firstname}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;