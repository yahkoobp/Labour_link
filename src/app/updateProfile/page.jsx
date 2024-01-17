"use client";
import React, { useState } from "react";
import "./input.css";
import { useUserAuthContext } from "../context/userAuthContext";
import { TextField, MenuItem, Autocomplete, Checkbox } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { jobs, kerala_places } from "@/data";
import { useRouter } from "next/navigation";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import { useSinglePeoples } from "@/hooks/useSinglePeoples";

const UpdateProfile = () => {
  const { user } = useUserAuthContext();
  const [loading, setLoading] = useState(false);
  const [district, setDistrict] = useState("");
  const [work_areas, setWorkAreas] = useState([]);
  const districts = Object.keys(kerala_places);
  const default_option = ["Please select a district"];
  const route = useRouter();

  const { data: userDetails } = useSinglePeoples(user?.uid);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData(e.target);
    const finalData = Object.fromEntries(data.entries());
    console.log({ ...finalData, work_areas: work_areas });
    try {
      const res = await setDoc(doc(db, "users", user?.uid), {
        ...finalData,
        isLabour: true,
        work_areas: work_areas,
        timeStamp: serverTimestamp(),
      });
      setLoading(false);
      route.replace("/home");
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  // console.log(locations.Kerala[0].city)
  // locations.Kerala.map(element=>{
  //     cities.push(element.city)
  //  })
  //  console.log(cities)
  return (
    <div className="w-full h-[100vh] p-6 relative">
      <div className="">
        <h1 className="font-heading text-lg">Update Your Basic details</h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-8 mt-6 text-sm lg:text-md"
        >
          <div className="inputBox">
            <input
              type="text"
              name="firstname"
              required="required"
              defaultValue={userDetails?.firstname}
            />
            <span>First Name</span>
          </div>

          <div className="inputBox">
            <input
              type="text"
              name="lastname"
              required
              defaultValue={userDetails?.lastname}
            />
            <span>Last Name</span>
          </div>

          <div className="inputBox">
            <input
              type="text"
              name="bio"
              required
              defaultValue={userDetails?.bio}
            />
            <span>Bio</span>
          </div>

          <div className="inputBox">
            <input
              type="number"
              name="phonenumber"
              required
              defaultValue={userDetails?.phonenumber}
            />
            <span>Phone Number</span>
          </div>

          <div className="inputBox">
            <input type="text" name="email" value={user?.email} required />
            <span>Email Id</span>
          </div>

          <div className="inputBox">
            <input
              type="text"
              name="address"
              required
              defaultValue={userDetails?.address}
            />
            <span>Address</span>
          </div>

          <div className="inputBox">
            <input
              type="text"
              name="expected_daily_wage"
              required
              defaultValue={userDetails?.expected_daily_wage}
            />
            <span>Expected Daily Wage in INR</span>
          </div>

          <div className="sticky bottom-0 left-0 w-full h-[50px] z-50 flex items-center justify-end ">
            <button
              type="submit"
              className="bg-blue-700 rounded-full py-2 px-4 text-white hover:scale-102 duration-300 text-center cursor-pointer font-semibold"
            >
              Update
            </button>
          </div>
        </form>
      </div>

      <div>
        <Backdrop
          sx={{
            color: "#fff",
            zIndex: (theme) => theme.zIndex.drawer + 1,
            fontWeight: "bold",
          }}
          open={loading}
        >
          {" "}
          <div className="flex flex-col items-center justify-center gap-4">
            <CircularProgress />
            <span style={{ marginLeft: 10 }}>Creating your profile...</span>
          </div>
        </Backdrop>
      </div>
    </div>
  );
};

export default UpdateProfile;
