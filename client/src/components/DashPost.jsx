import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Modal, Table , Button,Alert } from "flowbite-react";
import { Link } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";
const DashPost = () => {
  const [getallPost, setgetallpost] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [openModal,setOpenModal]=useState("")
  const [PostIdToDelete,setPostIdToDelete]=useState(null)
  const [publishSuccess, setPublishSuccess] = useState(null);
  
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    if (!currentUser || !currentUser._id) {
      return;
    }
    const fetchpost = async () => {
      try {
        const res = await fetch(`/api/post/getpost?userId=${currentUser._id}`);
        console.log(currentUser._id);
        const data = await res.json();
        if (res.ok) {
          setgetallpost(data.posts);
          if (data.posts.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchpost();
    }
  }, [currentUser._id]);

  const handleShowMore = async () => {
   
    const startIndex = getallPost.length;
    console.log(startIndex);
    try {
      const res = await fetch(
        `/api/post/getpost?userId=${currentUser._id}&startIndex=${startIndex}`
      );
      const data = await res.json();
      console.log(data);

      if (res.ok) {
        setgetallpost((prev) => [...prev, ...data.posts]);
        if (data.posts.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };
 
  const handleDeletePost = async () => {
    setOpenModal(false);
    // console.log("postIdtoDelete", PostIdToDelete);
    // console.log("currentUser._id", currentUser._id);
    try {
      //route paramter ka use keya gya hay
      const res = await fetch(`/api/post/deletepost/${PostIdToDelete}/${currentUser._id}`, {
        method: 'DELETE',
        credentials: 'include', // Yeh line add karein - cookies ko include karne ke liye
        headers: {
          'Content-Type': 'application/json'
        },
      });
      
      const data = await res.json();
      if(!res.ok){
        console.log(data.message);
      } else {
        setgetallpost((prev) => prev.filter((post) => post._id !== PostIdToDelete));
        setPublishSuccess("Delete successfully");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="table-auto overflow-x-scroll pt-4 md:mx-auto scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      {currentUser.isAdmin && getallPost.length > 0 ? (
        <>
          <Table hoverable className="shadow-md ">
            <Table.Head>
              <Table.HeadCell>Date updated</Table.HeadCell>
              <Table.HeadCell>Post Image</Table.HeadCell>
              <Table.HeadCell>Post Title</Table.HeadCell>
              <Table.HeadCell>Category</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
              <Table.HeadCell>
                <span className="hidden md:block">Edit</span>
              </Table.HeadCell>
            </Table.Head>
            {getallPost?.map((post, index) => (
              <Table.Body key={post._id}>
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell>
                    {new Date(post.updatedAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`/post/${post.slug}`}>
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-20 h-10 object-cover bg-gray-500"
                      />
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <Link
                      className="font-medium text-gray-900 dark:text-white"
                      to={`/post/${post.slug}`}
                    >
                      {post.title}
                    </Link>
                  </Table.Cell>
                  <Table.Cell>{post.category}</Table.Cell>
                  <Table.Cell>
                    <span
                      onClick={() => {
                        setOpenModal(true);
                        setPostIdToDelete(post._id);
                      }}
                      className="font-medium text-red-500 hover:underline cursor-pointer"
                    >
                      Delete
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    <Link
                      className="text-teal-500 hover:underline"
                      to={`/post-update/${post._id}`}
                     
                    >
                      <span>Edit</span>
                    </Link>
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
        <p>You have no post yet</p>
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
              Are you sure you want to delete this post
            </h3>
            <div className="flex justify-center gap-4">
              <Button onClick={handleDeletePost} color="failure">
                Delete
              </Button>
              <Button onClick={() => setOpenModal(false)} color="gray">
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
        {publishSuccess ?(<Alert color="success">{publishSuccess}</Alert>):null}
    </div>
  );
};

export default DashPost;
