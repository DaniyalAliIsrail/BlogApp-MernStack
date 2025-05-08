import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Modal, Table, Button, Alert } from "flowbite-react";
import { Link } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";
const DashUser = () => {
  const [users, setUser] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [openModal, setOpenModal] = useState("");
  const [UserIdToDelete, setUserIdToDelete] = useState(null);
  const [publishSuccess, setPublishSuccess] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  console.log(users);
  useEffect(() => {
    if (!currentUser || !currentUser._id) {
      return;
    }
    const fetchpost = async () => {
      try {
        const res = await fetch(`api/user/getusers`);
        const data = await res.json();
        if (res.ok) {
          setUser(data.users);
          if (data.users.length < 9) {
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
    const startIndex = users.length;
    console.log(startIndex);
    try {
      const res = await fetch(
        `/api/user/getusers?userId=${currentUser._id}&startIndex=${startIndex}`
      );
      const data = await res.json();
      console.log(data);

      if (res.ok) {
        setUser((prev) => [...prev, ...data.users]);
        if (data.users.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeleteUser = async () => {
    setOpenModal(false);
   //  console.log("postIdtoDelete", PostIdToDelete);
   //  console.log("currentUser._id", currentUser._id);
     try {
       //route paramter ka use keya gya hay
       const res = await fetch(
         `/api/user/delete/${UserIdToDelete}`,
         {
           method: "DELETE",
           credentials: "include", // Yeh line add karein - cookies ko include karne ke liye
           headers: {
             "Content-Type": "application/json",
           },
         }
       );

       const data = await res.json();
       if (!res.ok) {
         console.log(data.message);
       } else {
         setUser((prev) =>
            prev.filter((post) => post._id !== UserIdToDelete)
          );
         // setUser((prev) =>
         //   prev.filter((post) => post._id !== UserIdToDelete)
         // );
         setPublishSuccess("Delete successfully");
       }
     } catch (error) {
       console.error(error);
     }
  };
  return (
    <div className="table-auto overflow-x-scroll pt-4 md:mx-auto scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500  md:w-[70%]">
      {currentUser.isAdmin && users.length > 0 ? (
        <>
          <Table hoverable className="shadow-md ">
            <Table.Head>
              <Table.HeadCell>Date created</Table.HeadCell>
              <Table.HeadCell>User Image</Table.HeadCell>
              <Table.HeadCell>UserName</Table.HeadCell>
              <Table.HeadCell>User Email</Table.HeadCell>

              <Table.HeadCell>Admin</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
            </Table.Head>
            {users?.map((user, index) => (
              <Table.Body key={user._id}>
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell>
                    {new Date(user.updatedAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`/post/${user.slug}`}
                    className="rounded_full">
                      <img
                        src={user.profilePicture}
                        alt={user.title}
                        className="w-10 h-10 object-cover rounded-full  bg-gray-500"
                      />
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <Link
                      className="font-medium text-gray-900 dark:text-white"
                      to={`/post/${user.slug}`}
                    >
                      {user.username}
                    </Link>
                  </Table.Cell>
                  <Table.Cell>{user.email}</Table.Cell>
                  <Table.Cell>{user.isAdmin ? "✔️" : "❌"}</Table.Cell>
                  <Table.Cell>
                    <span
                      onClick={() => {
                        setOpenModal(true);
                        setUserIdToDelete(user._id);
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
      {publishSuccess ? <Alert color="success">{publishSuccess}</Alert> : null}
    </div>
  );
};

export default DashUser;
