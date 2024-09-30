import React, { useEffect, useState } from "react";
import { Sidebar } from "flowbite-react";
import { HiArrowSmRight, HiUser } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";

const DashSidebar = () => {
  // pathname: current URL ka path (e.g., /home).
  // search: URL mein query string (e.g., ?id=123).
  // hash: URL ka hash (e.g., #section1).
  // state: optional state jo navigation ke waqt pass ki ja sakti hai.

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
        <Link to='/dashboard?tab=profile'>
          <Sidebar.Items>
            <Sidebar.ItemGroup>
              <Sidebar.Item
                active={tab === "profile"}
                icon={HiUser}
                label={"User"}
                labelColor="dark"
              >
                Users
              </Sidebar.Item>

              <Sidebar.Item icon={HiArrowSmRight}>Sign Out</Sidebar.Item>
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </Link>
      </Sidebar>
    </>
  );
};
export default DashSidebar;
