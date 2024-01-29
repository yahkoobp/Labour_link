import React from 'react'
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import WorkIcon from '@mui/icons-material/Work';

const JobSchedule = (props) => {

   const job=props?.job
  return (
   <Accordion key={job?.id}>
   <AccordionSummary
     expandIcon={<ArrowDropDownIcon />}
     aria-controls="panel2-content"
     id="panel2-header"
   > 
       <div className='flex items-center gap-4'>
       <WorkIcon sx={{color:"teal",width:20,height:20}}/>
       <h1 className='font-semibold text-[15px]'>{job?.job_title}</h1>
       </div>
   </AccordionSummary>
   <AccordionDetails>
     <div className='flex items-center justify-center'>
      <table className='border font-semibold text-[13px]'>
       <tr className='border'>
       <td className='border w-[200px] text-center py-3'>Location</td>
       <td className='border w-[500px] text-center py-3'>{job?.job_location}</td>
       </tr>
       <tr className='border'>
       <td className='border w-[200px] text-center py-3'>Address</td>
       <td className='border w-[500px] text-center py-3'>Pulikkal(h) , elamkulam kunnakkavu </td>
       </tr>
       <tr className='border'>
       <td className='border w-[200px] text-center py-3'>Start date</td>
       <td className='border w-[500px] text-center py-3'>10/10/2024</td>
       </tr>
       <tr className='border'>
       <td className='border w-[200px] text-center py-3'>End date</td>
       <td className='border w-[500px] text-center py-3'>15/10/2024</td>
       </tr>
       <tr className='border'>
       <td className='border w-[200px] text-center py-3'>Time</td>
       <td className='border w-[500px] text-center py-3'>10.00 am to 5.00 pm</td>
       </tr>
       <tr className='border'>
       <td className='border w-[200px] text-center py-3'>Labourer</td>
       <td className='border w-[500px] text-center py-3'>Muhammed Suhail M K</td>
       </tr>
       <tr className='border'>
       <td className='border w-[200px] text-center py-3'>Labourer address</td>
       <td className='border w-[500px] text-center py-3'>Pulikkal(h) , elamkulam kunnakkavu </td>
       </tr>
       <tr className='border'>
       <td className='border w-[200px] text-center py-3'>Work status</td>
       <td className='border w-[500px] text-center py-3'>Upcoming</td>
       </tr>
      </table>
      </div>
   </AccordionDetails>
 </Accordion>
  )
}

export default JobSchedule