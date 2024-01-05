'use client'

import React, { useEffect, useMemo, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import EditIcon from '@mui/icons-material/Edit';
import WorkIcon from '@mui/icons-material/Work';
import PlaceIcon from '@mui/icons-material/Place';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import ShortcutIcon from '@mui/icons-material/Shortcut';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { Chip } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { useUserAuthContext } from '../context/userAuthContext';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db, storage } from '../../../firebaseConfig';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { useRouter } from 'next/navigation';

const MyProfile = () => {
  const {user ,logout} = useUserAuthContext()
  const [userDetails , setUserDetails] = useState({})
  const [loading , setLoading] = useState(false)
  const [updateToggler , setUpdateToggler] = useState(false)
  const [file , setFile] = useState("")
  const [snackbar , setSnackBar] = useState(false)
  const [loadingProgress,setLoadingProgress] = useState("")
  const router = useRouter()
  const Alert = React.forwardRef(function Alert(props, ref) {
      return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    useEffect(()=>{
      let unSubscribe = false
      const fetchData = async()=>{
        console.log("function calling...")
        if(user){
        const docRef = doc(db, "users", user?.uid);
        const docSnap = await getDoc(docRef);
        console.log("working.......")
        
        if (docSnap.exists()) {
          setUserDetails(docSnap.data())
        } else {
          console.log("No such document!");
        }
      }
    }
        if(unSubscribe == false){
        fetchData()
        }
        return () =>{
          console.log("component is unmounting....")
          unSubscribe = true
        }
    },[user , updateToggler])

    useEffect(()=>{
      const updateData = async(img)=>{
        setLoading(true)
        try {
          const user_data = doc(db,"users",user.uid)
          const updatedData = await updateDoc(user_data ,{
            image:img
          })
         console.log(updatedData)
         setLoading(false)
         setSnackBar(true)
         setUpdateToggler(!updateToggler)
        } catch (error) {
          console.log(error)
        }
      }
     const uploadFile = ()=>{
      setLoading(true)
      const name = new Date().getTime() + file.name
      const storageRef = ref(storage ,name)

      const uploadTask = uploadBytesResumable(storageRef , file)
      
      uploadTask.on(
        "state_changed",
        (snapshot)=>{
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setLoadingProgress(progress)
          console.log(loadingProgress)
          console.log("uploading is " + progress + "done")
          switch (snapshot.state){
            case "paused":
              console.log("uploading is paused")
              break;
            case "running":
              console.log("uploading is running")
              break;
            default:
              break;
          }
        },
        (error)=>{
          console.log(error)
        },
        ()=>{
             getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
              console.log("file available at ",downloadURL)
              updateData(downloadURL)
             })
        }
      )

     }

     file && uploadFile()
    },[file])
  return (
    <div>
       <div className='h-[60px] p-3 sticky top-0 bg-white flex items-center justify-between'>
            <CloseIcon onClick={(e)=>{
                e.preventDefault()
                router.back()
            }} sx={{color:'gray',cursor:"pointer"}}/>
            <EditIcon sx={{color:"darkblue"}}/>
        </div>
        <div className='flex flex-col p-4'>
        <div className='flex flex-col gap-2 items-center justify-center p-3 w-full'>
        <input type='file' id="file" className='hidden' onChange={(e)=>{
                  setFile(e.target.files[0])
                }}/>
                <label htmlFor="file">
        <div className=' w-[60px] h-[60px] rounded-full bg-gray-200 flex items-center justify-center border border-gray-300 cursor-pointer'>
          {loading?<CircularProgress>{loadingProgress}</CircularProgress>:userDetails?.image?
            <img src={userDetails?.image}
             className='w-full h-full rounded-full object-cover' alt="bdhbhdbh" /> :
             <PersonAddAlt1Icon sx={{color:"gray" ,width:"30px" , height:"30px"}}/>
          }
        </div>
        </label>
        <h1 className='font-heading text-lg'>{userDetails.firstname} {userDetails.lastname}</h1>
        <p className='text-gray-600 font-semibold text-center text-sm'>{userDetails.bio}</p>
        </div>

        <div className='flex flex-col items-center justify-center mt-4 rounded-md p-3 gap-3 bg-green-50'>
          <div className='flex items-center justify-between w-full'>
            <h2 className='font-bold text-md '>Basic details</h2>
            <EditIcon sx={{color:"darkblue"}}/>
          </div>
          <div className='flex justify-start items-center w-full gap-3'>
            <WorkIcon sx={{color:"gray",width:20,height:20}}/>
            <p className='font-semibold text-[14px]'>Carpenter</p>
          </div>
          <div className='flex justify-start items-center w-full gap-3'>
            <PlaceIcon sx={{color:"gray",width:20,height:20}}/>
            <p className='font-semibold text-[14px]'>{userDetails.city}</p>
          </div>
          <div className='flex justify-start items-center w-full gap-3'>
            <EmailIcon sx={{color:"gray",width:20,height:20}}/>
            <p className='font-semibold text-[14px]'>{userDetails.email}</p>
          </div>
          <div className='flex justify-start items-center w-full gap-3'>
            <PhoneIcon sx={{color:"gray",width:20,height:20}}/>
            <p className='font-semibold text-[14px]'>{userDetails.phonenumber}</p>
          </div>
        </div>

        <div className='flex flex-col items-center justify-center mt-4 rounded-md p-3 gap-3 border border-gray-200'>
          <div className='flex items-center justify-between w-full'>
            <h2 className='font-bold text-md '>Personal details</h2>
            <EditIcon sx={{color:"darkblue"}}/>
          </div>
          <div className='w-full'>
            <p className=' font-semibold text-[12px] text-gray-500'>First name</p>
            <p className=' font-semibold text-[14px] '>{userDetails.firstname}</p>
          </div>
          <div className='w-full'>
            <p className=' font-semibold text-[12px] text-gray-500'>Last name</p>
            <p className=' font-semibold text-[14px]'>{userDetails.lastname}</p>
          </div>
          <div className='w-full'>
            <p className=' font-semibold text-[12px] text-gray-500'>Address</p>
            <p className=' font-semibold text-[14px]'>{userDetails.address}</p>
          </div>
          
        </div>

        <div className='flex flex-col items-start justify-center mt-4 rounded-md p-3 gap-3 bg-yellow-50'>
          <div className='flex items-center justify-between w-full'>
            <h2 className='font-bold text-md '>Work areas</h2>
            <AddBoxIcon sx={{color:"darkblue"}}/>
          </div>
          <div className='flex gap-3 p-3 flex-wrap'>
            {userDetails.work_areas?.map((work)=>(
            <Chip label={work} size='' variant='outlined' sx={{color:"gray"}} onDelete={()=>{}}/>
            ))}
          </div>
        </div>

        <div className='flex flex-col justify-center mt-4 rounded-md p-3 gap-2 border border-gray-200'>
          <div className='flex items-center justify-between w-full'>
            <h2 className='font-bold text-md '>Previous works</h2>
            <ShortcutIcon/>
          </div>
          <p className='font-semibold text-[13px] text-gray-600'>See the previous works that you have completed</p>
         
        </div>
    </div>

    <Snackbar
        open={snackbar}
        autoHideDuration={3000}
        message="Image updated successfully"
        onClose={()=>{setSnackBar(false)}}
        anchorOrigin={{
          vertical:'bottom',
          horizontal:'center'
        }}
      >
        <Alert severity="success">Image updated successfully...</Alert>
      </Snackbar>
    
    </div>
  )
}

export default MyProfile