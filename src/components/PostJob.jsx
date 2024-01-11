'use client'
import React, { useState } from 'react'
import { TextField , MenuItem ,Autocomplete ,Checkbox ,FormControl,FormLabel,FormControlLabel,RadioGroup,Radio, CircularProgress, Backdrop, Button} from '@mui/material'
import { jobs,kerala_cities } from '../data';
import PublishIcon from '@mui/icons-material/Publish';
import Swal from 'sweetalert2'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useRouter } from 'next/navigation';
import { addDoc, collection } from 'firebase/firestore';
import { useUserAuthContext } from '@/app/context/userAuthContext';
import { db } from '../../firebaseConfig';


const PostJob = () => {
    const router = useRouter()
    const {user} = useUserAuthContext()
    const [job , setJob] = useState("")
    const [loading , setLoading] = useState(false)
    const [startDate , setStartDate] = useState(null)
    const [endDate , setEndDate] = useState(null)

    const handleSubmit = async(e)=>{
    e.preventDefault()
      const data = new FormData(e.target)
      const finalData = Object.fromEntries(data.entries())
      try {
        setLoading(true)
        const docRef = await addDoc(collection(db, "jobs"), {
         ...finalData,
        //  start_date:startDate,
        //  end_date:endDate,
         job_poster:user.uid,
         isActive:true,
         responses:[],
         time_stamp :new Date().toDateString()
        });
        // console.log(docRef._key.path.segments[1])
        setLoading(false)
          Swal.fire({
            icon: "success",
            title: "Congratulations",
            text: "Your Job is posted , please stay tuned to get response from laboures",
            footer: '<a href="/home">Go to job posts</a>',
            
          })
      } catch (error) {
        console.log(error)
      }
   
    }
  return (
    <>
    <div className='py-2'>
        <h1 className="text-md ">Whome did you wanted to hire</h1>
        <form action="" onSubmit={handleSubmit} className='flex flex-col gap-6'>
        <Autocomplete
                required
                options={jobs} renderInput={(params)=> <TextField variant='standard' required  {...params} label="Job title" name="job_title" sx={{paddingBottom:2,}}></TextField>} 
                onChange={(e , value)=>{
                  setJob(e.target.outerText)
                }}></Autocomplete>

        <Autocomplete
                required
                options={kerala_cities} renderInput={(params)=> <TextField variant='standard' required  {...params} label="Job location" name="job_location" sx={{paddingBottom:2,color:"#fff"}}></TextField>} 
                onChange={(e , value)=>{
                }}></Autocomplete>

        <FormControl required>
            <FormLabel id="job_time">
                Time of work
            </FormLabel>
            <RadioGroup name="work_time" aria-label='job_time' row>
                <FormControlLabel control={<Radio size='small'/>} label="Day" value="Day"/>
                <FormControlLabel control={<Radio size='small'/>} label="Night" value="Night"/>
                <FormControlLabel control={<Radio size='small'/>} label="Both" value="Both"/>
            </RadioGroup>
        </FormControl>
        <div className='flex flex-col gap-2 w-full'>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']} sx={{width:"100%"}}>
        <DatePicker label="Start date" value={startDate} onChange={(newVal) =>{setStartDate(newVal)}}/>
      </DemoContainer>
    </LocalizationProvider>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
        <DatePicker label="End date" value={endDate} onChange={(newVal) =>{setEndDate(newVal)}}/>
      </DemoContainer>
    </LocalizationProvider>
    </div>
        


        <TextField id="standard-basic" label="Daily wage" variant="standard" name='daily_wage' sx={{fontWeight:"500px"}}/>

        <textarea name="description" rows="4" cols="50" style={{border:"1px solid gray",marginTop:3,padding:2}} placeholder='Job description'>

</textarea>
<Button variant="contained" endIcon={<PublishIcon />} type='submit'>
  Post Job
</Button>
</form>
<div className='h-[100px]'>

</div>
    </div>


<Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 ,fontWeight:"bold",backgroundColor:"teal"}}
        open={loading}
      > <div className='flex flex-col items-center justify-center gap-4'>
        <CircularProgress/>
        <span style={{marginLeft:10}}>Your job js posting , Please wait.....</span>
        </div>
      </Backdrop>
    </>


  )
}

export default PostJob