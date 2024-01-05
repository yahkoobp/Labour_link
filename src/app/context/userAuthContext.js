"use client"
import {createContext, useContext, useEffect, useState} from "react"
import { createUserWithEmailAndPassword ,signInWithEmailAndPassword,signOut , onAuthStateChanged} from "firebase/auth";
import { auth,} from "../../../firebaseConfig"


const userAuthContext = createContext();

export function UserAuthContextProvider ({children}){
  const[user ,setUser ] = useState(null)
  
      function signUp(email , password) {
        return createUserWithEmailAndPassword(auth,email , password)
      }

      function login(email , password) {
        return signInWithEmailAndPassword(auth,email , password)
      }

      function logout (){
        return signOut(auth)
      }

      useEffect(()=>{

        if (typeof window !== 'undefined' && localStorage.getItem('user')){
        const stored_user = JSON.parse(localStorage.getItem('user'));
        setUser(stored_user)
        const unsubscribe = onAuthStateChanged(auth , (currentUser) =>{
         setUser(currentUser)
         localStorage.setItem("user",JSON.stringify(currentUser))
       });
       return ()=>{
        unsubscribe()
       }
      }},[])
      return <userAuthContext.Provider value ={{user ,signUp ,login ,logout} }>
        {children}
      </userAuthContext.Provider>
}

export function useUserAuthContext(){
    return useContext(userAuthContext)
}