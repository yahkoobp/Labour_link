import { ChatContext } from "@/app/context/chatContext";
import { useUserAuthContext } from "@/app/context/userAuthContext";
import { useSinglePeoples } from "@/hooks/useSinglePeoples";
import React, { useContext, useEffect, useRef } from "react";

const Message = ({ message }) => {
  const {user} = useUserAuthContext()
  const {data:currentUser} = useSinglePeoples(user?.uid)
  const { data } = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div
      ref={ref}
      className={`message ${message.senderId === currentUser?.id && "owner"}`}
    >
      <div className="messageInfo">
        <img
          src={
            message.senderId === currentUser?.id
              ? currentUser?.image
              : data.user?.photoURL
          }
          alt=""
        />
        <span>just now</span>
      </div>
      <div className="messageContent">
        <p>{message.text}</p>
        {message.img && <img src={message.img} alt="" />}
      </div>
    </div>
  );
};

export default Message;