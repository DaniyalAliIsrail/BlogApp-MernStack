import { Alert, Button, Textarea } from "flowbite-react";
import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { UserComments } from "./UserComments";
const CommentSection = ({ postId }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState("");
  const [commentError, setCommentError] = useState("");
  const [Commentsfetch, setCommentsfetch] = useState([]);
  console.log(Commentsfetch);
  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await fetch(`/api/comment/getpostcomment/${postId}`);
        const data = await res.json();
        console.log(data);
        if (res.ok) {
          setCommentsfetch(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getComments();
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment.length >= 200) {
      return;
    }
    try {
      const res = await fetch(`/api/comment/postcomment/${currentUser._id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: comment,
          postId,
          userId: currentUser._id,
        }),
      });
      const data = await res.json();
      console.log(data);
      if (res.ok) {
        setCommentError(null);
      }
    } catch (error) {
      setCommentError(error.message);
    }
  };
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
          <Link to={"/sign-in"} className="text-cyan-500 underline">
            Sign In
          </Link>
        </div>
      )}
      {currentUser && (
        <form className="my-3" onSubmit={handleSubmit}>
          <Textarea
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a Comments"
            rows={3}
            maxLength={200}
          />
          <div className="flex flex-col sm:flex-row gap-1 justify-between items-center py-2">
            <p>{200 - comment.length} chara remaning</p>
            <Button type="submit" color="gray" pill size={"xs"}>
              Submit
            </Button>
          </div>
          {commentError && <Alert>{commentError}</Alert>}
        </form>
      )}

      {Commentsfetch.comments?.length === 0 ? (
        <p>No comments yet</p>
      ) : (
        <div>
          <p className="text-sm my-2 ">
            Comments :
            <span className="border border-teal-600 p-1 px-2 mx-1 rounded">
              {Commentsfetch.comments?.length}
            </span>
          </p>
          {Commentsfetch.comments?.map((comments) => (
            <UserComments key={comments._id} comments={comments} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentSection;
