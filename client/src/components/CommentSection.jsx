import { Alert, Button, Modal, Textarea } from "flowbite-react";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { UserComments } from "./UserComments";
import { HiOutlineExclamationCircle } from "react-icons/hi";

const CommentSection = ({ postId }) => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState(""); //jo user comment k input pr lkh rha hay wo value store ho rahy hay
  const [commentError, setCommentError] = useState("");
  const [Commentsfetch, setCommentsfetch] = useState([]); // yaha pr jetna comment wo sb is array m la kr rakh do
  const [modal, setisModal] = useState(false);
  const [commentToDelete, setcommentToDelete] = useState(null);
  console.log("delteid", commentToDelete);

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
      // console.log("post data",data);
      if (res.ok) {
        //  setCommentsfetch(prevComments => [data, ...prevComments]);
        setComment("");
        setCommentError("");
      }
    } catch (error) {
      setCommentError(error.message);
    }
  };

  const handleLike = async (commentId) => {
    try {
      if (!currentUser) {
        navigate("/sign-in");
        return;
      }
      const res = await fetch(`/api/comment/likeComment/${commentId}`, {
        method: "PUT",
      });
      const data = await res.json();
      console.log(data);
      setCommentsfetch((prevComments) =>
        prevComments.map((comment) =>
          comment._id === commentId
            ? {
                ...comment,
                likes: data.likes,
                numberOfLikes: data.likes.length,
              }
            : comment
        )
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleEdit = async (comment, editContent) => {
    console.log("commentScetion josmjh nhy arha tha", comment);
    setCommentsfetch(
      Commentsfetch.map((c) =>
        c._id === comment._id ? { ...c, content: editContent } : c
      )
    );
  };

  const handleDeleteModal = (id) => {
    setisModal(true);
    setcommentToDelete(id);
  };
  const handleDelete = async (commentId) => {
    try {
      if (!currentUser) {
        navigate("/sign-in");
      }
      const res = await fetch(`/api/comment//commentdelete/${commentId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        const data = await res.json();
        setCommentsfetch(
          Commentsfetch.filter((comment) => comment._id !== commentId)
        );
        setisModal(false);
      }
    } catch (error) {}
  };

  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await fetch(`/api/comment/getpostcomment/${postId}`);
        const data = await res.json();
        console.log("Get comment==>", data);
        if (res.ok) {
          setCommentsfetch(data.comments);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getComments();
  }, [postId]);
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
            value={comment}
          />
          <div className="flex flex-col sm:flex-row gap-1 justify-between items-center py-2">
            {/* <p> {200 - comment.length} characters remaining</p> */}
            <Button type="submit" color="gray" pill size={"xs"}>
              Submit
            </Button>
          </div>
          {commentError && <Alert>{commentError}</Alert>}
        </form>
      )}

      {Commentsfetch?.length === 0 ? (
        <p>No comments yet</p>
      ) : (
        <div>
          <p className="text-sm my-2 ">
            Comments :
            <span className="border border-teal-600 p-1 px-2 mx-1 rounded">
              {Commentsfetch?.length}
            </span>
          </p>
          {Commentsfetch?.map((comments) => (
            <UserComments
              key={comments._id}
              comment={comments}
              onLike={handleLike}
              onEdit={handleEdit}
              onDelete={handleDeleteModal}
            />
          ))}
        </div>
      )}

      <Modal
        show={modal}
        size="md"
        onClose={() => setisModal(false)}
        popup
        className="z-[200]"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this post
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color="failure"
                onClick={() => handleDelete(commentToDelete)}
              >
                Delete
              </Button>
              <Button onClick={() => setisModal(false)} color="gray">
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CommentSection;
