
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Modal, Table, Button, Alert } from "flowbite-react";
import { Link } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export const DashComment = () => {
  const [comments, setComments] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [openModal, setOpenModal] = useState(false);   // boolean here
  const [UserIdToDelete, setUserIdToDelete] = useState(null);
  const [publishSuccess, setPublishSuccess] = useState(null);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    if (!currentUser?._id) {
      return;
    }
    const fetchComments = async () => {
      try {
        const res = await fetch(
          `/api/comment/getallcommentforAdmin?limit=9`
        );
        const data = await res.json();
        if (res.ok) {
          setComments(data.comments);
          if (data.comments.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchComments();
    }
  }, [currentUser?._id]);

  const handleShowMore = async () => {
    const startIndex = comments.length;
    try {
      const res = await fetch(
        `/api/comment/getallcommentforAdmin?startIndex=${startIndex}&limit=9`
      );
      const data = await res.json();

      if (res.ok) {
        setComments((prev) => [...prev, ...data.comments]);
        if (data.comments.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeleteUser = async () => {
    setOpenModal(false);
    try {
      const res = await fetch(
        `/api/comment/commentdelete/${UserIdToDelete}`, // check route spelling (singular 'comment')
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        setComments((prev) =>
          prev.filter((comment) => comment._id !== UserIdToDelete)
        );
        setPublishSuccess("Deleted successfully");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="table-auto overflow-x-scroll pt-4 md:mx-auto scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500  md:w-[70%]">
      {currentUser.isAdmin && comments?.length > 0 ? (
        <>
          <Table hoverable className="shadow-md">
            <Table.Head>
              <Table.HeadCell>Date created</Table.HeadCell>
              <Table.HeadCell>Comment</Table.HeadCell>
              <Table.HeadCell>Total Likes</Table.HeadCell>
              <Table.HeadCell>User Id</Table.HeadCell>
              <Table.HeadCell>Post Id</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
            </Table.Head>
            {comments?.map((comment) => (
              <Table.Body key={comment._id}>
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell>
                    {new Date(comment.updatedAt).toLocaleDateString()}
                  </Table.Cell>

                  <Table.Cell>
                    <Link
                      className="font-medium text-gray-900 dark:text-white"
                      to={`/post/${comment.postId}`} // Assuming postId is usable here
                    >
                      {comment.content}
                    </Link>
                  </Table.Cell>

                  <Table.Cell>{comment.likes?.length || 0}</Table.Cell>

                  <Table.Cell>{comment.postId || "N/A"}</Table.Cell>
                  <Table.Cell>{comment.userId || "N/A"}</Table.Cell>

                  {/* If userEmail not available, consider populating in backend */}

                  <Table.Cell>
                    <span
                      onClick={() => {
                        setOpenModal(true);
                        setUserIdToDelete(comment._id);
                      }}
                      className="font-medium text-red-500 hover:underline cursor-pointer"
                    >
                      Delete
                    </span>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>

          {showMore && (
            <button
              onClick={handleShowMore}
              className="w-full text-teal-500 self-center text-sm py-7"
            >
              Show More
            </button>
          )}
        </>
      ) : (
        <p>You have no comments yet</p>
      )}

      <Modal
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        popup
        className="z-[200]"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this comment?
            </h3>
            <div className="flex justify-center gap-4">
              <Button onClick={handleDeleteUser} color="failure">
                Delete
              </Button>
              <Button onClick={() => setOpenModal(false)} color="gray">
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {publishSuccess && <Alert color="success">{publishSuccess}</Alert>}
    </div>
  );
};

