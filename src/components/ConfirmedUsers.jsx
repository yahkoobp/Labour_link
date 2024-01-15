"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const ConfirmedUsers = (props) => {
  const user = props?.user;
  const j_id = props?.job;
//   console.log(j_id);
//   const { data } = useJobView(j_id);
//   console.log(user);
//   console.log(data);
  return (
    <Link href={`/jobPosts/${j_id}/${user?.id}`}>
    <div className="flex items-center justify-between gap-4 border-b border-b-gray-200 py-1 cursor-pointer">
      <div className="flex items-center justify-between gap-2">
        <div className="w-[50px] h-[50px] rounded-full">
          <img
            src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=740&t=st=1701156585~exp=1701157185~hmac=ac68d03b1add36a89081d098324072530d782a1bd6a57a0eebb5ff7e6ae9cea8"
            className="w-full h-full rounded-full object-cover"
            alt=""
          />
        </div>
        <div className="ml-6">
          <h1 className="font-semibold text-md">{user?.firstname}</h1>
          <div className="text-[12px] font-semibold">
            <p>{user?.email}</p>
            <p>{user?.phonenumber}</p>
          </div>
        </div>
      </div>
    </div>
    </Link>
  );
};

export default ConfirmedUsers;
