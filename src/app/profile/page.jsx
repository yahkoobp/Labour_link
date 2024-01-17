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
import { Chip, Rating } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { useUserAuthContext } from '../context/userAuthContext';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db, storage } from '../../../firebaseConfig';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { useRouter } from 'next/navigation';
import { useSinglePeoples } from '@/hooks/useSinglePeoples';
import Link from 'next/link';

const MyProfile = () => {
  const {user ,logout} = useUserAuthContext()
  const [userDetails , setUserDetails] = useState({})
  const [loading , setLoading] = useState(false)
  const [updateToggler , setUpdateToggler] = useState(false)
  const [file , setFile] = useState("")
  const [snackbar , setSnackBar] = useState(false)
  const [loadingProgress,setLoadingProgress] = useState("")
  const [overPerf ,setOverPerf] = useState(0)
  const [effectiveness ,setEffectveness] = useState(0)
  const [punctuality , setPunctuality] = useState(0)
  const [proffessionalism , setProffessionalism] = useState(0)
  const [output , setOutput] = useState(0)
  const router = useRouter()
  const Alert = React.forwardRef(function Alert(props, ref) {
      return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const {data} = useSinglePeoples(user?.uid)
    console.log(data)

    console.log(overPerf)
    console.log(proffessionalism)

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

    useEffect(()=>{
          if(data){
           let len = data?.ratings.length
            len && data?.ratings?.map((rating)=>{
                setOverPerf((prev)=>(prev + rating.overall_performance)/len)
                setEffectveness((prev)=>(prev + rating.effectiveness)/len)
                setPunctuality((prev)=>(prev + rating.punctuality)/len)
                setProffessionalism((prev)=>(prev + rating.proffessionalism)/len)
                setOutput((prev)=>(prev + rating.output)/len)
            })
          }
    },[data])
  return (
    <div>
       <div className='h-[60px] p-3 sticky top-0 bg-white flex items-center justify-between'>
            <CloseIcon onClick={(e)=>{
                e.preventDefault()
                router.back()
            }} sx={{color:'gray',cursor:"pointer"}}/>
           <Link href='/updateProfile'><EditIcon sx={{color:"darkblue"}}/></Link>
        </div>
        <div className='flex flex-col p-4'>
        <div className='flex flex-col gap-2 items-center justify-center p-3 w-full'>
        <input type='file' id="file" className='hidden' onChange={(e)=>{
                  setFile(e.target.files[0])
                }}/>
                <label htmlFor="file">
        <div className=' w-[60px] h-[60px] rounded-full bg-gray-200 flex items-center justify-center border border-gray-300 cursor-pointer'>
          {loading?<CircularProgress>{loadingProgress}</CircularProgress>:data?.image?
            <img src={data?.image}
             className='w-full h-full rounded-full object-cover' alt="bdhbhdbh" /> :
             <PersonAddAlt1Icon sx={{color:"gray" ,width:"30px" , height:"30px"}}/>
          }
        </div>
        </label>
        <h1 className='font-heading text-lg'>{data?.firstname} {data?.lastname}</h1>
        <p className='text-gray-600 font-semibold text-center text-sm'>{data?.bio}</p>
        </div>

        <div className='flex flex-col items-center justify-center mt-4 rounded-md p-3 gap-4 bg-yellow-50'>
          <div className='flex flex-col items-start justify-center w-full'>
            <h2 className='font-semibold text-[15px] '>Overall performance</h2>
            <Rating value={overPerf} readOnly/>
          </div>
          <div className='flex flex-col items-start justify-center w-full'>
          <h2 className='font-semibold text-[15px]  '>Effectiveness</h2>
            <Rating value={effectiveness} readOnly/>
          </div>
          <div className='flex flex-col items-start justify-center w-full'>
          <h2 className='font-semibold text-[15px] '>Punctuality</h2>
            <Rating value={punctuality} readOnly/>
          </div>
          <div className='flex flex-col items-start justify-center w-full'>
          <h2 className='font-semibold text-[15px] '>Proffessionalism</h2>
            <Rating value={proffessionalism} readOnly/>
          </div>
          <div className='flex flex-col items-start justify-center w-full'>
          <h2 className='font-semibold text-[15px]  '>Output</h2>
            <Rating value={output} readOnly/>
          </div>
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
            <p className='font-semibold text-[14px]'>{data?.city}</p>
          </div>
          <div className='flex justify-start items-center w-full gap-3'>
            <EmailIcon sx={{color:"gray",width:20,height:20}}/>
            <p className='font-semibold text-[14px]'>{data?.email}</p>
          </div>
          <div className='flex justify-start items-center w-full gap-3'>
            <PhoneIcon sx={{color:"gray",width:20,height:20}}/>
            <p className='font-semibold text-[14px]'>{data?.phonenumber}</p>
          </div>
        </div>

        <div className='flex flex-col items-center justify-center mt-4 rounded-md p-3 gap-3 border border-gray-200'>
          <div className='flex items-center justify-between w-full'>
            <h2 className='font-bold text-md '>Personal details</h2>
            <EditIcon sx={{color:"darkblue"}}/>
          </div>
          <div className='w-full'>
            <p className=' font-semibold text-[12px] text-gray-500'>First name</p>
            <p className=' font-semibold text-[14px] '>{data?.firstname}</p>
          </div>
          <div className='w-full'>
            <p className=' font-semibold text-[12px] text-gray-500'>Last name</p>
            <p className=' font-semibold text-[14px]'>{data?.lastname}</p>
          </div>
          <div className='w-full'>
            <p className=' font-semibold text-[12px] text-gray-500'>Address</p>
            <p className=' font-semibold text-[14px]'>{data?.address}</p>
          </div>
          
        </div>

        <div className='flex flex-col items-start justify-center mt-4 rounded-md p-3 gap-3 bg-yellow-50'>
          <div className='flex items-center justify-between w-full'>
            <h2 className='font-bold text-md '>Work areas</h2>
            <AddBoxIcon sx={{color:"darkblue"}}/>
          </div>
          <div className='flex gap-3 p-3 flex-wrap'>
            {data?.work_areas?.map((work)=>(
            <Chip key={work} label={work} size='' variant='outlined' sx={{color:"gray"}} onDelete={()=>{}}/>
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