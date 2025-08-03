import React, { useEffect, useState } from "react";
import { Sidebar } from "flowbite-react";
import {
  HiArrowSmRight,
  HiDocumentText,
  HiUser,
  HiOutlineUserGroup,
} from "react-icons/hi";
import { LiaCommentSolid } from "react-icons/lia";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { MdDashboard } from "react-icons/md";
import { useDispatch } from "react-redux";
import { signOutSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";
const DashSidebar = () => {
  // pathname: current URL ka path (e.g., /home).
  // search: URL mein query string (e.g., ?id=123).
  // hash: URL ka hash (e.g., #section1).
  // state: optional state jo navigation ke waqt pass ki ja sakti hai.

  const { currentUser } = useSelector((state) => state.user);
  const [showSignOutModal, setShowSignOutModal] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  const handleSignOut = () => {
    dispatch(signOutSuccess());
    setShowSignOutModal(false);
    navigate("/signin");
  };
  return (
    <>
      <Sidebar className="w-full md:w-56">
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Link to="/dashboard?tab=profile">
              <Sidebar.Item
                active={tab === "profile"}
                icon={HiUser}
                label={currentUser.isAdmin ? "Admin" : "user"}
                labelColor="dark"
                as="div"
              >
                profile
              </Sidebar.Item>
            </Link>

            <Link to="/dashboard?tab=post">
              <Sidebar.Item
                active={tab == "post"}
                icon={HiDocumentText}
                as="div"
              >
                post
              </Sidebar.Item>
            </Link>

            <Link to="/dashboard?tab=users">
              <Sidebar.Item
                active={tab == "users"}
                icon={HiOutlineUserGroup}
                as="div"
              >
                users
              </Sidebar.Item>
            </Link>

            <Link to="/dashboard?tab=comments">
              <Sidebar.Item
                active={tab == "comments"}
                icon={LiaCommentSolid}
                as="div"
              >
                comments
              </Sidebar.Item>
            </Link>

            <Link to="/dashboard?tab=dash">
              <Sidebar.Item active={tab == "dash"} icon={MdDashboard} as="div">
                Dashboard
              </Sidebar.Item>
            </Link>

            <Sidebar.Item icon={HiArrowSmRight} as="div">
              <button
                className="w-full text-left"
                onClick={() => setShowSignOutModal(true)}
              >
                Sign Out
              </button>
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>

      {showSignOutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 p-6 rounded shadow-lg flex flex-col gap-4">
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              Are you sure you want to sign out?
            </p>
            <div className="flex gap-4 justify-end">
              <button
                className="px-4 py-2 bg-gray-300 dark:bg-gray-700 dark:text-white rounded hover:bg-gray-400 dark:hover:bg-gray-600"
                onClick={() => setShowSignOutModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                onClick={handleSignOut}
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default DashSidebar;
