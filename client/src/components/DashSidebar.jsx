import React, { useEffect, useState } from "react";
import { Sidebar } from "flowbite-react";
import { HiArrowSmRight, HiDocumentText, HiUser } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const DashSidebar = () => {
  // pathname: current URL ka path (e.g., /home).
  // search: URL mein query string (e.g., ?id=123).
  // hash: URL ka hash (e.g., #section1).
  // state: optional state jo navigation ke waqt pass ki ja sakti hai.

  const {currentUser} = useSelector((state) => state.user)
  const location = useLocation();
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  return (
    <>
      <Sidebar className="w-full md:w-56">
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Link to="/dashboard?tab=profile">
              <Sidebar.Item
                active={tab === "profile"}
                icon={HiUser}
                // label={currentUser.isAdmin ? "Admin":"user"}
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

            <Sidebar.Item icon={HiArrowSmRight}>Sign Out</Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </>
  );
};
export default DashSidebar;
