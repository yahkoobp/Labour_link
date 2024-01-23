"use client";
import React, { useEffect, useState } from "react";
import { useUserAuthContext } from "../context/userAuthContext";
import BottomTab from "@/components/BottomTab";
import HomeJobCard from "@/components/HomeJobCard";
import MenuIcon from "@mui/icons-material/Menu";
import ChatIcon from "@mui/icons-material/Chat";
import HomePeopleCard from "@/components/HomePeopleCard";
import SearchIcon from "@mui/icons-material/Search";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import { Drawer, IconButton, InputBase, Paper } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import AllInboxIcon from "@mui/icons-material/AllInbox";
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useRouter } from "next/navigation";
import Link from "next/link";
import { registerServiceWorker } from "../utils/serviceWorker";
import NotificationIcon from "@/components/NotificationIcon";
import { getCurrentPushSubscription, sendPushSubscriptionToServer } from "@/notifications/PushService";

const Homepage = () => {
  const { user, logout } = useUserAuthContext();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const router = useRouter();
  const handleLogOut = async () => {
    try {
      await logout();
      router.push("/");
    } catch (error) {}
  };

  useEffect(()=>{
    async function setUpServiceWorker (){
       try {
        await registerServiceWorker()
       } catch (error) {
         console.log(error)
       }
    }
    setUpServiceWorker()
  },[])
  
  useEffect(()=>{
      async function syncPushSubscription(){
        try {
          const subscription = await getCurrentPushSubscription()
          if(subscription){
            await sendPushSubscriptionToServer(subscription , user?.uid)
          }
        } catch (error) {
          console.log(err)
        }
      }
      syncPushSubscription()
  },[])

  const obj={
    reciever:"t4xffR4ot6RDjwvLmoJIyeISU0v2"
  }
  const handleClick = async () =>{
    const res = await fetch("/api/push-webhook",{
      method:"POST",
      body:JSON.stringify(obj)
    })

    console.log(res)
  }
  return (
    <div className="bg-gray-100 h-[100vh]">
      <div className="w-full h-[100px] bg-blue-900 flex flex-col items-center justify-center sticky top-0 left-0">
        <div className="flex items-center justify-between w-full">
          <MenuIcon
            sx={{ color: "white", margin: 1, cursor: "pointer" }}
            onClick={() => {
              setDrawerOpen(true);
            }}
          />
          <div className="flex items-center justify-center gap-2">
          {/* <NotificationsIcon sx={{ color: "white", margin: 1 }} /> */}
          <button onClick={handleClick}>Test notification</button>
          <NotificationIcon/>
          <Link href="/chats">
            <ChatIcon sx={{ color: "white", margin: 1 }} />
          </Link>
          </div>
        </div>
        <Paper
          component="form"
          sx={{
            p: "2px 1px",
            display: "flex",
            alignItems: "center",
            width: 300,
            boxShadow: 1,
            height: 40,
            borderRadius: 2,
            marginTop: 0,
            backgroundColor: "white",
          }}
        >
          <IconButton sx={{ p: "10px" }} aria-label="menu">
            <SearchIcon />
          </IconButton>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search Jobs"
            inputProps={{ "aria-label": "search jobs" }}
          />
        </Paper>
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-[14px]">Suggested Jobs(5)</h2>
          <h2 className="font-bold text-[14px] text-blue-800 cursor-pointer">
            View all jobs
          </h2>
        </div>
        <div className="flex gap-2 overflow-x-auto no-scrollbar mt-2">
          <HomeJobCard />
          <HomeJobCard />
          <HomeJobCard />
          <HomeJobCard />
        </div>
      </div>

      <div className="px-6 py-1">
        <h2 className="font-bold text-[14px]">Peoples you may know(5)</h2>
        <div className="flex gap-2 overflow-x-auto no-scrollbar mt-2">
          <HomePeopleCard />
          <HomePeopleCard />
          <HomePeopleCard />
          <HomePeopleCard />
          <HomePeopleCard />
        </div>
      </div>

      <div className="h-[100px] bg-gray-100"></div>

      <div className="w-full fixed bottom-0 left-0">
        <BottomTab value={0} />
      </div>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{ borderRadius: "10px" }}
      >
        <div className="flex flex-col items-center justify-start gap-2 px-4 py-6 h-full relative overflow-hidden">
          <div className="flex gap-4 items-center border-b border-b-gray-100 py-1">
            <div className=" w-[40px] h-[40px] rounded-full bg-gray-200 flex items-center justify-center border border-gray-300 cursor-pointer">
              {/* <img
                className='w-full h-full rounded-full object-cover' alt="bdhbhdbh" /> */}
              <PersonAddAlt1Icon
                sx={{ color: "gray", width: "30px", height: "30px" }}
              />
            </div>
            <div className="flex flex-col ">
              <h2 className="font-bold">Yahkoob P</h2>
              <p className="text-blue-700 text-[12px]">Update profile</p>
            </div>
            <ChevronRightIcon />
          </div>
          <div className="flex flex-col w-full items-start justify-center mt-3">
           
            <div className="flex gap-3 items-center justify-start cursor-pointer p-2 hover:bg-gray-100 w-full">
              <SearchIcon sx={{ color: "gray", width: 18, height: 18 }} />
              <Link href="/jobs"> <p className="text-[13px] font-semibold">Search Jobs</p> </Link>
            </div>

            <div className="flex gap-3 items-center justify-start cursor-pointer p-2 hover:bg-gray-100 w-full">
              <WorkOutlineOutlinedIcon
                sx={{ color: "gray", width: 17, height: 17 }}
              />
              <p className="text-[13px] font-semibold">Recommended Jobs</p>
            </div>

            <div className="flex gap-3 items-center justify-start cursor-pointer p-2 hover:bg-gray-100 w-full">
              <BookmarkBorderOutlinedIcon
                sx={{ color: "gray", width: 17, height: 17 }}
              />
             <Link href='/appliedJobs'> <p className="text-[13px] font-semibold">Applied jobs</p></Link>
            </div>

            
              <div className="flex gap-3 items-center justify-start cursor-pointer p-2 hover:bg-gray-100 w-full">
                <AllInboxIcon sx={{ color: "gray", width: 17, height: 17 }} />
                <Link href="/jobPosts"> <p className="text-[13px] font-semibold">My job posts</p></Link>
              </div>
            

            <div className="flex gap-3 items-center justify-start cursor-pointer p-2 hover:bg-gray-100 w-full">
              <SettingsOutlinedIcon
                sx={{ color: "gray", width: 17, height: 17 }}
              />
              <p className="text-[13px] font-semibold">Settings</p>
            </div>

            <div className="flex gap-3 items-center justify-start cursor-pointer p-2 hover:bg-gray-100 w-full">
              <InfoOutlinedIcon sx={{ color: "gray", width: 17, height: 17 }} />
              <p className="text-[13px] font-semibold">About us</p>
            </div>
          </div>

          <div
            className="flex gap-3 items-center justify-start cursor-pointer p-2 hover:bg-gray-100 w-full absolute bottom-1 left-2"
            onClick={handleLogOut}
          >
            <LogoutOutlinedIcon
              sx={{ color: "black", width: 20, height: 20 }}
            />
            <p className="text-[15px] font-bold">Log out</p>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default Homepage;
