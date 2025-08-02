import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaLongArrowAltUp, FaRegNewspaper, FaComments } from "react-icons/fa";
import { LiaUsersSolid } from "react-icons/lia";
import { Button, Table } from "flowbite-react";
import { Link } from "react-router-dom";

export const DashComponent = () => {
  const [users, setUser] = useState([]);
  const [totalUsers, settotalUsers] = useState(0);
  const [lastMonthUser, setlastMonthUser] = useState(0);

  const [posts, setPosts] = useState([]);
  const [totalPost, setTotalPost] = useState(0);
  const [lastMonthPost, setlastMonthPost] = useState(0);

  const [comments, setComments] = useState([]);
  const [totalComments, settotalComments] = useState(0);
  const [lastMonthComments, setlastMonthComments] = useState(0);

  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`api/user/getusers?limit=5`);
        const data = await res.json();
        setUser(data.users);
        settotalUsers(data.totalUsers);
        setlastMonthUser(data.lastMothUsers);
      } catch (error) {
        console.log(error.message);
      }
    };

    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/post/getpost?limit=5`);
        const data = await res.json();
        setPosts(data.posts);
        setTotalPost(data.totalPost);
        setlastMonthPost(data.lastMonthPost);
      } catch (error) {
        console.log(error.message);
      }
    };

    const fetchComment = async () => {
      try {
        const res = await fetch(`/api/comment/getallcommentforAdmin?limit=5`);
        const data = await res.json();
        setComments(data.comments);
        settotalComments(data.totalComments);
        setlastMonthComments(data.totalComments);
      } catch (error) {
        console.log(error.message);
      }
    };

    if (currentUser?.isAdmin) {
      fetchUser();
      fetchPost();
      fetchComment();
    }
  }, [currentUser]);

  return (
    <div>
      <div className="min-h-screen bg-gray-50 dark:bg-[rgb(16,23,43)] p-8 transition-colors duration-500 ">
        <div className="max-w-full mx-auto grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {/* User Card */}
          <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-6 flex flex-col justify-between cursor-pointer">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-gray-500 dark:text-gray-300 font-semibold text-lg">
                TOTAL USERS
              </h2>
              <div className="bg-teal-600 p-3 rounded-lg text-white">
                <LiaUsersSolid size={28} />
              </div>
            </div>
            <p className="text-4xl font-bold text-gray-900 dark:text-gray-100">
              {totalUsers}
            </p>
            <div className="mt-4 flex items-center text-green-600 dark:text-green-400 font-medium">
              <FaLongArrowAltUp className="mr-2" />
              <span>{lastMonthUser} LAST MONTH USERS</span>
            </div>
          </div>

          {/* Post Card */}
          <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-6 flex flex-col justify-between cursor-pointer">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-gray-700 dark:text-gray-300 font-semibold text-lg">
                TOTAL POSTS
              </h2>
              <div className="bg-blue-600 p-3 rounded-lg text-white">
                <FaRegNewspaper size={28} />
              </div>
            </div>
            <p className="text-4xl font-bold text-gray-900 dark:text-gray-100">
              {totalPost}
            </p>
            <div className="mt-4 flex items-center text-green-600 dark:text-green-400 font-medium">
              <FaLongArrowAltUp className="mr-2" />
              <span>{lastMonthPost} LAST MONTH POSTS</span>
            </div>
          </div>

          {/* Comment Card */}
          <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-6 flex flex-col justify-between cursor-pointer">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-gray-700 dark:text-gray-300 font-semibold text-lg">
                TOTAL COMMENTS
              </h2>
              <div className="bg-purple-600 p-3 rounded-lg text-white">
                <FaComments size={28} />
              </div>
            </div>
            <p className="text-4xl font-bold text-gray-900 dark:text-gray-100">
              {totalComments}
            </p>
            <div className="mt-4 flex items-center text-green-600 dark:text-green-400 font-medium">
              <FaLongArrowAltUp className="mr-2" />
              <span>{lastMonthComments} LAST MONTH COMMENTS</span>
            </div>
          </div>
        </div>

       <div className="flex flex-col md:flex-row gap-6 mt-4">
  {/* First block */}
  <div className="flex-1 bg-white dark:bg-gray-700 rounded-lg shadow-md dark:shadow-gray-700 p-5 transition-colors duration-300">
    <div className="flex items-center justify-between mb-4  px-5 ">
      <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">Recent Users</p>
      <Button size="small" className="bg-gradient-to-br from-green-400 to-blue-600 text-white hover:bg-gradient-to-bl focus:ring-green-200 dark:focus:ring-green-800 px-2 py-2 rounded-lg">
       <Link to="/dashboard?tab=users">See All</Link>
      </Button>
    </div>
    <Table hoverable className="dark:text-gray-200">
      <Table.Head>
        <Table.HeadCell className="dark:text-gray-300">User Profile</Table.HeadCell>
        <Table.HeadCell className="dark:text-gray-300">User Name</Table.HeadCell>
      </Table.Head>
      <Table.Body>
        {users &&
          users.map((user) => (
            <Table.Row key={user.id} className="dark:hover:bg-gray-800 ">
              <Table.Cell>
                <img
                  src={user.profilePicture}
                  alt="user"
                  className="w-10 h-10 rounded-full"
                />
              </Table.Cell>
              <Table.Cell className="dark:text-gray-200">{user.username}</Table.Cell>
            </Table.Row>
          ))}
      </Table.Body>
    </Table>
  </div>

 {/* Second block */}
<div className="flex-grow flex-shrink basis-full md:basis-1/2 lg:basis-1/2 bg-white dark:bg-gray-700 rounded-lg shadow-md dark:shadow-gray-700 p-5 transition-colors duration-300">
  <div className="flex items-center justify-between mb-4">
    <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">Recent Posts</p>
    <Button
      size="small"
      className="bg-gradient-to-br from-green-400 to-blue-600 text-white hover:bg-gradient-to-bl focus:ring-green-200 dark:focus:ring-green-800 px-2 py-2 rounded-lg"
    >
      <Link to="/dashboard?tab=post">See All</Link>
    </Button>
  </div>
  <Table hoverable className="dark:text-gray-500">
    <Table.Head>
      <Table.HeadCell className="dark:text-gray-300">Post Image</Table.HeadCell>
      <Table.HeadCell className="dark:text-gray-300">Post title</Table.HeadCell>
      <Table.HeadCell className="dark:text-gray-300">Category</Table.HeadCell>
    </Table.Head>
    <Table.Body>
      {posts &&
        posts.map((post) => (
          <Table.Row key={post.id} className="dark:hover:bg-gray-800">
            <Table.Cell>
              <img
                src={post.image}
                alt="user"
                className="w-10 h-10 rounded-full"
              />
            </Table.Cell>
            <Table.Cell className="dark:text-gray-200 line-clamp-1">{post.title}</Table.Cell>
            <Table.Cell className="dark:text-gray-200">{post.category}</Table.Cell>
          </Table.Row>
        ))}
    </Table.Body>
  </Table>
</div>


  {/* third block */}
<div className="flex-grow flex-shrink basis-full md:basis-1/2 lg:basis-1/2 bg-white dark:bg-gray-700 rounded-lg shadow-md dark:shadow-gray-700 p-5 transition-colors duration-300">
  <div className="flex items-center justify-between mb-4">
    <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">Recent Comments</p>
    <Button
      size="small"
      className="bg-gradient-to-br from-green-400 to-blue-600 text-white hover:bg-gradient-to-bl focus:ring-green-200 dark:focus:ring-green-800 px-2 py-2 rounded-lg"
    >
      <Link to="/dashboard?tab=comments">See All</Link>
    </Button>
  </div>
  <Table hoverable className="dark:text-gray-200">
    <Table.Head>
      <Table.HeadCell className="dark:text-gray-300">Comment Contents</Table.HeadCell>
      <Table.HeadCell className="dark:text-gray-300">Likes</Table.HeadCell>
    </Table.Head>
    <Table.Body>
      {comments &&
        comments.map((comment) => (
          <Table.Row key={comment.id} className="dark:hover:bg-gray-800">
            <Table.Cell>
              <p className="line-clamp-2">{comment.content}</p>
            </Table.Cell>
            <Table.Cell className="dark:text-gray-200">{comment.numberOfLikes}</Table.Cell>
          </Table.Row>
        ))}
    </Table.Body>
  </Table>
</div>

</div>

      </div>
    </div>
  );
};
