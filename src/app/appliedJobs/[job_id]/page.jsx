"use client";
import { usePathname, useRouter } from "next/navigation";
import CloseIcon from "@mui/icons-material/Close";
import WorkIcon from "@mui/icons-material/Work";
import PlaceIcon from "@mui/icons-material/Place";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import ResponseUsers from "@/components/ResponseUsers";
import { useJobView } from "@/hooks/useJobView";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useUserAuthContext } from "@/app/context/userAuthContext";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../../firebaseConfig";

const SelectedAppliedJob = () => {
  const { user } = useUserAuthContext();
  const pathname = usePathname();
  const router = useRouter();
  const j_id = pathname.split("/")[2];
  const { data: jobDetails } = useJobView(j_id);
  const [selected, setSelected] = useState(false);
  const [confirmed , setConfirmed] = useState(false)
  const [confirmations , setConfirmations] = useState([])
  const [openDialog, setOpenDialog] = useState(false);
  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleConfirmation = async()=>{
    try {
      const job_data = doc(db,"jobs",j_id)
      const updatedData = await updateDoc(job_data ,{
        confirmations:[...confirmations,user.uid]
      })
      setOpenDialog(false)
     console.log(job_data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if(jobDetails){
      setConfirmations(jobDetails.confirmations)
    }
    if (jobDetails?.confirmations?.includes(user?.uid)) {
      setConfirmed(true);
    }
    if (jobDetails?.selections?.includes(user?.uid)) {
      setSelected(true);
    }
  }, [jobDetails , confirmations]);

  return (
    <div className="flex flex-col relative h-[100vh]">
      <div className="h-[55px] shadow-md p-3 sticky top-0 bg-white">
        <CloseIcon
          onClick={(e) => {
            router.back();
            // e.preventDefault()
          }}
          sx={{ color: "gray", cursor: "pointer" }}
        />
      </div>

      <div className="flex flex-col gap-3 mt-4 p-5 shadow-sm">
        <div className="flex gap-2">
          <WorkIcon sx={{ color: "teal" }} />
          <h1 className="font-heading text-lg">{jobDetails?.job_title}</h1>
        </div>
        <div className="flex items-center gap-2">
          <PlaceIcon sx={{ color: "green" }} />
          <p className="font-semibold text-[14px]">
            {jobDetails?.job_location}
          </p>
        </div>
        <div className="flex gap-2">
          <div className="bg-green-100 w-[150px] px-2 py-1 rounded-md">
            <h3 className="text-green-800 font-bold text-[12px]">
              Rs {jobDetails?.daily_wage} / day
            </h3>
          </div>
          <div className="bg-gray-200 w-[150px] px-2 py-1 rounded-md">
            <h3 className="text-green-800 font-bold text-[12px]">
              {jobDetails?.work_time} time
            </h3>
          </div>
        </div>
        <div className="flex gap-2 justify-between items-center">
          <p className="fonr-bold text-gray-500 text-[13px]">
            Posted on {jobDetails?.time_stamp}
          </p>
          <p className="font-bold text-[12px] text-green-900">Active now</p>
        </div>
      </div>

      {confirmed ?
      <div>
          congratulations you are confirmed you job , show the job schedule here,
      </div>
      :
      selected ? (
        <div className="flex flex-col gap-4 p-5 mt-5 items-center justify-center">
          <Image src="/success.webp" width={300} height={300}></Image>
          <h1 className="text-green-800 text-center text-lg font-semibold">
            Congratulations !!!! you have been selected for this work, please
            confirm
          </h1>
          <div className="flex gap-8 absolute bottom-1">
            <button
              onClick={handleClickOpen}
              className="bg-teal-700 px-8 py-2 rounded-md text-white font-semibold cursor-pointer"
            >
              Confirm
            </button>
            <button className="bg-red-700 px-8 py-2 rounded-md text-white font-semibold">
              Not interested
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4 p-5 mt-5 items-center justify-center">
          <Image src="/pending.jpg" width={300} height={300}></Image>
          <h1 className="text-green-800 text-center text-lg font-semibold">
            Your application is under review , please wait...
          </h1>
        </div>
      )}

      <Dialog
        open={openDialog}
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Are you sure to commit this work"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <div class="alert-bar" id="jobAcceptanceAlert">
              <p>
                By accepting this job, you agree to commit to the following
                terms:
              </p>
              <ul>
                <li>Start Date: [Actual Start Date]</li>
                <li>End Date: [Actual End Date]</li>
                <li>Responsibilities: [List of responsibilities]</li>
              </ul>
              <p>
                Please review the details carefully to signify your acceptance.
              </p>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleConfirmation}>Agree</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SelectedAppliedJob;
