'use client'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { jobs, kerala_cities, kerala_places } from '../data';
import { Autocomplete, Drawer, Fade, FormControl, FormControlLabel, FormGroup, FormLabel, Radio, RadioGroup, TextField } from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';
import Checkbox from '@mui/material/Checkbox';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import JobCard from './JobCard';
import { useUserAuthContext } from '@/app/context/userAuthContext';
import PostJob from './PostJob';
import JobPosts from './JobPosts';



 const TabNav = (props) => {
    const {user} = useUserAuthContext()
    const [value, setValue] = React.useState('1');
    const [visibleBox , setVisibleBox] = useState(true)
    const [AllJobs ,setAllJobs] = useState([])
    const [jobsByTitle , setJobsByTitle] = useState([])
    const [selected , setSelected] = useState(false)
    const [drawerOpen , setDrawerOpen] = useState(false)
    const [cityFilter , setCityFilter] = useState("")
    const [selection , setSelection] = useState(1)
    const [filterLocation , setFilterLocation] = useState([])
    const [filterWage , setFilterWage] = useState("")
    const [filterTime , setFilterTime] = useState("")
    const filterRef = useRef(null)
    const filter1Ref = useRef(null)
    const filter2Ref = useRef(null)
    const filter3Ref = useRef(null)
    const listViewRef = useRef(null)
    const containerRef = useRef(null)
    const filter = filterRef.current
    const filter1 = filter1Ref.current
    const filter2 = filter2Ref.current
    const filter3 = filter3Ref.current
    const listView = listViewRef.current
    const container = containerRef.current


    if(selection ==1){
     filter1?.classList?.add("bg-gray-300")
     filter2?.classList?.remove("bg-gray-300")
     filter3?.classList?.remove("bg-gray-300")
    }else if(selection ==2){
      filter1?.classList?.remove("bg-gray-300")
      filter2?.classList?.add("bg-gray-300")
      filter3?.classList?.remove("bg-gray-300")
    }else if(selection ==3){
      filter1?.classList?.remove("bg-gray-300")
      filter2?.classList?.remove("bg-gray-300")
      filter3?.classList?.add("bg-gray-300")
    }

   
   
    // console.log(jobsByTitle)

    useEffect(()=>{
      console.log("useeffect is working")
      let unSubscribe = false
      const fetchJob = async()=>{
        console.log("function is working.....")
        let list = []
        try {
          const querySnapShot = await getDocs(collection(db , "jobs"));
          querySnapShot.forEach((doc)=>{
            list.push({job_id: doc.id ,...doc.data()})
          })
          setAllJobs(list)
          console.log(list)
        //   const filteredJobs = list?.filter((job)=>userDetails.work_areas?.includes(job.job_title))
        //   console.log(filteredJobs)
        //   setUserJobs(filteredJobs)
        } catch (error) {
          console.log(error)
        }
      }
      if(unSubscribe == false){
       fetchJob()
      }

      return () => {
        console.log("component unmonted and cleaning up")
        unSubscribe = true
      }

    },[])
    
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    const [filterQuery , setFilterQuery] = useState("")

    const handleSearch = async (item)=>{
      setFilterQuery(item)
      setSelected(true)
      let list = []
      const filteredJobs = AllJobs.filter((job)=>{return(job.job_title == item)})
      setJobsByTitle(filteredJobs)
    }
    
    if(selected == true){
      listView?.classList?.add("hidden")
    }else{
      listView?.classList?.remove("hidden")
    }


    // let lastScroll = 0
    //   container?.addEventListener("scroll",(event)=>{
    //     const currentScroll = window.scrollY
    //     if(currentScroll > lastScroll){
    //     filter?.classList?.add("hidden")
    // }

    // if(currentScroll < lastScroll){
    //   filter?.classList?.remove("hidden")
    // }
    // lastScroll = currentScroll
    // })

    const handleCheckBox = (e,val) =>{
        const index = filterLocation.indexOf(e.target.value)
        if(index === -1){
          setFilterLocation([...filterLocation,e.target.value])
        }else{
          setFilterLocation(filterLocation.filter(location=>location != e.target.value))
        }
    }

    const handleWageRadio = (e)=>{
          setFilterWage(e.target.value)
    }

    const handleTimeRadio = (e)=>{
      setFilterTime(e.target.value)
    }
    return (
      <div className='' id="container" ref={containerRef}>
        <div className='w-full h-[50px] bg-green-900'>

        </div>
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value} >
         {visibleBox &&
         <Fade in={true} timeout={1000}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider',fontWeight:"bold" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example" indicatorColor='secondary' variant="scrollable"
              scrollButtons="auto">
              <Tab label="Jobs" value="1"  sx={{fontWeight:"bold"}}/>
              <Tab label="Committed" value="2" sx={{fontWeight:"bold"}}/>
              <Tab label="Post a job" value="3" sx={{fontWeight:"bold"}} />
              <Tab label="Job posts" value="4" sx={{fontWeight:"bold"}} />
            </TabList>
          </Box>
          </Fade>}
          <TabPanel value="1">
          <div className='sticky z-100 top-0 w-full ml-0'>
        <div className=' py-4 bg-white w-full'>
        <div className='w-full flex items-center justify-center'>
        <Paper  onChange={(e)=>{setFilterQuery(e.target.value)
        setSelected(false)
        console.log(filterQuery)}}
      component="form"
      sx={{ p: '2px 1px', display: 'flex', alignItems: 'center', width:400 ,boxShadow:1 , height:45,borderRadius:2 , marginTop:0 ,backgroundColor:"white"}}
      >
      <IconButton sx={{ p: '10px' }} aria-label="menu">
        <SearchIcon />
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search Jobs"
        value={filterQuery}
        inputProps={{ 'aria-label': 'search jobs' }}
      />
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
    </Paper>
    </div>
    <ul id="list" ref={listViewRef} className='ml-0 '>
        {filterQuery !== "" && jobs.filter((job=>job.toLowerCase().includes(filterQuery.toLocaleLowerCase()))).map((filteredItem , i)=>(
            <li key={i} onClick={()=>handleSearch(filteredItem)} className="cursor-pointer p-4 w-full font-semibold text-sm">
                {filteredItem}
            </li> 
        ))}
       </ul>
       <div className='flex items-center justify-start md:justify-center w-full gap-4 '>
       </div>
       </div>
    </div>
    <div>
    {filterQuery!=="" && selected ? jobsByTitle.map((job)=>(
        <JobCard job={job}/>
      )) 
       :
        AllJobs.map((job)=>(
        <JobCard job={job}/>
      ))}
      <Fade in={true} timeout={1000}>
        <div id="filter" ref={filterRef} className='fixed z-50 bottom-16 left-0 w-full flex items-center 
         justify-center transition-opacity ease-in-out duration-500'>
        <div className='rounded-full px-6 py-1 flex items-center justify-center gap-2 shadow-lg bg-white cursor-pointer'
        onClick={()=>setDrawerOpen(true)}>
          <div className='h-[7px] w-[7px] bg-green-600 rounded-full'></div>
          <TuneIcon/>
         <h2 className='font-heading'>Filter</h2>
         </div>
      </div>
      </Fade>
      </div>
      

          </TabPanel>
          <TabPanel value="2">
            item2
          </TabPanel>
          <TabPanel value="3">
            <PostJob/>
          </TabPanel>
          <TabPanel value="4">
            <JobPosts/>
          </TabPanel>
        </TabContext>
      </Box>
      
      <div className='relative bottom-0 left-0 h-[100px] w-full'>

      </div>

      <Drawer anchor="bottom" open={drawerOpen} onClose={()=>setDrawerOpen(false)} sx={{borderTopLeftRadius:"10px"}}>
        <div className='flex items-center justify-between border border-b-gray-200 px-3 py-4 rounded-t-lg'>
          <h2 className='font-heading'>Filter</h2>
          <button className='font-heading text-white bg-blue-500 px-4 py-2 rounded-md'>Apply</button>
        </div>
       <div className='rounded-tl-lg flex h-[400px]'>
        <div  className='flex flex-col justify-start item-center bg-gray-100 '>
          <div id="filter1" ref={filter1Ref} className='px-4 py-3 bg-gray-100 w-full cursor-pointer' onClick={()=>setSelection(1)}>
            <h2 className='font-semibold'>Location</h2>
          </div>
          <div id="filter2" ref={filter2Ref} className='px-4 py-3 bg-gray-100 cursor-pointer' onClick={()=>setSelection(2)}>
            <h2 className='font-semibold'>Daily wage</h2>
          </div>
          <div id="filter3" ref={filter3Ref} className='px-4 py-3 bg-gray-100 cursor-pointer' onClick={()=>setSelection(3)}>
            <h2 className='font-semibold'>Time of work</h2>
          </div>
        </div>
        
        { selection==1 &&
        <div className="flex flex-col item-center justify-start overflow-y-auto flex-1 p-3 relative">
          <input type="text" value={cityFilter} className='bg-gray-100 focus:outline-none border border-gray-200 px-6 py-2 rounded-full ' 
          placeholder='Search by Location' onChange={(e)=>{setCityFilter(e.target.value)}}/>
        <FormGroup>
          { kerala_cities.filter((city=>city.toLowerCase().includes(cityFilter.toLocaleLowerCase()))).map((city)=>(
           <FormControlLabel value={city} control={<Checkbox  color='success' checked={filterLocation.includes(city)} onChange={handleCheckBox}/>} label={city}/>
          ))
          }
       </FormGroup>
        </div>
 }
 {selection ==2 &&
<div className='px-3 py-2'>
<FormControl required>
          <RadioGroup name="work_time" aria-label='daily_wage' column>
              <FormControlLabel control={<Radio size='small'onChange={handleWageRadio}/>} label="500-700" value="500-700"/>
              <FormControlLabel control={<Radio size='small'onChange={handleWageRadio}/>} label="700-1000" value="700-100"/>
              <FormControlLabel control={<Radio size='small'onChange={handleWageRadio}/>} label="1000-1200" value="1000-1200"/>
              <FormControlLabel control={<Radio size='small'onChange={handleWageRadio}/>} label="1200+" value="1200+"/>
          </RadioGroup>
      </FormControl>
      </div>
 }
 {
  selection ==3 &&
  <div className='px-3 py-2'>
  <FormControl required>
            <RadioGroup name="work_time" aria-label='job_time' column>
                <FormControlLabel control={<Radio size='small'onChange={handleTimeRadio}/>} label="Day" value="Day"/>
                <FormControlLabel control={<Radio size='small'onChange={handleTimeRadio}/>} label="Night" value="Night"/>
                <FormControlLabel control={<Radio size='small'onChange={handleTimeRadio}/>} label="Both" value="Both"/>
            </RadioGroup>
        </FormControl>
        </div>
 }
       </div>
       
    </Drawer>
      </div>
    );
}
export default TabNav