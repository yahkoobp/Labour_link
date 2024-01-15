"use client"
import {
    createContext,
    useContext,
    useReducer,
    useState,
  } from "react";
import { useUserAuthContext } from "./userAuthContext";
import { useSinglePeoples } from "@/hooks/useSinglePeople";
  
  export const ChatContext = createContext();
  
  export const ChatContextProvider = ({ children }) => {
    const [showSideBar , setShowSideBar] = useState(true)
    const [showChatBar , setShowChatBar] = useState(false)
    const [chatUser , setChatUser] = useState(null)
    const {user}  = useUserAuthContext()
    const{data:currentUser} = useSinglePeoples(user?.uid)
    const INITIAL_STATE = {
      chatId: "null",
      user: {},
    };
  
    const chatReducer = (state, action) => {
      switch (action.type) {
        case "CHANGE_USER":
          return {
            user: action.payload,
            chatId:
              currentUser?.id > action.payload.uid
                ? currentUser?.id + action.payload.uid
                : action.payload.uid + currentUser?.id,
          };
  
        default:
          return state;
      }
    };
  
    const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);
  
    return (
      <ChatContext.Provider value={{ data:state, dispatch,showChatBar,showSideBar,setShowSideBar,setShowChatBar,chatUser,setChatUser }}>
        {children}
      </ChatContext.Provider>
    );
  };