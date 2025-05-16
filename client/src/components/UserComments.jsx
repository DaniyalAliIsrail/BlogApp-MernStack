import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import { FaThumbsUp } from "react-icons/fa";
import { useSelector } from "react-redux";
export const UserComments = ({ comment, onLike }) => {
  const { currentUser } = useSelector((state)=> state.user);
  const [userdetailswithComments_userId, setuserdetailswithComments_userId] =
    useState();
  useEffect(() => {
    const getuser = async () => {
      const res = await fetch(`/api/user/getuser/${comment?.userId}`);
      const data = await res.json();
      // console.log("data==>", data);
      if (res.ok) {
        setuserdetailswithComments_userId(data);
      }
    };
    getuser();
  }, [comment]);
  // console.log(comment);
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
        <span className="text-gray-400 mx-2 text-[0.66rem]">
          {moment(comment.createdAt).fromNow()}
        </span>
        <p className="text-sm text-gray-300">{comment?.content}</p>
        <div>
          <button
            className={`text-gray-400 hover:text-blue-500 ${currentUser && comment.likes.includes(currentUser._id) && '!text-blue-500'} `}
            type="button"
            onClick={() => onLike(comment._id)}
          >
            <FaThumbsUp className="text-sm" />
          </button>
          <p>
            {
              comment.numberOfLikes > 0 && comment.numberOfLikes + " " + (comment.numberOfLikes === 1 ? "like" : "likes")
            }
          </p>
        </div>
      </div>
    </div>
  );
};
