import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { doc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebaseConfig";
import { useJobView } from "@/hooks/useJobView";
import WorkIcon from "@mui/icons-material/Work";
import PlaceIcon from "@mui/icons-material/Place";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import ShortcutIcon from "@mui/icons-material/Shortcut";
import { Chip } from "@mui/material";

const UserAccordion = (props) => {
  const user = props?.user;
  const j_id = props?.job;
  const [selections, setSelections] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  console.log(j_id);
  const { data } = useJobView(j_id);
  console.log(user);
  console.log(data);

  useEffect(() => {
    setSelections(data?.selections);
  }, []);
  
  const handleClose = ()=>{
    setOpenDialog(false)
  }

  const notification_obj ={
    reciever:user?.id,
    title:"congratulations you have been selected for a work. tap to view",
    job_id:j_id
  }
  const handleSelect = async () => {
    try {
      // setResponses([...responses,{...finalData,user_id:}])
      const job_data = doc(db, "jobs", j_id);
      const updatedData = await updateDoc(job_data, {
        selections: [...selections, user.id],
      });
      console.log(job_data);
      const res = await fetch("/api/push-webhook",{
        method:"POST",
        body:JSON.stringify(notification_obj)
      })
  
      console.log(res)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full">
      <Accordion>
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography sx={{ fontWeight: "bold" }}>
            <div className="flex gap-4 items-center justify-center">
              <div className="w-[50px] h-[50px] rounded-full">
                <img
                  src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=740&t=st=1701156585~exp=1701157185~hmac=ac68d03b1add36a89081d098324072530d782a1bd6a57a0eebb5ff7e6ae9cea8"
                  className="w-full h-full rounded-full object-cover"
                  alt=""
                />
              </div>
              <h1>{user?.firstname}</h1>
            </div>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className="flex flex-col p-4">
            <div className="flex flex-col gap-2 items-center justify-center p-3 w-full">
              <div className=" w-[60px] h-[60px] rounded-full bg-gray-200 flex items-center justify-center border border-gray-300 cursor-pointer">
                <img
                  src={user?.image}
                  className="w-full h-full rounded-full object-cover"
                  alt="bdhbhdbh"
                />
              </div>
              <h1 className="font-heading text-lg">
                {user?.firstname} {user?.lastname}
              </h1>
              <p className="text-gray-600 font-semibold text-center text-sm">
                {user?.bio}
              </p>
              {data?.selections.includes(user?.id) ? (
                <button className="text-green-800 px-6 py-1 font-bold">
                  Selected
                </button>
              ) : (
                <button
                  onClick={()=>setOpenDialog(true)}
                  className="bg-teal-600 text-white px-6 py-1 rounded-md"
                >
                  Select
                </button>
              )}
            </div>

            <div className="flex flex-col items-center justify-center mt-4 rounded-md p-3 gap-3 bg-green-50">
              <div className="flex items-center justify-between w-full">
                <h2 className="font-bold text-md ">Basic details</h2>
              </div>
              <div className="flex justify-start items-center w-full gap-3">
                <WorkIcon sx={{ color: "gray", width: 20, height: 20 }} />
                <p className="font-semibold text-[14px]">Carpenter</p>
              </div>
              <div className="flex justify-start items-center w-full gap-3">
                <PlaceIcon sx={{ color: "gray", width: 20, height: 20 }} />
                <p className="font-semibold text-[14px]">{user?.city}</p>
              </div>
              <div className="flex justify-start items-center w-full gap-3">
                <EmailIcon sx={{ color: "gray", width: 20, height: 20 }} />
                <p className="font-semibold text-[14px]">{user?.email}</p>
              </div>
              <div className="flex justify-start items-center w-full gap-3">
                <PhoneIcon sx={{ color: "gray", width: 20, height: 20 }} />
                <p className="font-semibold text-[14px]">{user?.phonenumber}</p>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center mt-4 rounded-md p-3 gap-3 border border-gray-200">
              <div className="flex items-center justify-between w-full">
                <h2 className="font-bold text-md ">Personal details</h2>
              </div>
              <div className="w-full">
                <p className=" font-semibold text-[12px] text-gray-500">
                  First name
                </p>
                <p className=" font-semibold text-[14px] ">{user?.firstname}</p>
              </div>
              <div className="w-full">
                <p className=" font-semibold text-[12px] text-gray-500">
                  Last name
                </p>
                <p className=" font-semibold text-[14px]">{user?.lastname}</p>
              </div>
              <div className="w-full">
                <p className=" font-semibold text-[12px] text-gray-500">
                  Address
                </p>
                <p className=" font-semibold text-[14px]">{user?.address}</p>
              </div>
            </div>

            <div className="flex flex-col items-start justify-center mt-4 rounded-md p-3 gap-3 bg-yellow-50">
              <div className="flex items-center justify-between w-full">
                <h2 className="font-bold text-md ">Work areas</h2>
              </div>
              <div className="flex gap-3 p-3 flex-wrap">
                {user?.work_areas?.map((work) => (
                  <Chip
                    key={work}
                    label={work}
                    size=""
                    variant="outlined"
                    sx={{ color: "gray" }}
                    onDelete={() => {}}
                  />
                ))}
              </div>
            </div>

            <div className="flex flex-col justify-center mt-4 rounded-md p-3 gap-2 border border-gray-200">
              <div className="flex items-center justify-between w-full">
                <h2 className="font-bold text-md ">Previous works</h2>
                <ShortcutIcon />
              </div>
              <p className="font-semibold text-[13px] text-gray-600">
                See the previous works that you have completed
              </p>
            </div>
          </div>
        </AccordionDetails>
      </Accordion>

      <Dialog
        open={openDialog}
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Are you sure You wanted to select this labour"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <div class="alert-bar" id="jobAcceptanceAlert" className="font-bold text-[14px] text-gray-700">
              <p>
                By selecting this labour, you agree to commit to the following
                terms:
              </p>
              <ul className="flex flex-col gap-2 mt-5">
                <li>Work type: {data?.job_title} </li>
                <li>Start Date: {data?.start_date.toDate().toString().split(" ").slice(0,4).join(" ")}</li>
                <li>End Date: {data?.end_date.toDate().toString().split(" ").slice(0,4).join(" ")} </li>
                <li>Work location: {data?.job_location} </li>
                <li>Daily wage: {data?.daily_wage} </li>

              </ul>
              <p className="mt-5">
                Please review the details carefully to signify your acceptance.
              </p>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSelect}>Yes</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UserAccordion;
