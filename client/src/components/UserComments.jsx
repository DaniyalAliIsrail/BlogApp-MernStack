import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import moment from 'moment';
export const UserComments = ({ comments }) => {
   console.log(comments.userId);
   const [userdetailswithComments_userId ,setuserdetailswithComments_userId] = useState()
   useEffect(()=>{
      const getuser = async()=>{
         const res = await fetch(`/api/user/getuser/${comments.userId}`)
         const data = await res.json()
         console.log("data==>",data);
         if(res.ok){
            setuserdetailswithComments_userId(data)
         }
      }
      getuser()
   },[comments])
  console.log(comments);
  return (
    <div className="flex gap-x-3 gap-y-2 w-full mb-2 pb-2 border-b dark:border-gray-800">
      <div className="">
        <img
          className="w-7 h-7 rounded-full object-cover"
          src={userdetailswithComments_userId?.profilePicture}
        />
      </div>
      <div className="w-full">
        <Link
          className="text-xs text-gray-200 font-semibold light:text-blue-700  hover:underline"
          to={"/dashboard?tab=profile"}
        >
          @{userdetailswithComments_userId?.username || "anonymous user"}
        </Link>
        <span className="text-gray-400 mx-2 text-[0.66rem]">{moment(comments.createdAt).fromNow()}</span>
        <p className="text-sm text-gray-300">
         {comments.content}
        </p>
      </div>
    </div>
  );
};
