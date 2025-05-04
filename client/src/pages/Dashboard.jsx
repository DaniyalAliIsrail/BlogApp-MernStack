import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashSidebar from "../components/DashSidebar";
import DashPost from "../components/DashPost";
import DashProfile from "../components/DashProfile";

const Dashboard = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search); //url k query parameter ko nklnay may help krta hay ye
    console.log(urlParams);
    const tabFromUrl = urlParams.get("tab"); //tab kay andr ? kay bad k value hogy
    if(tabFromUrl){
      setTab(tabFromUrl); 
    }
    console.log(tabFromUrl);
  }, [location.search]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-56">
        {/* sidebar */}
        <DashSidebar/>
      </div>
      {/* Profile */}
      {
        tab === "profile" && <DashProfile/>
      }
      {
        tab === "post" && <DashPost/>
      }
    </div>
  );
};

export default Dashboard;
