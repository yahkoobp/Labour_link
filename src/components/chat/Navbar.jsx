"use client"
import { useUserAuthContext } from "@/app/context/userAuthContext"
import { useSinglePeoples } from "@/hooks/useSinglePeople"


const Navbar = () => {

  const {user} = useUserAuthContext()
  const {data:currentUser} = useSinglePeoples(user?.uid)

  return (
    <div className='navbar'>
      <span className="logo">Labourlink</span>
      <div className="user">
        <img src={currentUser?.image} alt="" />
        <span>{currentUser?.firstname}</span>
      </div>
    </div>
  )
}

export default Navbar