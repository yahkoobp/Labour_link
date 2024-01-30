'use client'
import React, { Suspense, useRef, useState } from 'react'
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
import { Autocomplete, Backdrop, CircularProgress, Drawer, Fade, FormControl, FormControlLabel, FormGroup, FormLabel, Radio, RadioGroup, TextField } from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';
import Checkbox from '@mui/material/Checkbox';
import JobCard from './JobCard';
import { useUserAuthContext } from '@/app/context/userAuthContext';
import PostJob from './PostJob';
import { useJobs } from '@/hooks/useJobs';
import CommittedJobs from './CommittedJobs';
import JobCardSkeleton from './Skeletons/SkeletonLoader';



 const TabNav = (props) => {
    const {user} = useUserAuthContext()
    const [value, setValue] = React.useState('1');
    const [visibleBox , setVisibleBox] = useState(true)
    const [jobsByTitle , setJobsByTitle] = useState([])
    const [selected , setSelected] = useState(false)
    const [drawerOpen , setDrawerOpen] = useState(false)
    const [cityFilter , setCityFilter] = useState("")
    const [selection , setSelection] = useState(1)
    const [filterLocation , setFilterLocation] = useState([])
    const [filterTime , setFilterTime] = useState("")
    const [filterApplied , setFilterApplied] = useState(false)
    const filterRef = useRef(null)
    const filter1Ref = useRef(null)
    const filter2Ref = useRef(null)
    const filter3Ref = useRef(null)
    const listViewRef = useRef(null)
    const containerRef = useRef(null)
    const filter = filterRef.current
    const filter1 = filter1Ref.current
    const filter2 = filter2Ref.current
    const listView = listViewRef.current

    const appliedFilters = {
      location:filterLocation,
      time:filterTime
    }

    console.log(appliedFilters)


    if(selection ==1){
     filter1?.classList?.add("bg-gray-300")
     filter2?.classList?.remove("bg-gray-300")
    }else if(selection ==2){
      filter1?.classList?.remove("bg-gray-300")
      filter2?.classList?.add("bg-gray-300")
    }
    const {data , isLoading} = useJobs()
    console.log(data)
    
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    const [filterQuery , setFilterQuery] = useState("")

    const handleSearch = async (item)=>{
      setFilterQuery(item)
      setSelected(true)
      let list = []
      const filteredJobs = data.filter((job)=>{return(job.job_title == item)})
      setJobsByTitle(filteredJobs)
    }
    
    if(selected == true){
      listView?.classList?.add("hidden")
    }else{
      listView?.classList?.remove("hidden")
    }
    const handleCheckBox = (e,val) =>{
        const index = filterLocation.indexOf(e.target.value)
        if(index === -1){
          setFilterLocation([...filterLocation,e.target.value])
        }else{
          setFilterLocation(filterLocation.filter(location=>location != e.target.value))
        }
    }

    const handleTimeRadio = (e)=>{
      setFilterTime(e.target.value)
    }

    const handleApply = ()=>{
      setFilterApplied(true)
      setDrawerOpen(false)
    }

    const handleReset = () =>{
      setFilterApplied(false)
      setFilterLocation([])
      setFilterTime("")
      setDrawerOpen(false)
    }

    if(isLoading){
      return(
        <div>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 ,fontWeight:"bold",}}
          open={true}
        > <div className='flex flex-col items-center justify-center gap-4'>
          <CircularProgress/>
          <span style={{marginLeft:10}}>Loading...</span>
          </div>
        </Backdrop>
      </div>
      )
    }
    return (
      <div className='' id="container" ref={containerRef}>
        <div className='w-full h-[50px] bg-green-900'>

        </div>
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value} >
         {visibleBox &&
          <Box sx={{ borderBottom: 1, borderColor: 'divider',fontWeight:"bold" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example" indicatorColor='secondary' centered>
              <Tab label="Jobs" value="1"  sx={{fontWeight:"bold"}}/>
              <Tab label="Committed" value="2" sx={{fontWeight:"bold"}}/>
              <Tab label="Post a job" value="3" sx={{fontWeight:"bold"}} />
            </TabList>
          </Box>}
          <TabPanel value="1">
          <div className='sticky z-100 bg-white top-0 w-full ml-0'>
        <div className=' py-4 w-full'>
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
                {filteredItem.length ? filteredItem :"Oops...this work not found" }
            </li> 
        ))}
       </ul>
       <div className='flex items-center justify-start md:justify-center w-full gap-4 '>
       </div>
       </div>
    </div>
    <div className='md:grid md:grid-cols-3 md:gap-4'>
    {filterApplied ? data?.filter((job)=>appliedFilters?.location?.includes(job?.job_location) && (appliedFilters.time ==="" || appliedFilters.time === job?.work_time)).map((filteredJob)=>(
      <JobCard key={filteredJob?.id} job={filteredJob}/>
    )) :
    filterQuery!=="" && selected ? jobsByTitle.length ?jobsByTitle.map((job)=>(
        <JobCard key={job} job={job}/>
      )):<div className='flex items-center justify-center h-[300px]'><p className='font-semibold text-gray-500'>Oops....This job not found</p></div>
       :
        data?.map((job)=>(
          <JobCard key={job.job_id} job={job}/>
      ))}
       {<div id="filter" ref={filterRef} className='fixed z-50 bottom-16 left-0 w-full flex items-center 
         justify-center transition-opacity ease-in-out duration-500'>
        <div className='rounded-full px-6 py-1 flex items-center justify-center gap-2 shadow-xl bg-blue-900 cursor-pointer text-white'
        onClick={()=>setDrawerOpen(true)}>
          <div className='h-[7px] w-[7px] bg-white rounded-full'></div>
          <TuneIcon/>
         <h2 className='font-bold text-[15px]'>Filter</h2>
         </div>
      </div>
 }
      </div>
      

          </TabPanel>
          <TabPanel value="2">
            <CommittedJobs/>
          </TabPanel>
          <TabPanel value="3">
            <PostJob/>
          </TabPanel>
        </TabContext>
      </Box>
      
      <div className='relative bottom-0 left-0 h-[100px] w-full'>

      </div>

      <Drawer anchor="bottom" open={drawerOpen} onClose={()=>setDrawerOpen(false)} sx={{borderTopLeftRadius:"10px"}}>
        <div className='flex items-center justify-between border border-b-gray-200 px-3 py-4 rounded-t-lg'>
          <h2 className='font-bold'>Filter</h2>
          {filterApplied ? <button className='font-bold  text-white bg-blue-500 px-4 py-2 rounded-md' onClick={handleReset}>Reset</button>:
          <button className='font-bold  text-white bg-blue-500 px-4 py-2 rounded-md' onClick={handleApply}>Apply</button>
          }
        </div>
       <div className='rounded-tl-lg flex h-[400px]'>
        <div  className='flex flex-col justify-start item-center bg-gray-100 '>
          <div id="filter1" ref={filter1Ref} className='px-4 py-3 bg-gray-100 w-full cursor-pointer' onClick={()=>setSelection(1)}>
            <h2 className='font-semibold'>Location</h2>
          </div>
          <div id="filter2" ref={filter2Ref} className='px-4 py-3 bg-gray-100 cursor-pointer' onClick={()=>setSelection(2)}>
            <h2 className='font-semibold'>Time of work</h2>
          </div>
        </div>
        
        { selection==1 &&
        <div className="flex flex-col item-center justify-start overflow-y-auto flex-1 p-3 relative">
          <input type="text" value={cityFilter} className='bg-teal-100 focus:outline-none border border-blue-200 px-6 py-2 rounded-full ' 
          placeholder='Search by Location' onChange={(e)=>{setCityFilter(e.target.value)}}/>
        <FormGroup>
          { kerala_cities.filter((city=>city.toLowerCase().includes(cityFilter.toLocaleLowerCase()))).map((city)=>(
           <FormControlLabel key={city} value={city} control={<Checkbox  color='success' checked={filterLocation.includes(city)} onChange={handleCheckBox}/>} label={city}/>
          ))
          }
       </FormGroup>
        </div>
 }
 
 {
  selection ==2 &&
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
