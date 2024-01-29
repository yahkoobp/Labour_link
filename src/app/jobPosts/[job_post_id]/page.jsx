"use client";
import { usePathname, useRouter } from "next/navigation";
import CloseIcon from "@mui/icons-material/Close";
import WorkIcon from "@mui/icons-material/Work";
import PlaceIcon from "@mui/icons-material/Place";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Paper from "@mui/material/Paper";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../../firebaseConfig";
import ResponseUsers from "@/components/ResponseUsers";
import { useJobView } from "@/hooks/useJobView";
import { useQueries } from "react-query";
import { useState } from "react";
import SelectedUsers from "@/components/SelectedUsers";
import UserAccordion from "@/components/UserAccordion";
import ConfirmedUsers from "@/components/ConfirmedUsers";

const fetchSinglePeople = async (id) => {
  let user = {};
  console.log("data is fetching........");
  const docRef = doc(db, "users", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    user = docSnap.data();
    return user;
  } else {
    console.log("No such document!");
  }
};

const SelectedJobPost = () => {
  const pathname = usePathname();
  const router = useRouter();
  const j_id = pathname.split("/")[2];
  const [value, setValue] = useState("1");
  const { data: jobDetails } = useJobView(j_id);
  const responsesArray = jobDetails?.responses || [];
  const selectionArray = jobDetails?.selections || [];
  const confirmationArray = jobDetails?.confirmations || [];
  const responses = useQueries(
    responsesArray?.map((id) => {
      return {
        queryKey: ["response", id],
        queryFn: () => fetchSinglePeople(id),
        staleTime: 500000,
        cacheTime: 500000,
        enabled: !!responsesArray,
      };
    })
  );

  const selections = useQueries(
    selectionArray?.map((id) => {
      return {
        queryKey: ["selection", id],
        queryFn: () => fetchSinglePeople(id),
        staleTime: 500000,
        cacheTime: 500000,
        enabled: !!selectionArray,
      };
    })
  );

  const confirmations = useQueries(
    confirmationArray?.map((id) => {
      return {
        queryKey: ["selection", id],
        queryFn: () => fetchSinglePeople(id),
        staleTime: 500000,
        cacheTime: 500000,
        enabled: !!confirmationArray,
      };
    })
  );

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="flex flex-col relative h-[100vh]">
      <div className="h-[55px] shadow-md p-3 bg-white">
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
          <h1 className="font-semibold text-[15px]">{jobDetails?.job_title}</h1>
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
      <div className="p-5">
        <div className="sticky top-0 z-50">
          <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={value}>
              <Box
                sx={{
                  borderBottom: 1,
                  borderColor: "divider",
                  fontWeight: "bold",
                }}
              >
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                  indicatorColor="secondary"
                  centered
                >
                  <Tab
                    label={`Responses(${jobDetails?.responses?.length})`}
                    value="1"
                    sx={{ fontWeight: "bold" }}
                  />
                  <Tab
                    label={`Selections(${jobDetails?.selections?.length})`}
                    value="2"
                    sx={{ fontWeight: "bold" }}
                  />
                  <Tab
                    label={`Confirmations(${jobDetails?.confirmations?.length})`}
                    value="3"
                    sx={{ fontWeight: "bold" }}
                  />
                </TabList>
              </Box>
              <TabPanel value="1" sx={{ padding: "0px" }}>
                {responsesArray.length ? (
                  <div className="flex flex-col gap-4 mt-3">
                    {responses?.map((response) => (
                      <UserAccordion
                        key={response?.data?.id}
                        user={response?.data}
                        job={j_id}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-[200px]">
                    <h1 className="font-bold text-gray-500">
                      No responses yet
                    </h1>
                  </div>
                )}
              </TabPanel>
              <TabPanel value="2" sx={{ padding: "0px" }}>
                {selectionArray?.length ? (
                  <div className="flex flex-col gap-2 mt-4">
                    {selections?.map((selection) => (
                      <SelectedUsers
                        key={selection?.data?.id}
                        user={selection?.data}
                        job={j_id}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-[200px]">
                    <h1 className="font-bold text-gray-500">
                      No selections yet
                    </h1>
                  </div>
                )}
              </TabPanel>
              <TabPanel value="3" sx={{ padding: "0px" }}>
                {confirmationArray?.length ? (
                  <div className="flex flex-col gap-2 mt-4">
                    {confirmations?.map((confirmation) => (
                      <ConfirmedUsers
                        key={confirmation?.data?.id}
                        user={confirmation?.data}
                        job={j_id}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-[200px]">
                    <h1 className="font-bold text-gray-500">
                      No confirmations yet
                    </h1>
                  </div>
                )}
              </TabPanel>
            </TabContext>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default SelectedJobPost;
