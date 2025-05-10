import { Button, Textarea } from "flowbite-react";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const CommentSection = () => {
  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser);
  return (
    <div>
      {currentUser ? (
        <div className="flex items-center justify-start gap-1 text-gray-500 first-letter: text-sm pt-3">
          <p>Signed in as:</p>
          <img
            className="w-7 h-7 rounded-full object-cover"
            src={currentUser.profilePicture}
          />
          <Link
            className="text-xs text-cyan-400 light:text-blue-700  hover:underline"
            to={"/dashboard?tab=profile"}
          >
            @{currentUser.username}
          </Link>
        </div>
      ) : (
        <div className="flex gap-1 pt-3">
         You must be signed in to drop comments
         <Link to={'/sign-in'} className="text-cyan-500 underline" >Sign In</Link>
        </div>
      )}
      {
         currentUser && (
            <form className="my-3">
               <Textarea placeholder="Add a Comments" rows={3} maxLength={200}/>
               <div className="flex flex-col sm:flex-row gap-1 justify-between items-center py-2">
                  <p>200 character remaning</p>
                  <Button  color="gray" pill size={"xs"} >Submit</Button>
               </div>
            </form>
         )
      }
    </div>
  );
};

export default CommentSection;
