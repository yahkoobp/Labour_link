'use client'
import React, { useState } from 'react'
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import PersonIcon from '@mui/icons-material/Person'
import HomeRepairServiceRoundedIcon from '@mui/icons-material/HomeRepairServiceRounded';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import { useRouter } from 'next/navigation';



const BottomTab = (props) => {

  // const [value , setValue] = useState(0)
  const value = props.value
  const router = useRouter()
  
  const handleChange = (e,value)=>{
     
      if(value ===0){
         router.push("/home")
      }
      else if(value===1){
        router.push("/jobs")
      }
      else if(value===2){
        router.push("/peoples")
      }
      else if(value === 3){
        router.push("/profile")
      }
  }
  return (
  <BottomNavigation sx={{width:'100%' , position:"absolute" , bottom:0 , backgroundColor:"white"}} value={value} onChange={handleChange} showLabels>
     <BottomNavigationAction label="Home" icon={<HomeRoundedIcon/>}/>
     <BottomNavigationAction label="Jobs" icon={<HomeRepairServiceRoundedIcon/>}/>
     <BottomNavigationAction label="Peoples" icon={<PeopleAltRoundedIcon/>}/>
     <BottomNavigationAction label="My Profile" icon={<PersonIcon/>}/>
  </BottomNavigation>
   )
}
export default BottomTab

