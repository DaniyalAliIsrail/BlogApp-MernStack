import React from "react";
import { Alert, Button, Textarea, Modal } from "flowbite-react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import { FaThumbsUp } from "react-icons/fa";
import { useSelector } from "react-redux";

export const UserComments = ({ comment, onLike, onEdit, onDelete }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);
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

  const handleEdit = () => {
    setIsEditing(true);
    setEditedContent(comment.content);
  };

  const handleSave = async () => {
    try {
      const res = await fetch(`/api/comment/commentupdate/${comment._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: editedContent,
        }),
      });
      if (res.ok) {
        setIsEditing(false);
        onEdit(comment, editedContent);
      }
      const data = await res.json();
    } catch (error) {
      console.log(error.message);
    }
  };

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
          className="text-black font-semibold text-xs hover:underline dark:text-white"
          to={"/dashboard?tab=profile"}
        >
          @{userdetailswithComments_userId?.username || "anonymous user"}
        </Link>
        <span className="text-gray-400 mx-2 text-[0.66rem]">
          {moment(comment.createdAt).fromNow()}
        </span>
        {isEditing ? (
          <>
            <Textarea
              className="mt-2"
              placeholder="Add a Comments"
              rows={3}
              maxLength={200}
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
            />
            <div className="flex justify-end  gap-3 my-2 text-xs">
              <Button
                onClick={handleSave}
                type="button"
                size="sm"
                gradientDuoTone="purpleToBlue"
              >
                save
              </Button>
              <Button
                onClick={() => setIsEditing(false)}
                type="button"
                size="sm"
                gradientDuoTone="purpleToBlue"
                outline
              >
                Cancel
              </Button>
            </div>
          </>
        ) : (
          <>
            <p className="text-sm text-gray-600  dark:text-gray-300">
              {comment?.content}
            </p>
            <div className="flex items-center justify-start  gap-3 max-w-[10rem] ">
              <button
                className={`text-gray-400 hover:text-blue-500 ${
                  currentUser &&
                  comment.likes.includes(currentUser._id) &&
                  "!text-blue-500"
                } `}
                type="button"
                onClick={() => onLike(comment._id)}
              >
                <FaThumbsUp className="text-sm" />
              </button>
              <p className="text-sm">
                {comment.numberOfLikes > 0 &&
                  comment.numberOfLikes +
                    " " +
                    (comment.numberOfLikes === 1 ? "like" : "likes")}
                {currentUser &&
                  (currentUser._id == comment.userId ||
                    currentUser.isAdmin) && (
                    <>
                      <button
                        type="button"
                        className="text-gray-400 p-1 hover:text-blue-500 text-sm"
                        onClick={handleEdit}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="text-gray-400 p-1 hover:text-red-500 text-sm"
                        onClick={()=> onDelete(comment._id)}
                      >
                        Delete
                      </button>
                    </>
                  )}
              </p>
            </div>
          </>
        )}

        
      </div>
    </div>
  );
};
